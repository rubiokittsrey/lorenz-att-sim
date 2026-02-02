import {
    PauseIcon,
    PlayIcon,
    RabbitIcon,
    Rotate3DIcon,
    RotateCcwIcon,
    SaveIcon,
    SnailIcon,
    TrainFrontIcon,
} from 'lucide-react';
import { Button } from '../ui/button';
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

export default function SimulationControls({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div {...props} className={cn(className, 'flex flex-row space-x-6')}>
            <div className="flex flex-row space-x-2">
                <ResetSim />
                <SaveImage />
            </div>
            <div className="flex flex-row space-x-2">
                <ResetSimView />
                <SetSimSpeed />
                <PauseSim />
            </div>
        </div>
    );
}

export function PauseSim() {
    const [isPaused, setPaused] = useState(false);

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button
                    variant={isPaused ? 'default' : 'secondary'}
                    className=""
                    onClick={() => {
                        setPaused((prev) => !prev);
                    }}
                >
                    {isPaused ? <PlayIcon /> : <PauseIcon className="" />}
                </Button>
            </TooltipTrigger>
            <TooltipContent>
                <p className="font-sans">Pause</p>
            </TooltipContent>
        </Tooltip>
    );
}

export function ResetSim() {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button variant={'destructive'} className="">
                    <RotateCcwIcon />
                </Button>
            </TooltipTrigger>
            <TooltipContent>
                <p className="font-sans">Reset</p>
            </TooltipContent>
        </Tooltip>
    );
}

export function SaveImage() {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button variant={'secondary'} className="">
                    <SaveIcon />
                </Button>
            </TooltipTrigger>
            <TooltipContent>
                <p className="font-sans">Save as image</p>
            </TooltipContent>
        </Tooltip>
    );
}

export function ResetSimView() {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button variant={'secondary'} className="">
                    <Rotate3DIcon />
                </Button>
            </TooltipTrigger>
            <TooltipContent>
                <p className="font-sans">Reset View</p>
            </TooltipContent>
        </Tooltip>
    );
}

export function SetSimSpeed() {
    const speeds = {
        'speed-x0.5': 0.5,
        'speed-x1': 1.0,
        'speed-x2': 2.0,
    };
    const [speed, setSpeed] = useState<keyof typeof speeds>('speed-x0.5');

    const speedKeys = Object.keys(speeds) as (keyof typeof speeds)[];
    const handleCycleSpeed = () => {
        const currentIndex = speedKeys.indexOf(speed);
        const nextIndex = (currentIndex + 1) % speedKeys.length;
        setSpeed(speedKeys[nextIndex]);
    };

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button variant={'secondary'} className="" onClick={handleCycleSpeed}>
                    {speed === 'speed-x0.5' ? (
                        <SnailIcon />
                    ) : speed === 'speed-x1' ? (
                        <RabbitIcon />
                    ) : (
                        <TrainFrontIcon />
                    )}
                </Button>
            </TooltipTrigger>
            <TooltipContent>
                <p className="font-sans">Change Speed {`(x${speeds[speed]})`}</p>
            </TooltipContent>
        </Tooltip>
    );
}
