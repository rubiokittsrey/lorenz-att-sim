import { CircleQuestionMarkIcon, Settings } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Switch } from '../ui/switch';
import { useTheme } from 'next-themes';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';
import { MaxPointsSelections } from '@/lib/simulation/types';
import { maxPointsOptions } from '@/lib/simulation/constants';
import { useLorenzStore } from '@/lib/simulation/store';

export default function Preferences() {
    return (
        <div className="flex flex-col space-y-8 p-8">
            <div className="flex justify-between">
                <h3 className="text-lg flex items-center">
                    <Settings className="mr-2 size-5" /> Preferences
                </h3>
            </div>
            <div className="flex flex-col space-y-3">
                <ShowControlsSwitch />
                <ShowStatsSwitch />
                <ThemeSwitch />
            </div>
            <MaxPoints />
        </div>
    );
}

export function ShowStatsSwitch() {
    const { hideStats, hideUI, toggleStats } = useLorenzStore();

    return (
        <div className="flex flex-col space-y-3">
            <div className="flex flex-row space-x-3 items-center">
                <Switch
                    disabled={hideUI}
                    checked={!hideStats}
                    onCheckedChange={toggleStats}
                    size="sm"
                />
                <p>Show stats for nerds</p>
            </div>
        </div>
    );
}

export function ShowControlsSwitch() {
    const { hideUI, toggleUI, hideStats, toggleStats } = useLorenzStore();

    return (
        <div className="flex flex-col space-y-3">
            <div className="flex flex-row space-x-3 items-center">
                <Switch
                    checked={hideUI}
                    onCheckedChange={() => {
                        toggleUI();
                        if (!hideStats) toggleStats();
                    }}
                    size="sm"
                />
                <p>Hide User Interface</p>
            </div>
        </div>
    );
}

export function ThemeSwitch() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="flex flex-col space-y-3">
            <div className="flex flex-row space-x-3 items-center">
                <Switch
                    checked={theme === 'dark'}
                    onCheckedChange={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
                    size="sm"
                />
                <p>Dark Mode</p>
            </div>
        </div>
    );
}

export function MaxPoints() {
    const { maxPoints, setMaxPoints } = useLorenzStore();

    return (
        <div className="flex flex-col space-y-3">
            <div className="flex flex-row space-x-3 items-center">
                <p>Max Points</p>
                <HoverCard openDelay={0} closeDelay={0}>
                    <HoverCardTrigger asChild>
                        <CircleQuestionMarkIcon className="size-4" />
                    </HoverCardTrigger>
                    <HoverCardContent className="font-sans flex flex-col space-y-2">
                        <p className="text-sm">Maximum Rendered Points</p>
                        <p className="text-xs opacity-50">
                            This value controls how many points are rendered in the simulation at
                            once. Increasing it may impact performance.
                        </p>
                    </HoverCardContent>
                </HoverCard>
            </div>
            <Tabs
                value={maxPoints.toString()}
                onValueChange={(v) => setMaxPoints(Number(v) as MaxPointsSelections)}
                className="w-full "
            >
                <TabsList className="grid grid-cols-5 w-full bg-input/50 p-0 rounded border h-8">
                    {maxPointsOptions.map((points) => (
                        <TabsTrigger
                            key={points}
                            value={points.toString()}
                            className="rounded data-[state=active]:dark:bg-primary data-[state=active]:dark:text-black cursor-pointer"
                        >
                            {points >= 1000 ? `${points / 1000}k` : points}
                        </TabsTrigger>
                    ))}
                </TabsList>
            </Tabs>
        </div>
    );
}
