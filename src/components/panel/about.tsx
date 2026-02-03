import { CircleQuestionMarkIcon, CopyrightIcon } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function About() {
    const tabs = ['project', 'lorenz', 'guide'];

    return (
        <div className="flex flex-col space-y-8 p-8">
            <div className="flex justify-between">
                <h3 className="text-lg flex items-center">
                    <CircleQuestionMarkIcon className="mr-2 size-5" /> About
                </h3>
            </div>

            <Tabs defaultValue="project" className="w-full">
                <TabsList className="grid w-full grid-cols-3 w-full bg-input/50 p-0 rounded border h-8">
                    {tabs.map((t) => (
                        <TabsTrigger
                            key={t}
                            value={t}
                            className="rounded data-[state=active]:dark:bg-primary data-[state=active]:dark:text-black cursor-pointer"
                        >
                            {t.charAt(0).toUpperCase() + t.slice(1)}
                        </TabsTrigger>
                    ))}
                </TabsList>

                <TabsContent value="project">
                    <ProjectTab />
                </TabsContent>

                <TabsContent value="lorenz">
                    <LorenzAttractorTab />
                </TabsContent>

                <TabsContent value="guide">
                    <GuideTab />
                </TabsContent>
            </Tabs>
        </div>
    );
}

export function ProjectTab() {
    return (
        <div className="space-y-4 mt-4">
            <p>
                This is a real-time 3D visualization of the Lorenz attractor built with React and
                Three.js. The simulation uses WebGL acceleration for smooth rendering of complex
                chaotic trajectories in 3D space.
            </p>
            <p>
                The visualization employs a circular buffer implementation to maintain optimal
                performance even with thousands of trajectory points. This approach ensures a fixed
                memory footprint while providing smooth animations at 60 FPS.
            </p>
            <p>
                The trail uses color gradients to show the temporal evolution of the system -
                brighter colors represent newer positions while darker colors fade into the past,
                creating an intuitive visual representation of the attractor's path through phase
                space.
            </p>
            <div className="space-y-2">
                <p className="font-semibold">Key Features:</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>Real-time 3D rendering with WebGL acceleration</li>
                    <li>Interactive camera controls for exploring the attractor</li>
                    <li>Adjustable simulation parameters (σ, ρ, β, dt)</li>
                    <li>Variable speed control with steps-per-frame rendering</li>
                    <li>Dynamic trail length adjustment</li>
                    <li>Color schemes for visual customization</li>
                    <li>Grid and axes helpers for spatial reference</li>
                </ul>
            </div>
        </div>
    );
}

export function LorenzAttractorTab() {
    return (
        <div className="space-y-4 mt-4">
            <p>
                The Lorenz attractor is a set of chaotic solutions to the Lorenz system, a system of
                three coupled ordinary differential equations discovered by Edward Lorenz in 1963
                while studying atmospheric convection.
            </p>
            <p>
                The system is defined by three equations that describe how three variables (x, y, z)
                change over time:
            </p>
            <div className="bg-muted p-4 rounded-md font-mono text-sm space-y-1">
                <div>dx/dt = σ(y - x)</div>
                <div>dy/dt = x(ρ - z) - y</div>
                <div>dz/dt = xy - βz</div>
            </div>
            <div className="space-y-2">
                <p className="font-semibold">Parameters:</p>
                <ul className="space-y-1">
                    <li>
                        <strong>σ (sigma)</strong> - Prandtl number, relates to fluid viscosity
                    </li>
                    <li>
                        <strong>ρ (rho)</strong> - Rayleigh number, relates to temperature
                        difference
                    </li>
                    <li>
                        <strong>β (beta)</strong> - Relates to the physical dimensions of the system
                    </li>
                    <li>
                        <strong>dt</strong> - Time step for numerical integration
                    </li>
                </ul>
            </div>
            <p>
                The Lorenz system exhibits sensitive dependence on initial conditions - a hallmark
                of chaos theory. Even tiny changes in starting position lead to dramatically
                different trajectories, yet the system always traces out the same distinctive
                butterfly-shaped structure in phase space.
            </p>
            <p>
                The classic parameters (σ=10, ρ=28, β=8/3) produce the iconic butterfly shape, but
                exploring different parameter values reveals a rich variety of chaotic and periodic
                behaviors, showcasing the complexity hidden within these simple equations.
            </p>
        </div>
    );
}

export function GuideTab() {
    return (
        <div className="space-y-4 mt-4">
            <div className="space-y-5">
                <div>
                    <p className="font-semibold mb-2">Camera Controls:</p>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                        <li>
                            <strong>Drag</strong> - Rotate the camera and view the attractor from
                            different angles
                        </li>
                        <li>
                            <strong>Shift + Drag</strong> - Pan the view in any direction
                        </li>
                        <li>
                            <strong>Scroll</strong> - Zoom in and out
                        </li>
                    </ul>
                </div>

                <div>
                    <p className="font-semibold mb-2">Simulation Controls:</p>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                        <li>
                            <strong>Play/Pause</strong> - Start or stop the simulation
                        </li>
                        <li>
                            <strong>Reset</strong> - Clear the trail and restart from the initial
                            position
                        </li>
                        <li>
                            <strong>Speed</strong> - Control how many calculation steps occur per
                            frame (1x = real-time, higher = faster)
                        </li>
                    </ul>
                </div>

                <div>
                    <p className="font-semibold mb-2">Parameters:</p>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                        <li>
                            <strong>σ, ρ, β</strong> - Adjust these to explore different chaotic
                            behaviors and patterns
                        </li>
                        <li>
                            <strong>dt (Time Step)</strong> - Smaller values give more accurate
                            simulations but slower movement; larger values speed up the animation
                        </li>
                        <li>
                            <strong>Max Points</strong> - Controls the length of the visible trail
                            (more points = longer tail)
                        </li>
                    </ul>
                </div>

                <div>
                    <p className="font-semibold mb-2">Visual Options:</p>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                        <li>
                            <strong>Color Scheme</strong> - Choose different color gradients for the
                            trail
                        </li>
                        <li>
                            <strong>Show Grid/Axes</strong> - Toggle spatial reference helpers for
                            better orientation
                        </li>
                    </ul>
                </div>

                <div className="bg-muted rounded-md">
                    <p className="font-semibold mb-2">Tips:</p>
                    <ul className="list-disc list-inside space-y-1 text-sm ml-2">
                        <li>
                            Try the classic parameters (σ=10, ρ=28, β=8/3) to see the iconic
                            butterfly shape
                        </li>
                        <li>
                            Experiment with different ρ values (20-30) to see various chaotic
                            patterns
                        </li>
                        <li>
                            Increase speed for a faster-forming pattern, or slow it down to watch
                            the trajectory evolve in detail
                        </li>
                        <li>
                            Rotate the view to appreciate the 3D structure - the attractor looks
                            different from every angle
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
