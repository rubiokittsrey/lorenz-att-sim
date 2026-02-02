import { useState } from 'react';
import { Slider } from '../ui/slider';
import { Settings2 } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';

export default function Parameters() {
    const presets = ['classic', 'complex', 'stable'];
    const [preset, setPreset] = useState<string>('classic');

    return (
        <div className="flex flex-col space-y-8 p-8">
            <div className="flex justify-between">
                <h3 className="text-lg flex items-center">
                    <Settings2 className="mr-2 size-5" /> Parameters
                </h3>
                <Tabs
                    defaultValue="classic"
                    className="h-8"
                    onValueChange={(val) => {
                        setPreset(val);
                    }}
                >
                    <TabsList className="bg-input/50 p-0 rounded border">
                        {presets.map((p) => (
                            <TabsTrigger
                                className="text-xs cursor-pointer data-[state=active]:dark:bg-primary data-[state=active]:dark:text-black rounded"
                                key={p}
                                value={p}
                            >
                                {p.charAt(0).toUpperCase() + p.slice(1)}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </Tabs>
            </div>
            <SigmaSlider />
            <RhoSlider />
            <BetaSlider />
            <DeltaTimeSlider />
        </div>
    );
}

export function SigmaSlider() {
    const [val, setVal] = useState(10.0);

    return (
        <div className="flex flex-col">
            <div className="flex flex-row justify-between items-center space-y-3">
                <h4>
                    Sigma (<span className="">σ</span>)
                </h4>
                <h4>{val.toFixed(2)}</h4>
            </div>
            <Slider
                className="[&>span>span>span]:h-1 [&>span>span>span]:w-1 h-1"
                onValueChange={(n) => {
                    setVal(n[0]);
                }}
                defaultValue={[10]}
                max={20}
                step={0.1}
            />
        </div>
    );
}

export function RhoSlider() {
    const [val, setVal] = useState(28.0);

    return (
        <div className="flex flex-col">
            <div className="flex flex-row justify-between items-center space-y-3">
                <h4>
                    Rho (<span className="">ρ</span>)
                </h4>
                <h4>{val.toFixed(2)}</h4>
            </div>
            <Slider
                className=""
                onValueChange={(n) => {
                    setVal(n[0]);
                }}
                defaultValue={[28.0]}
                max={50}
                step={0.1}
            />
        </div>
    );
}

export function BetaSlider() {
    const [val, setVal] = useState(2.67);

    return (
        <div className="flex flex-col">
            <div className="flex flex-row justify-between items-center space-y-3">
                <h4>Beta (β)</h4>
                <h4>{val.toFixed(2)}</h4>
            </div>
            <Slider
                className=""
                onValueChange={(n) => {
                    setVal(n[0]);
                }}
                defaultValue={[2.67]}
                max={5}
                step={0.01}
            />
        </div>
    );
}

export function DeltaTimeSlider() {
    const [val, setVal] = useState(0.01);

    return (
        <div className="flex flex-col">
            <div className="flex flex-row justify-between items-center space-y-3">
                <h4>Time Step (dt)</h4>
                <h4>{val.toFixed(3)}</h4>
            </div>
            <Slider
                className=""
                onValueChange={(n) => {
                    setVal(n[0]);
                }}
                defaultValue={[0.01]}
                max={0.05}
                min={0.001}
                step={0.001}
            />
        </div>
    );
}
