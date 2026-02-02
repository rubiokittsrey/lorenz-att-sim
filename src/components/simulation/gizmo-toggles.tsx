import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Tooltip, TooltipTrigger, TooltipContent } from '../ui/tooltip';
import { Button } from '../ui/button';
import { GridIcon, Move3DIcon } from 'lucide-react';

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
    const [isHidden, setHidden] = useState(true);

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button
                    variant={isHidden ? 'secondary' : 'default'}
                    className={cn('', isHidden && 'opacity-50 hover:opacity-100')}
                    onClick={() => {
                        setHidden((prev) => !prev);
                    }}
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
    const [isHidden, setHidden] = useState(true);

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button
                    variant={isHidden ? 'secondary' : 'default'}
                    className={cn('', isHidden && 'opacity-50 hover:opacity-100')}
                    onClick={() => {
                        setHidden((prev) => !prev);
                    }}
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
