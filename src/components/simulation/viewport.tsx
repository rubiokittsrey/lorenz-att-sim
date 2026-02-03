import { cn } from '@/lib/utils';

export default function SimulationViewPort({
    className,
    children,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            {...props}
            className={cn(
                'col-span-8 h-full w-full dark:bg-zinc-950 bg-neutral-600 relative',
                className
            )}
        >
            {children}
        </div>
    );
}
