import { pointerIdleWaitPeriod } from '@/lib/simulation/constants';
import { useLorenzStore } from '@/lib/simulation/store';
import { useEffect, useRef } from 'react';

export default function MouseMovementListener({
    children,
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    const setPointerIdle = useLorenzStore((s) => s.setPointerIdle);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleMouseMove = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        } else {
            setPointerIdle(false);
        }

        timeoutRef.current = setTimeout(() => {
            setPointerIdle(true);
            timeoutRef.current = null;
        }, pointerIdleWaitPeriod * 1000);
    };

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return (
        <div {...props} className={className} onMouseMove={handleMouseMove}>
            {children}
        </div>
    );
}
