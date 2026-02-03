import { CameraAngles, CameraPan, LorenzParams, Point3D } from './types';

export const pathColors = {
    orange: {
        className: 'bg-orange-500',
        darker: '#9f2d00',
        mid: '#ff6900',
        lighter: '#ffb86a',
    },
    red: {
        className: 'bg-red-500',
        darker: '#9f0712',
        mid: '#fb2c36',
        lighter: '#ffa2a2',
    },
    blue: {
        className: 'bg-blue-500',
        darker: '#193cb8',
        mid: '#2b7fff',
        lighter: '#8ec5ff',
    },
    green: {
        className: 'bg-green-500',
        darker: '#016630',
        mid: '#7ccf00',
        lighter: '#bbf451',
    },
    yellow: {
        className: 'bg-yellow-500',
        darker: '#894b00',
        mid: '#f0b100',
        lighter: '#894b00',
    },
    pink: {
        className: 'bg-pink-500',
        darker: '#a3004c',
        mid: '#f6339a',
        lighter: '#fda5d5',
    },
};

export const initialPoint: Point3D = { x: 0.1, y: 0, z: 0 };

export const initialCameraAngles: CameraAngles = { theta: Math.PI / 4, phi: Math.PI / 4 };
export const initialCameraPan: CameraPan = { x: 0, y: 0, z: 0 };
export const initialCameraDistance: number = 150;

export const initialColor: keyof typeof pathColors = 'blue';
export const paramPresets = {
    classic: { sigma: 10, rho: 28, beta: 8 / 3, dt: 0.01 },
    complex: { sigma: 10, rho: 99.96, beta: 8 / 3, dt: 0.005 },
    stable: { sigma: 10, rho: 14, beta: 8 / 3, dt: 0.01 },
};

export const paramBounds = {
    sigma: { max: 20, min: 0, step: 0.1 },
    rho: { max: 50, min: 0, step: 0.1 },
    beta: { max: 5, min: 0, step: 0.01 },
    dt: { max: 0.05, min: 0.001, step: 0.001 },
};

export const maxPoints = 60000;
