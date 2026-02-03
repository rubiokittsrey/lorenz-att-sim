import { useLorenzStore } from '@/lib/simulation/store';
import { cn } from '@/lib/utils';
import Stats from 'stats.js';

export default function StatsForNerds({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    const { hideStats } = useLorenzStore();

    if (hideStats) return null;

    return (
        <div
            className={cn('flex flex-col space-y-3 bg-input/50 p-3 border rounded', className)}
            {...props}
        >
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
                <div
                    key={p}
                    className="rounded bg-neutral-200 dark:bg-neutral-800 px-2 py-0.5 border"
                >
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
