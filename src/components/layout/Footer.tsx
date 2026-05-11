import { Github } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="border-t border-border/50 bg-background">
            <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] tracking-[0.15em] uppercase text-muted-foreground/60">
                    <p>
                        Inspired by{' '}
                        <a
                            href="http://www.sandcomp.com/blog/sandphoto/"
                            target="_blank"
                            rel="noreferrer"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                            sandphoto
                        </a>
                    </p>
                    <div className="flex items-center gap-3">
                        <span>&copy; {new Date().getFullYear()}</span>
                        <a
                            href="https://github.com/wctiger"
                            target="_blank"
                            rel="noreferrer"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                            wctiger
                        </a>
                        <a
                            href="https://github.com/wctiger"
                            target="_blank"
                            rel="noreferrer"
                            className="p-1 hover:text-foreground transition-colors"
                            aria-label="GitHub"
                        >
                            <Github className="h-3 w-3" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
