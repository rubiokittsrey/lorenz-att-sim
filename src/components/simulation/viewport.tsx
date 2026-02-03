import { defaultMaxPoints, pathColors } from '@/lib/simulation/constants';
import { useLorenzStore } from '@/lib/simulation/store';
import { LorenzParams, Point3D } from '@/lib/simulation/types';
import { cn, createFpsCounter } from '@/lib/utils';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { calculateNextPoint, CircularBuffer } from '@/lib/simulation/lorenz-utils';
import { useCameraControls } from '@/lib/simulation/use-camera-controls';
import { handleReset, updateSimulation } from '@/lib/simulation/engine';
import {
    addHelpers,
    createCamera,
    createLineGeometries,
    createRenderer,
    createScene,
    updateCamera,
} from '@/lib/simulation/three-utils';

export default function SimulationViewPort({
    className,
    children,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            {...props}
            className={cn('h-full dark:bg-zinc-950 bg-neutral-600 relative', className)}
        >
            {children}
        </div>
    );
}

export function SimulationThreeCanvas() {
    const containerRef = useRef<HTMLDivElement>(null);

    const sceneRef = useRef<THREE.Scene | null>(null);
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const lineRef = useRef<THREE.Line | null>(null);
    const line2Ref = useRef<THREE.Line | null>(null);
    const gridRef = useRef<THREE.GridHelper | null>(null);
    const axesRef = useRef<THREE.AxesHelper | null>(null);

    // sim state refs
    const bufferRef = useRef(new CircularBuffer(defaultMaxPoints));
    const currentPointRef = useRef<Point3D>({ x: 0.1, y: 0, z: 0 });

    // maxPoint sub
    const maxPoints = useLorenzStore((state) => state.maxPoints);

    const { handleMouseDown, handleMouseMove, handleMouseUp, handleWheel } = useCameraControls();
    const getFps = createFpsCounter();

    // handles maxPoint updates
    useEffect(() => {
        if (maxPoints === bufferRef.current.maxPoints) return;

        bufferRef.current = new CircularBuffer(maxPoints);

        const state = useLorenzStore.getState();
        state.setCurrentPoint({ x: 0, y: 0, z: 0 });
        state.clearPoints();

        // update geometries (if exists)
        if (lineRef.current && line2Ref.current) {
            lineRef.current.geometry.setAttribute(
                'position',
                new THREE.BufferAttribute(bufferRef.current.positions, 3)
            );
            lineRef.current.geometry.setAttribute(
                'color',
                new THREE.BufferAttribute(bufferRef.current.colors, 3)
            );
            line2Ref.current.geometry.setAttribute(
                'position',
                new THREE.BufferAttribute(bufferRef.current.positions, 3)
            );
            line2Ref.current.geometry.setAttribute(
                'color',
                new THREE.BufferAttribute(bufferRef.current.colors, 3)
            );

            handleReset(bufferRef.current, lineRef.current, line2Ref.current, currentPointRef);
        }
    }, [maxPoints]);

    // main three.js setup and animation
    useEffect(() => {
        if (!containerRef.current) return;
        let rafId: number;

        const container = containerRef.current;
        const width = container.clientWidth;
        const height = container.clientHeight;

        const scene = createScene();
        sceneRef.current = scene;

        const camera = createCamera(width, height);
        cameraRef.current = camera;

        const renderer = createRenderer(width, height);
        container.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        const { grid, axes } = addHelpers(scene);
        gridRef.current = grid;
        axesRef.current = axes;

        const { line1, line2 } = createLineGeometries(bufferRef.current);
        scene.add(line1, line2);
        lineRef.current = line1;
        line2Ref.current = line2;

        const onResize = () => {
            if (!container || !camera || !renderer) return;
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        };
        window.addEventListener('resize', onResize);

        const listener = (e: WheelEvent) => e.preventDefault();
        container.addEventListener('wheel', listener, { passive: false });

        const animate = (now: number) => {
            rafId = requestAnimationFrame(animate);

            const state = useLorenzStore.getState();

            if (grid && axes) {
                grid.visible = state.showGrids;
                axes.visible = state.showAxes;
            }

            state.fps = getFps(now);

            if (camera) {
                updateCamera(camera);
            }

            if (state.needsReset && line1 && line2) {
                handleReset(bufferRef.current, line1, line2, currentPointRef);
                state.clearReset();
            }

            if (state.isRunning && line1 && line2) {
                updateSimulation(bufferRef.current, currentPointRef, line1, line2);
            }

            if (renderer && scene && camera) {
                renderer.render(scene, camera);
            }
        };

        rafId = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('resize', onResize);
            renderer.dispose();
            container.removeChild(renderer.domElement);
            container.removeEventListener('wheel', listener);
            cancelAnimationFrame(rafId);
        };
    }, []);

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
