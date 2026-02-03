import { pathColors } from './constants';

export interface Point3D {
    x: number;
    y: number;
    z: number;
}

export interface LorenzParams {
    sigma: number;
    rho: number;
    beta: number;
    dt: number;
}

export interface CameraAngles {
    theta: number;
    phi: number;
}

export interface CameraPan {
    x: number;
    y: number;
    z: number;
}
