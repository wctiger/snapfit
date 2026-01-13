import { Moon, Sun, Scissors } from 'lucide-react';
import { Button } from '../ui/button';
import { useStore } from '../../stores/store';

export default function TopBar() {
    const { theme, setTheme } = useStore();
    return (
        <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/40">
            <div className="container mx-auto flex h-14 sm:h-16 items-center px-4 sm:px-6">
                <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                        <Scissors className="h-4 w-4" />
                    </div>
                    <span className="text-lg sm:text-xl font-semibold tracking-tight">SNAPFIT</span>
                </div>
                <div className="flex-grow" />
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 rounded-lg hover:bg-accent"
                    onClick={() => {
                        const nextKey = theme === 'dark' ? 'light' : 'dark';
                        setTheme(nextKey);
                    }}
                    aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                    {theme === 'dark' ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
                </Button>
            </div>
        </header>
    );
}
