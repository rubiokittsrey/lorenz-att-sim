import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Tooltip, TooltipTrigger, TooltipContent } from '../ui/tooltip';
import { Button } from '../ui/button';
import { GridIcon, Move3DIcon } from 'lucide-react';
import { useLorenzStore } from '@/lib/simulation/store';

export default function GizmoToggles({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div {...props} className={cn(className, 'flex flex-row space-x-2')}>
            <AxesToggle />
            <GridToggle />
        </div>
    );
}

export function AxesToggle() {
    const { showAxes, toggleAxes } = useLorenzStore();

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button
                    variant={showAxes ? 'default' : 'secondary'}
                    className={cn('', !showAxes && 'opacity-50 hover:opacity-100')}
                    onClick={toggleAxes}
                >
                    <Move3DIcon />
                </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
                <p className="font-sans">Toggle Axes</p>
            </TooltipContent>
        </Tooltip>
    );
}

export function GridToggle() {
    const { showGrids, toggleGrids } = useLorenzStore();

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button
                    variant={showGrids ? 'default' : 'secondary'}
                    className={cn('', !showGrids && 'opacity-50 hover:opacity-100')}
                    onClick={toggleGrids}
                >
                    <GridIcon />
                </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
                <p className="font-sans">Toggle Gridlines</p>
            </TooltipContent>
        </Tooltip>
    );
}
