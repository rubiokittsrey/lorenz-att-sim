import { useLorenzStore } from '@/lib/simulation/store';
import Stats from 'stats.js';

export default function StatsForNerds() {
    return (
        <div className="absolute bottom-8 left-8 flex flex-col space-y-3 bg-input/50 p-3 border rounded">
            <PointsDataLength />
            <FPSDisplay />
            <XYZPoints />
        </div>
    );
}

export function XYZPoints() {
    const { currentPoint } = useLorenzStore();
    return (
        <div className="flex flex-row space-x-3">
            {Object.keys(currentPoint).map((p) => (
                <div className="rounded bg-neutral-200 dark:bg-neutral-800 px-2 py-0.5 border">
                    <h4 className="text-sm select-none">{`${p.toUpperCase()}: ${currentPoint[p as keyof typeof currentPoint]}`}</h4>
                </div>
            ))}
        </div>
    );
}

export function PointsDataLength() {
    const { pointsData } = useLorenzStore();
    return (
        <div className="rounded w-fit bg-neutral-200 dark:bg-neutral-800 px-2 py-0.5 border">
            <h4 className="text-sm select-none">{`Points: ${pointsData.length}`}</h4>
        </div>
    );
}

export function FPSDisplay() {
    const { fps } = useLorenzStore();
    return (
        <div className="rounded w-fit bg-neutral-200 dark:bg-neutral-800 px-2 py-0.5 border">
            <h4 className="text-sm select-none">{`FPS: ${fps}`}</h4>
        </div>
    );
}
