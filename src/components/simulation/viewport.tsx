import { maxPoints, pathColors } from '@/lib/simulation/constants';
import { useLorenzStore } from '@/lib/simulation/store';
import { LorenzParams, Point3D } from '@/lib/simulation/types';
import { cn } from '@/lib/utils';
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

    const indexRef = useRef(0);
    const currentPointRef = useRef<Point3D>({ x: 0.1, y: 0, z: 0 });

    const positionsRef = useRef(new Float32Array(maxPoints * 3));
    const colorsRef = useRef(new Float32Array(maxPoints * 3));

    const isDraggingRef = useRef(false);
    const isPanningRef = useRef(false);
    const lastMouseRef = useRef({ x: 0, y: 0 });

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

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positionsRef.current, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colorsRef.current, 3));

        const material = new THREE.LineBasicMaterial({ vertexColors: true });
        const line = new THREE.Line(geometry, material);
        scene.add(line);
        lineRef.current = line;

        const onResize = () => {
            camera.aspect = containerRef.current!.clientWidth / containerRef.current!.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(containerRef.current!.clientWidth, containerRef.current!.clientHeight);
        };
        window.addEventListener('resize', onResize);

        const animate = () => {
            requestAnimationFrame(animate);

            const state = useLorenzStore.getState();
            grid.visible = state.showGrids;
            axes.visible = state.showAxes;

            updateCamera();

            if (state.needsReset) {
                indexRef.current = 0;
                currentPointRef.current = { x: 0.1, y: 0, z: 0 };

                line.geometry.setDrawRange(0, 0);

                state.clearReset();
            }

            if (state.isRunning && indexRef.current < maxPoints) {
                const i = indexRef.current;
                const next = calculateNextPoint(currentPointRef.current, state.params);

                const pos = positionsRef.current;
                pos[i * 3] = next.x;
                pos[i * 3 + 1] = next.y;
                pos[i * 3 + 2] = next.z;

                const c = new THREE.Color(pathColors[state.color].mid);
                const col = colorsRef.current;
                col[i * 3] = c.r;
                col[i * 3 + 1] = c.g;
                col[i * 3 + 2] = c.b;

                line.geometry.setDrawRange(0, i);
                line.geometry.attributes.position.needsUpdate = true;
                line.geometry.attributes.color.needsUpdate = true;

                currentPointRef.current = next;
                indexRef.current++;
            }

            renderer.render(scene, camera);
        };

        animate();

        return () => {
            window.removeEventListener('resize', onResize);
            renderer.dispose();
            containerRef.current?.removeChild(renderer.domElement);
        };
    }, []);

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.button !== 0) return;
        lastMouseRef.current = { x: e.clientX, y: e.clientY };
        if (e.shiftKey) isPanningRef.current = true;
        else isDraggingRef.current = true;
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
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

    const handleMouseUp = () => {
        isDraggingRef.current = false;
        isPanningRef.current = false;
    };

    const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
        const { cameraDistance, setCameraDistance } = useLorenzStore.getState();
        const delta = e.deltaY > 0 ? 5 : -5;
        setCameraDistance(Math.max(50, Math.min(400, cameraDistance + delta)));
    };

    return (
        <div
            ref={containerRef}
            className="w-full h-full cursor-grab active:cursor-grabbing"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onWheel={handleWheel}
        />
    );
}
