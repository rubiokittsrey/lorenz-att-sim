'use client';

import About from '@/components/panel/about';
import Parameters from '@/components/panel/parameters';
import Visualization from '@/components/panel/visualization';
import SimulationControls from '@/components/simulation/controls';
import GizmoToggles from '@/components/simulation/gizmo-toggles';
import SimulationViewPort, { SimulationThreeCanvas } from '@/components/simulation/viewport';
import SiteTitle from '@/components/site-title';
import ThemeToggle from '@/components/theme-toggle';

export default function LorenzAttractor3d() {
    return (
        <div className="grid grid-cols-12 h-full overflow-hidden">
            <SimulationViewPort>
                <SiteTitle />
                <GizmoToggles className="absolute top-8 right-8" />
                <SimulationControls className="absolute bottom-8 right-8" />
                <SimulationThreeCanvas />
            </SimulationViewPort>
            <Panel />
        </div>
    );
}

function Panel() {
    return (
        <div className="col-span-4 h-full overflow-y-auto">
            <Parameters />
            <hr className="border-t border-gray-400/50 dark:border-neutral-600/50 mt-3 mb-1" />
            <Visualization />
            <hr className="border-t border-gray-400/50 dark:border-neutral-600/50 mt-3 mb-1" />
            <About />
        </div>
    );
}
