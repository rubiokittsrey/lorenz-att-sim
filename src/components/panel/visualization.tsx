import { CheckIcon, EllipsisIcon, MinusIcon, PaletteIcon, PipetteIcon } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { pathColors } from '@/lib/simulation/constants';

export default function Visualization() {
    const [displayMode, setDisplayMode] = useState<'line' | 'dots'>('line');

    return (
        <div className="flex flex-col space-y-8 p-8">
            <div className="flex justify-between">
                <h3 className="text-lg flex items-center">
                    <PaletteIcon className="mr-2 size-5" /> Visualization
                </h3>
            </div>
            <PathColor />
            <DisplayMode />
        </div>
    );
}

export function PathColor() {
    const [color, setColor] = useState('orange');
    const pathColorsKeys = Object.keys(pathColors) as (keyof typeof pathColors)[];

    return (
        <div className="flex flex-col space-y-3">
            <h4>Path Color</h4>
            <div className="flex space-x-2">
                {pathColorsKeys.map((c) => (
                    <button
                        key={c}
                        className={cn(
                            'size-8 rounded cursor-pointer flex items-center justify-center',
                            pathColors[c].className
                        )}
                        onClick={() => {
                            setColor(c);
                        }}
                    >
                        {c === color && <CheckIcon className="stroke-2 size-5" />}
                    </button>
                ))}
                {/* <button
                        className={cn(
                            'size-8 rounded cursor-pointer flex items-center justify-center bg-neutral-600'
                        )}
                        onClick={() => {}}
                    >
                        <PipetteIcon className="size-4" />
                    </button> */}
            </div>
        </div>
    );
}

export function DisplayMode() {
    const [mode, setMode] = useState<'line' | 'dots'>('line');

    return (
        <div className="flex flex-col space-y-3">
            <h4>Display Mode</h4>
            <div className="flex space-x-3">
                <Button
                    onClick={() => setMode('line')}
                    variant={mode === 'line' ? 'default' : 'outline'}
                    className="border"
                >
                    Line <MinusIcon />
                </Button>
                <Button
                    onClick={() => setMode('dots')}
                    variant={mode === 'dots' ? 'default' : 'outline'}
                    className="border"
                >
                    Dots <EllipsisIcon />
                </Button>
            </div>
        </div>
    );
}
