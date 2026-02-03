import * as THREE from 'three';
import { CircularBuffer } from './lorenz-utils';
import { useLorenzStore } from './store';

export function createRenderer(width: number, height: number): THREE.WebGLRenderer {
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    return renderer;
}

// update the draw ranges for the line geometries based on buffer state
export function updateLineDrawRanges(
    line1: THREE.Line,
    line2: THREE.Line,
    buffer: CircularBuffer
): void {
    const total = buffer.getTotalPoints();

    if (!buffer.isFull()) {
        // buffer not full yet - draw from 0 to head
        line1.geometry.setDrawRange(0, total);
        line2.geometry.setDrawRange(0, 0);
    } else {
        // buffer full and wrapping
        const headPos = buffer.head;

        if (headPos === 0) {
            // special case: head at start, draw entire buffer
            line1.geometry.setDrawRange(0, buffer.maxPoints);
            line2.geometry.setDrawRange(0, 0);
        } else {
            // split: newest section from head to end, oldest section from 0 to head
            line1.geometry.setDrawRange(headPos, buffer.maxPoints - headPos);
            line2.geometry.setDrawRange(0, headPos);
        }
    }
}

export function markGeometryForUpdate(line1: THREE.Line, line2: THREE.Line): void {
    line1.geometry.attributes.position.needsUpdate = true;
    line1.geometry.attributes.color.needsUpdate = true;
    line2.geometry.attributes.position.needsUpdate = true;
    line2.geometry.attributes.color.needsUpdate = true;
}

export function createScene(): THREE.Scene {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a14);
    return scene;
}

export function createCamera(width: number, height: number): THREE.PerspectiveCamera {
    return new THREE.PerspectiveCamera(60, width / height, 0.1, 2000);
}

export function updateCamera(camera: THREE.PerspectiveCamera): void {
    const { cameraAngles, cameraDistance, cameraPan } = useLorenzStore.getState();

    const { theta, phi } = cameraAngles;
    const d = cameraDistance;
    const pan = cameraPan;

    camera.position.set(
        d * Math.sin(phi) * Math.cos(theta) + pan.x,
        d * Math.cos(phi) + pan.y,
        d * Math.sin(phi) * Math.sin(theta) + pan.z
    );
    camera.lookAt(pan.x, pan.y, pan.z);
}

// add grid and axes helpers to the scene
export function addHelpers(scene: THREE.Scene): {
    grid: THREE.GridHelper;
    axes: THREE.AxesHelper;
} {
    const grid = new THREE.GridHelper(200, 40, 0x444444, 0x222222);
    const axes = new THREE.AxesHelper(80);
    scene.add(grid, axes);
    return { grid, axes };
}

// create line geometries for rendering the trajectory
export function createLineGeometries(buffer: CircularBuffer): {
    line1: THREE.Line;
    line2: THREE.Line;
} {
    const geometry1 = new THREE.BufferGeometry();
    geometry1.setAttribute('position', new THREE.BufferAttribute(buffer.positions, 3));
    geometry1.setAttribute('color', new THREE.BufferAttribute(buffer.colors, 3));

    const geometry2 = new THREE.BufferGeometry();
    geometry2.setAttribute('position', new THREE.BufferAttribute(buffer.positions, 3));
    geometry2.setAttribute('color', new THREE.BufferAttribute(buffer.colors, 3));

    const material = new THREE.LineBasicMaterial({ vertexColors: true });
    const line1 = new THREE.Line(geometry1, material);
    const line2 = new THREE.Line(geometry2, material.clone());

    return { line1, line2 };
}
