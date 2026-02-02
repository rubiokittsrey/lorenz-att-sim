import { CheckIcon, PaletteIcon, PipetteIcon } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

export default function Visualization() {
    const [displayMode, setDisplayMode] = useState<'line' | 'dots'>('line');
    const [color, setColor] = useState('orange');

    const colors = {
        orange: {
            className: 'bg-orange-500',
        },
        red: {
            className: 'bg-red-500',
        },
        blue: {
            className: 'bg-blue-500',
        },
        green: {
            className: 'bg-green-500',
        },
        yellow: {
            className: 'bg-yellow-500',
        },
        pink: {
            className: 'bg-pink-500',
        },
    };
    const colorsKeys = Object.keys(colors) as (keyof typeof colors)[];

    return (
        <div className="flex flex-col space-y-8 p-8">
            <div className="flex justify-between">
                <h3 className="text-lg flex items-center">
                    <PaletteIcon className="mr-2 size-5" /> Visualization
                </h3>
            </div>
            <div className="flex flex-col space-y-3">
                <h4>Path Color</h4>
                <div className="flex space-x-2">
                    {colorsKeys.map((c) => (
                        <button
                            key={c}
                            className={cn(
                                'size-8 rounded cursor-pointer flex items-center justify-center',
                                colors[c].className
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
        </div>
    );
}
