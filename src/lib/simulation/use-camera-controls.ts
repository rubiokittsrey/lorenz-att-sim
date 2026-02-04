import { useRef } from 'react';
import { useLorenzStore } from './store';

export function useCameraControls() {
    const isDraggingRef = useRef(false);
    const isPanningRef = useRef(false);
    const lastMouseRef = useRef({ x: 0, y: 0 });

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
        // e.preventDefault();
        const { cameraDistance, setCameraDistance } = useLorenzStore.getState();
        const delta = e.deltaY > 0 ? 5 : -5;
        setCameraDistance(Math.max(50, Math.min(400, cameraDistance + delta)));
    };

    return {
        handleMouseDown,
        handleMouseMove,
        handleMouseUp,
        handleWheel,
    };
}
