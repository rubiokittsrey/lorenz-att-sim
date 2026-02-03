import { LorenzParams, Point3D } from './types';
import * as THREE from 'three';

// calculate the next point in the Lorenz system using Euler's method
export function calculateNextPoint(p: Point3D, params: LorenzParams): Point3D {
    const { sigma, rho, beta, dt } = params;
    return {
        x: p.x + sigma * (p.y - p.x) * dt,
        y: p.y + (p.x * (rho - p.z) - p.y) * dt,
        z: p.z + (p.x * p.y - beta * p.z) * dt,
    };
}

// calculates point color based on age
export function calculatePointColor(
    age: number,
    colorScheme: { lighter: string; mid: string; darker: string }
): THREE.Color {
    const lighterDuration = 2;
    const midDuration = 10;

    const darkerColor = new THREE.Color(colorScheme.darker);
    const midColor = new THREE.Color(colorScheme.mid);
    const lighterColor = new THREE.Color(colorScheme.lighter);

    if (age < lighterDuration) {
        const t = age / lighterDuration;
        return lighterColor.clone().lerp(midColor, t);
    } else if (age < midDuration) {
        const t = (age - lighterDuration) / (midDuration - lighterDuration);
        return midColor.clone().lerp(darkerColor, t);
    } else {
        return darkerColor.clone();
    }
}

// manages circular buffer for storing trajectory points
export class CircularBuffer {
    positions: Float32Array;
    colors: Float32Array;
    head: number = 0;
    index: number = 0;
    maxPoints: number;

    constructor(maxPoints: number) {
        this.maxPoints = maxPoints;
        this.positions = new Float32Array(maxPoints * 3);
        this.colors = new Float32Array(maxPoints * 3);
    }

    addPoint(point: Point3D): void {
        const idx = this.head;
        this.positions[idx * 3] = point.x;
        this.positions[idx * 3 + 1] = point.y;
        this.positions[idx * 3 + 2] = point.z;

        this.head = (this.head + 1) % this.maxPoints;
        this.index++;
    }

    updateColors(dt: number, colorScheme: { lighter: string; mid: string; darker: string }): void {
        const total = Math.min(this.index, this.maxPoints);

        for (let j = 0; j < total; j++) {
            const bufferIdx = (this.head - 1 - j + this.maxPoints) % this.maxPoints;
            const age = j * dt;
            const color = calculatePointColor(age, colorScheme);

            this.colors[bufferIdx * 3] = color.r;
            this.colors[bufferIdx * 3 + 1] = color.g;
            this.colors[bufferIdx * 3 + 2] = color.b;
        }
    }

    getTotalPoints(): number {
        return Math.min(this.index, this.maxPoints);
    }

    isFull(): boolean {
        return this.index >= this.maxPoints;
    }

    reset(): void {
        this.head = 0;
        this.index = 0;
    }

    resize(newMaxPoints: number): CircularBuffer {
        const newBuffer = new CircularBuffer(newMaxPoints);
        return newBuffer;
    }
}
