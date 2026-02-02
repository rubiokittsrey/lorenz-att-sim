import { Button } from '@/components/ui/button';
import { Transition, motion, AnimatePresence } from 'framer-motion';
import { MoonStar, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const themeToggleTransition: Transition = {
        duration: 0.25,
        ease: 'anticipate',
        stiffness: 15,
        damping: 15,
        mass: 4,
    };

    const handleThemeToggle = () => {
        if (!mounted) return;
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    if (!mounted) {
        return <Button variant="secondary" className="overflow-clip relative px-5" />;
    }

    return (
        <Button
            variant="secondary"
            onClick={handleThemeToggle}
            className="overflow-clip relative p-5 rounded bg-white dark:bg-black"
        >
            <AnimatePresence initial={false} mode="wait">
                {theme === 'light' && (
                    <motion.div
                        className="absolute"
                        key="sun"
                        initial={{ y: 150, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 50, opacity: 1 }}
                        transition={themeToggleTransition}
                    >
                        <Sun className="size-4.5" />
                    </motion.div>
                )}

                {theme === 'dark' && (
                    <motion.div
                        className="absolute"
                        key="moon"
                        initial={{ y: -150, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -50, opacity: 1 }}
                        transition={themeToggleTransition}
                    >
                        <MoonStar className="size-4.5" />
                    </motion.div>
                )}
            </AnimatePresence>
        </Button>
    );
}
