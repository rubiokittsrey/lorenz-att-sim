import { create } from 'zustand';
import { Point3D, LorenzParams, CameraAngles, CameraPan } from './types';
import {
    initialCameraAngles,
    initialCameraDistance,
    initialCameraPan,
    initialColor,
    initialPoint,
    maxPoints,
    paramPresets,
    pathColors,
} from './constants';

interface LorenzSimulationStates {
    params: LorenzParams;
    currentPreset: keyof typeof paramPresets | '';
    isRunning: boolean;
    currentPoint: Point3D;
    pointsData: Point3D[];
    needsReset: boolean;

    //misc
    fps: number | undefined;
}

interface CameraStates {
    cameraDistance: number;
    cameraAngles: CameraAngles;
    cameraPan: CameraPan;
}

interface VisualizationStates {
    visualMode: 'line' | 'dots';
    dotSize: number;
    color: keyof typeof pathColors;
    showGrids: boolean;
    showAxes: boolean;
}

interface LorenzSimulationActions {
    updateParams: (params: Partial<LorenzParams>) => void;
    clearPreset: () => void;

    toggleIsRunning: () => void;
    setCurrentPoint: (point: Point3D) => void;
    addPoint: (point: Point3D) => void;
    clearPoints: () => void;

    requestReset: () => void;
    clearReset: () => void;
    loadPreset: (preset: 'classic' | 'complex' | 'stable') => void;
}

interface CameraActions {
    setCameraDistance: (distance: number) => void;
    setCameraAngles: (angles: CameraAngles) => void;
    setCameraPan: (pan: CameraPan) => void;
    resetCamera: () => void;
}

interface VisualizationActions {
    setVisualMode: (mode: 'line' | 'dots') => void;
    setDotSize: (size: number) => void;
    toggleGrids: () => void;
    toggleAxes: () => void;
    setColor: (color: keyof typeof pathColors) => void;
}

export type LorenzStore = LorenzSimulationStates &
    LorenzSimulationActions &
    CameraStates &
    CameraActions &
    VisualizationStates &
    VisualizationActions;

export const useLorenzStore = create<LorenzStore>((set) => ({
    params: paramPresets.classic,
    isRunning: false,
    currentPoint: initialPoint,
    pointsData: [],

    cameraDistance: initialCameraDistance,
    cameraAngles: initialCameraAngles,
    cameraPan: initialCameraPan,

    visualMode: 'line',
    dotSize: 0.3,
    showGrids: false,
    showAxes: false,
    color: initialColor,

    fps: undefined,

    updateParams: (params) =>
        set((state) => ({
            params: { ...state.params, ...params },
            currentPreset: '',
        })),

    toggleIsRunning: () => set((state) => ({ isRunning: !state.isRunning })),

    setCurrentPoint: (point) => set({ currentPoint: point }),
    addPoint: (point) =>
        set((state) => {
            const newPoints = [...state.pointsData, point];
            if (newPoints.length > maxPoints) {
                newPoints.shift();
            }
            return { pointsData: newPoints };
        }),
    clearPoints: () => set({ pointsData: [] }),

    setCameraDistance: (distance) => set({ cameraDistance: distance }),
    setCameraAngles: (angles) => set({ cameraAngles: angles }),
    setCameraPan: (pan) => set({ cameraPan: pan }),
    resetCamera: () =>
        set({
            cameraAngles: initialCameraAngles,
            cameraDistance: initialCameraDistance,
            cameraPan: initialCameraPan,
        }),

    setVisualMode: (mode) => set({ visualMode: mode }),
    setDotSize: (size) => set({ dotSize: size }),
    toggleGrids: () => set((state) => ({ showGrids: !state.showGrids })),
    toggleAxes: () => set((state) => ({ showAxes: !state.showAxes })),
    setColor: (color) => set({ color }),

    needsReset: false,
    requestReset: () => set({ needsReset: true, isRunning: false }),
    clearReset: () => set({ needsReset: false }),

    currentPreset: 'classic',
    loadPreset: (preset) =>
        set({
            params: paramPresets[preset],
            currentPoint: { x: 0.1, y: 0, z: 0 },
            pointsData: [],
            currentPreset: preset,
        }),
    clearPreset: () => set({ currentPreset: '' }),
}));
