import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function createFpsCounter(updateIntervalMs = 1000) {
    let lastTime = performance.now();
    let frames = 0;
    let fps = 0;

    return function tick(now: number = performance.now()): number {
        frames++;

        const delta = now - lastTime;
        if (delta >= updateIntervalMs) {
            fps = Math.round((frames * 1000) / delta);
            frames = 0;
            lastTime = now;
        }

        return fps;
    };
}
