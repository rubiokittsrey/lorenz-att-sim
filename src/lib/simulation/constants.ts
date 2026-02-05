import {
    CameraAngles,
    CameraPan,
    LorenzParams,
    MaxPointsSelections,
    Point3D,
    SpeedSelections,
} from './types';

export const pathColors = {
    orange: {
        className: 'bg-orange-500',
        darker: '#ca3500',
        mid: '#ff8904',
        lighter: '#ffedd4',
    },
    red: {
        className: 'bg-red-500',
        darker: '#82181a',
        mid: '#fb2c36',
        lighter: '#82181a',
    },
    blue: {
        className: 'bg-blue-500',
        darker: '#1447e6',
        mid: '#51a2ff',
        lighter: '#dbeafe',
    },
    green: {
        className: 'bg-green-500',
        darker: '#0d542b',
        mid: '#7ccf00',
        lighter: '#024a70',
    },
    yellow: {
        className: 'bg-yellow-500',
        darker: '#733e0a',
        mid: '#f0b100',
        lighter: '#fef9c2',
    },
    pink: {
        className: 'bg-pink-500',
        darker: '#8b0836',
        mid: '#f6339a',
        lighter: '#733e0a',
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

export const maxPointsOptions: MaxPointsSelections[] = [
    2500, 5000, 10000, 20000, 30000, 50000, 100000,
];
export const defaultMaxPoints = 10000;

export const speedOptions: SpeedSelections[] = [0.5, 1, 2];
export const defaultSpeed = 1;
