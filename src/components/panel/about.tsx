import { CircleQuestionMarkIcon, CopyrightIcon } from 'lucide-react';

export default function About() {
    return (
        <div className="flex flex-col space-y-8 p-8 pb-10">
            <div className="flex justify-between">
                <h3 className="text-lg flex items-center">
                    <CircleQuestionMarkIcon className="mr-2 size-5" /> About
                </h3>
            </div>
            <p>
                This version uses Three.js for true 3D rendering with WebGL acceleration. The
                visualization includes a grid and axes helpers for spatial reference. Drag to orbit
                the camera around the attractor, and scroll to zoom in/out. The attractor is
                rendered in real 3D space, allowing you to appreciate its complex structure from any
                angle.
            </p>
            <p className="flex items-center opacity-30">
                <CopyrightIcon className="size-4 mr-2 text-xs" /> {new Date().getFullYear()}
            </p>
        </div>
    );
}
