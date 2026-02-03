import { CameraAngles, CameraPan, LorenzParams, Point3D } from './types';

export const pathColors = {
    orange: {
        className: 'bg-orange-500',
    },
    red: {
        className: 'bg-red-500',
    },
    blue: {
        className: 'bg-blue-500',
    },
    green: {
        className: 'bg-green-500',
    },
    yellow: {
        className: 'bg-yellow-500',
    },
    pink: {
        className: 'bg-pink-500',
    },
};

export const initialPoint: Point3D = { x: 0.1, y: 0, z: 0 };

export const initialCameraAngles: CameraAngles = { theta: Math.PI / 4, phi: Math.PI / 4 };
export const initialCameraPan: CameraPan = { x: 0, y: 0, z: 0 };
export const initialCameraDistance: number = 150;

export const initialColor: keyof typeof pathColors = 'blue';
export const paramPresets: Record<string, LorenzParams> = {
    classic: { sigma: 10, rho: 28, beta: 8 / 3, dt: 0.01 },
    complex: { sigma: 10, rho: 99.96, beta: 8 / 3, dt: 0.005 },
    stable: { sigma: 10, rho: 14, beta: 8 / 3, dt: 0.01 },
};
