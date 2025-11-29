import { Moon, Sun, Scissors } from 'lucide-react';
import { Button } from '../ui/button';
import { useStore } from '../../stores/store';

export default function TopBar() {
    const { theme, setTheme } = useStore();
    return (
        <header className="bg-background text-foreground border-b shadow-sm">
            <div className="container mx-auto flex h-16 items-center px-4">
                <Button variant="ghost" size="icon" className="mr-2 hover:bg-accent hover:text-accent-foreground">
                    <Scissors className="h-6 w-6" />
                </Button>
                <div className="flex-grow text-xl font-semibold">
                    SNAPFIT
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    className="ml-1 hover:bg-accent hover:text-accent-foreground"
                    onClick={() => {
                        const nextKey = theme === 'dark' ? 'light' : 'dark';
                        setTheme(nextKey);
                    }}
                >
                    {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>
            </div>
        </header>
    );
}
