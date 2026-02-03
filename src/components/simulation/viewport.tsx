import { maxPoints, pathColors } from '@/lib/simulation/constants';
import { useLorenzStore } from '@/lib/simulation/store';
import { LorenzParams, Point3D } from '@/lib/simulation/types';
import { cn, createFpsCounter } from '@/lib/utils';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function SimulationViewPort({
    className,
    children,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            {...props}
            className={cn(
                'col-span-8 h-full w-full dark:bg-zinc-950 bg-neutral-600 relative',
                className
            )}
        >
            {children}
        </div>
    );
}

export function SimulationThreeCanvas() {
    const containerRef = useRef<HTMLDivElement>(null);

    const sceneRef = useRef<THREE.Scene>(null);
    const cameraRef = useRef<THREE.PerspectiveCamera>(null);
    const rendererRef = useRef<THREE.WebGLRenderer>(null);
    const lineRef = useRef<THREE.Line>(null);
    const line2Ref = useRef<THREE.Line>(null);

    const indexRef = useRef(0);
    const headRef = useRef(0);
    const currentPointRef = useRef<Point3D>({ x: 0.1, y: 0, z: 0 });

    const positionsRef = useRef(new Float32Array(maxPoints * 3));
    const colorsRef = useRef(new Float32Array(maxPoints * 3));

    const isDraggingRef = useRef(false);
    const isPanningRef = useRef(false);
    const lastMouseRef = useRef({ x: 0, y: 0 });

    const getFps = createFpsCounter();

    const calculateNextPoint = (p: Point3D, params: LorenzParams): Point3D => {
        const { sigma, rho, beta, dt } = params;
        return {
            x: p.x + sigma * (p.y - p.x) * dt,
            y: p.y + (p.x * (rho - p.z) - p.y) * dt,
            z: p.z + (p.x * p.y - beta * p.z) * dt,
        };
    };

    const updateCamera = () => {
        const { cameraAngles, cameraDistance, cameraPan } = useLorenzStore.getState();

        const { theta, phi } = cameraAngles;
        const d = cameraDistance;
        const pan = cameraPan;

        const cam = cameraRef.current!;
        cam.position.set(
            d * Math.sin(phi) * Math.cos(theta) + pan.x,
            d * Math.cos(phi) + pan.y,
            d * Math.sin(phi) * Math.sin(theta) + pan.z
        );
        cam.lookAt(pan.x, pan.y, pan.z);
    };

    useEffect(() => {
        if (!containerRef.current) return;
        let rafId: number;

        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x0a0a14);
        sceneRef.current = scene;

        const camera = new THREE.PerspectiveCamera(
            60,
            containerRef.current.clientWidth / containerRef.current.clientHeight,
            0.1,
            2000
        );
        cameraRef.current = camera;

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        containerRef.current.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        const grid = new THREE.GridHelper(200, 40, 0x444444, 0x222222);
        const axes = new THREE.AxesHelper(80);
        scene.add(grid, axes);

        // Create two line segments to handle circular buffer wrap-around
        const geometry1 = new THREE.BufferGeometry();
        geometry1.setAttribute('position', new THREE.BufferAttribute(positionsRef.current, 3));
        geometry1.setAttribute('color', new THREE.BufferAttribute(colorsRef.current, 3));

        const geometry2 = new THREE.BufferGeometry();
        geometry2.setAttribute('position', new THREE.BufferAttribute(positionsRef.current, 3));
        geometry2.setAttribute('color', new THREE.BufferAttribute(colorsRef.current, 3));

        const material = new THREE.LineBasicMaterial({ vertexColors: true });
        const line1 = new THREE.Line(geometry1, material);
        const line2 = new THREE.Line(geometry2, material.clone());

        scene.add(line1, line2);
        lineRef.current = line1;
        line2Ref.current = line2;

        const onResize = () => {
            camera.aspect = containerRef.current!.clientWidth / containerRef.current!.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(containerRef.current!.clientWidth, containerRef.current!.clientHeight);
        };
        window.addEventListener('resize', onResize);

        const listener = (e: WheelEvent) => e.preventDefault();
        containerRef.current.addEventListener('wheel', listener, { passive: false });

        const animate = (now: number) => {
            rafId = requestAnimationFrame(animate);

            const state = useLorenzStore.getState();
            grid.visible = state.showGrids;
            axes.visible = state.showAxes;
            state.fps = getFps(now);

            updateCamera();

            if (state.needsReset) {
                indexRef.current = 0;
                headRef.current = 0;
                currentPointRef.current = { x: 0.1, y: 0, z: 0 };

                lineRef.current!.geometry.setDrawRange(0, 0);
                line2Ref.current!.geometry.setDrawRange(0, 0);

                state.clearReset();
            }

            const lighterDuration = 2;
            const midDuration = 10;

            if (state.isRunning) {
                const next = calculateNextPoint(currentPointRef.current, state.params);
                const pos = positionsRef.current;
                const col = colorsRef.current;

                // write to circular buffer head position
                const idx = headRef.current;
                pos[idx * 3] = next.x;
                pos[idx * 3 + 1] = next.y;
                pos[idx * 3 + 2] = next.z;

                // store the point in state for reference
                state.setCurrentPoint(next);
                state.addPoint(next);

                // move head forward circularly
                headRef.current = (headRef.current + 1) % maxPoints;
                indexRef.current++;

                // calculate how many points we actually have
                const total = Math.min(indexRef.current, maxPoints);

                // update colors for all points
                const darkerColor = new THREE.Color(pathColors[state.color].darker);
                const midColor = new THREE.Color(pathColors[state.color].mid);
                const lighterColor = new THREE.Color(pathColors[state.color].lighter);

                // color calculation needs to account for circular buffer
                // head is the newest point, (head - 1 + maxPoints) % maxPoints is second newest, etc.
                for (let j = 0; j < total; j++) {
                    // calculate buffer index going backwards from head
                    const bufferIdx = (headRef.current - 1 - j + maxPoints) % maxPoints;
                    const age = j * state.params.dt;
                    let c: THREE.Color;

                    if (age < lighterDuration) {
                        const t = age / lighterDuration;
                        c = lighterColor.clone().lerp(midColor, t);
                    } else if (age < midDuration) {
                        const t = (age - lighterDuration) / (midDuration - lighterDuration);
                        c = midColor.clone().lerp(darkerColor, t);
                    } else {
                        c = darkerColor.clone();
                    }

                    col[bufferIdx * 3] = c.r;
                    col[bufferIdx * 3 + 1] = c.g;
                    col[bufferIdx * 3 + 2] = c.b;
                }

                // for rendering, split the line at the wrap point
                const line1 = lineRef.current!;
                const line2 = line2Ref.current!;

                if (total < maxPoints) {
                    // buffer not full yet - draw from 0 to head
                    line1.geometry.setDrawRange(0, total);
                    line2.geometry.setDrawRange(0, 0); // Hide second line
                } else {
                    // buffer is full and wrapping
                    // draw two segments: [head, maxPoints) and [0, head)
                    const headPos = headRef.current;

                    if (headPos === 0) {
                        // special case: head at start, draw entire buffer
                        line1.geometry.setDrawRange(0, maxPoints);
                        line2.geometry.setDrawRange(0, 0);
                    } else {
                        // split: newest section from head to end, oldest section from 0 to head
                        line1.geometry.setDrawRange(headPos, maxPoints - headPos);
                        line2.geometry.setDrawRange(0, headPos);
                    }
                }

                line1.geometry.attributes.position.needsUpdate = true;
                line1.geometry.attributes.color.needsUpdate = true;
                line2.geometry.attributes.position.needsUpdate = true;
                line2.geometry.attributes.color.needsUpdate = true;
                currentPointRef.current = next;
            }

            renderer.render(scene, camera);
        };

        rafId = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('resize', onResize);
            renderer.dispose();
            containerRef.current?.removeChild(renderer.domElement);
            containerRef.current?.removeEventListener('wheel', listener);
            cancelAnimationFrame(rafId);
        };
    }, []);

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (e.button !== 0) return;
        lastMouseRef.current = { x: e.clientX, y: e.clientY };
        if (e.shiftKey) isPanningRef.current = true;
        else isDraggingRef.current = true;
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        const dx = e.clientX - lastMouseRef.current.x;
        const dy = e.clientY - lastMouseRef.current.y;

        const { cameraAngles, cameraPan, setCameraAngles, setCameraPan } =
            useLorenzStore.getState();

        if (isDraggingRef.current) {
            setCameraAngles({
                theta: cameraAngles.theta + dx * 0.01,
                phi: Math.max(0.1, Math.min(Math.PI - 0.1, cameraAngles.phi + dy * 0.01)),
            });
        }

        if (isPanningRef.current) {
            const panSpeed = 0.3;
            setCameraPan({
                x: cameraPan.x - dx * panSpeed,
                y: cameraPan.y + dy * panSpeed,
                z: cameraPan.z,
            });
        }

        lastMouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        isDraggingRef.current = false;
        isPanningRef.current = false;
    };

    const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
        e.preventDefault();
        const { cameraDistance, setCameraDistance } = useLorenzStore.getState();
        const delta = e.deltaY > 0 ? 5 : -5;
        setCameraDistance(Math.max(50, Math.min(400, cameraDistance + delta)));
    };

    return (
        <div
            ref={containerRef}
            className="w-full h-full cursor-grab active:cursor-grabbing select-none touch-none"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onWheel={handleWheel}
        />
    );
}
