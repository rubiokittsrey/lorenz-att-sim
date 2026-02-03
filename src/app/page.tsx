'use client';

import About from '@/components/panel/about';
import Parameters from '@/components/panel/parameters';
import Preferences from '@/components/panel/settings';
import Visualization from '@/components/panel/visualization';
import SimulationControls from '@/components/simulation/controls';
import GizmoToggles from '@/components/simulation/gizmo-toggles';
import StatsForNerds from '@/components/simulation/stats-for-nerds';
import SimulationViewPort, { SimulationThreeCanvas } from '@/components/simulation/viewport';
import SiteTitle from '@/components/site-title';
import { Button } from '@/components/ui/button';
import { useLorenzStore } from '@/lib/simulation/store';
import { cn } from '@/lib/utils';
import { AsteriskIcon, CopyrightIcon } from 'lucide-react';

export default function LorenzAttractor3d() {
    const { hideUI } = useLorenzStore();

    return (
        <div className="grid grid-cols-12 h-full overflow-hidden ">
            <SimulationViewPort className="col-span-8">
                <SimulationThreeCanvas />
                {!hideUI && (
                    <>
                        <SiteTitle className="absolute top-8 left-8" />
                        <GizmoToggles className="absolute top-8 right-8" />
                        <SimulationControls className="absolute bottom-8 right-8" />
                        <StatsForNerds className="absolute bottom-8 left-8" />
                    </>
                )}
            </SimulationViewPort>
            <Panel className="col-span-4" />
        </div>
    );
}

function Panel({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={cn('h-full overflow-y-auto', className)} {...props}>
            <Parameters />
            <hr className="border-t border-gray-400/50 dark:border-neutral-600/50 mt-3 mb-1" />
            <Visualization />
            <hr className="border-t border-gray-400/50 dark:border-neutral-600/50 mt-3 mb-1" />
            <Preferences />
            <hr className="border-t border-gray-400/50 dark:border-neutral-600/50 mt-3 mb-1" />
            <About />
            <hr className="border-t border-gray-400/50 dark:border-neutral-600/50 mt-3 mb-1" />
            <CopyRightSection />
        </div>
    );
}

function CopyRightSection() {
    return (
        <div className="flex justify-between">
            <p className="flex items-center opacity-30 p-2 px-8 mb-2">
                <CopyrightIcon className="size-4 mr-2 text-xs" /> {new Date().getFullYear()}
            </p>
            <Button variant={'link'} className="flex items-center opacity-30 p-2 px-8 mb-2">
                rubiokittsrey.dev
            </Button>
        </div>
    );
}
