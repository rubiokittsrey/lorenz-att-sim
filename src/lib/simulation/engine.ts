import { calculateNextPoint, CircularBuffer } from './lorenz-utils';
import * as THREE from 'three';
import { Point3D } from './types';
import { useLorenzStore } from './store';
import { pathColors } from './constants';
import { markGeometryForUpdate, updateLineDrawRanges } from './three-utils';

export function handleReset(
    buffer: CircularBuffer,
    line1: THREE.Line,
    line2: THREE.Line,
    currentPointRef: React.RefObject<Point3D>
): void {
    buffer.reset();
    currentPointRef.current = { x: 0.1, y: 0, z: 0 };
    line1.geometry.setDrawRange(0, 0);
    line2.geometry.setDrawRange(0, 0);
}

export function updateSimulation(
    buffer: CircularBuffer,
    currentPointRef: React.MutableRefObject<Point3D>,
    line1: THREE.Line,
    line2: THREE.Line
): void {
    const state = useLorenzStore.getState();

    const next = calculateNextPoint(currentPointRef.current, state.params);

    buffer.addPoint(next);

    state.setCurrentPoint(next);
    state.addPoint(next);

    buffer.updateColors(state.params.dt, pathColors[state.color]);

    updateLineDrawRanges(line1, line2, buffer);
    markGeometryForUpdate(line1, line2);

    currentPointRef.current = next;
}
