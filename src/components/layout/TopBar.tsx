import { Moon, Sun, Scissors } from 'lucide-react';
import { useStore } from '../../stores/store';

export default function TopBar() {
    const { theme, setTheme, uploadImage } = useStore();

    return (
        <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/60">
            <div className="container mx-auto flex h-14 sm:h-16 items-center px-4 sm:px-6 gap-4">
                {/* Brand */}
                <div className="flex items-center gap-2.5 flex-shrink-0">
                    <div className="w-6 h-6 border border-primary flex items-center justify-center flex-shrink-0">
                        <Scissors className="h-3 w-3 text-primary" />
                    </div>
                    <span className="font-display text-[1.35rem] sm:text-[1.5rem] font-light tracking-[0.18em] leading-none">
                        SNAPFIT
                    </span>
                </div>

                {/* Step indicator */}
                <div className="flex-grow flex justify-center">
                    <div className="hidden sm:flex items-center gap-3 text-[10px] tracking-[0.22em] uppercase">
                        <span
                            className={`transition-colors duration-300 ${
                                !uploadImage ? 'text-primary font-medium' : 'text-muted-foreground/50 line-through'
                            }`}
                        >
                            01&thinsp;Upload
                        </span>
                        <span className="text-border">—</span>
                        <span
                            className={`transition-colors duration-300 ${
                                uploadImage ? 'text-primary font-medium' : 'text-muted-foreground/40'
                            }`}
                        >
                            02&thinsp;Prepare
                        </span>
                    </div>
                </div>

                {/* Theme toggle */}
                <button
                    className="w-8 h-8 flex-shrink-0 flex items-center justify-center border border-border hover:border-foreground/40 text-muted-foreground hover:text-foreground transition-all duration-200"
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                    {theme === 'dark' ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
                </button>
            </div>
        </header>
    );
}
