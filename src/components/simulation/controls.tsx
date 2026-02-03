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
import { useLorenzStore } from '@/lib/simulation/store';
import { speedOptions } from '@/lib/simulation/constants';

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
    const { isRunning, toggleIsRunning } = useLorenzStore();

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button
                    variant={isRunning ? 'secondary' : 'default'}
                    className=""
                    onClick={toggleIsRunning}
                >
                    {isRunning ? <PauseIcon /> : <PlayIcon className="" />}
                </Button>
            </TooltipTrigger>
            <TooltipContent>
                <p className="font-sans">Pause</p>
            </TooltipContent>
        </Tooltip>
    );
}

export function ResetSim() {
    const { requestReset, clearPoints } = useLorenzStore();

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button
                    onClick={() => {
                        requestReset();
                        clearPoints();
                    }}
                    variant={'destructive'}
                    className=""
                >
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
                <Button disabled variant={'secondary'} className="">
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
    const { resetCamera } = useLorenzStore();

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button onClick={resetCamera} variant={'secondary'} className="">
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
    const { speed, setSpeed } = useLorenzStore();

    const handleCycleSpeed = () => {
        const currentIndex = speedOptions.indexOf(speed);
        const nextIndex = (currentIndex + 1) % speedOptions.length;
        setSpeed(speedOptions[nextIndex]);
    };

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button variant={'secondary'} className="" onClick={handleCycleSpeed}>
                    {speed === 0.5 ? (
                        <SnailIcon />
                    ) : speed === 1 ? (
                        <RabbitIcon />
                    ) : (
                        <TrainFrontIcon />
                    )}
                </Button>
            </TooltipTrigger>
            <TooltipContent>
                <p className="font-sans">Change Speed {`(x${speed})`}</p>
            </TooltipContent>
        </Tooltip>
    );
}
