import { Github } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="mt-auto border-t border-border/40 bg-background/50">
            <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-5">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
                    <p>
                        Inspired by{' '}
                        <a
                            href="http://www.sandcomp.com/blog/sandphoto/"
                            target="_blank"
                            rel="noreferrer"
                            className="font-medium text-foreground/80 hover:text-foreground transition-colors"
                        >
                            sandphoto
                        </a>
                    </p>
                    <div className="flex items-center gap-1.5">
                        <span>&copy; {new Date().getFullYear()}</span>
                        <a
                            href="https://github.com/wctiger"
                            target="_blank"
                            rel="noreferrer"
                            className="font-medium text-foreground/80 hover:text-foreground transition-colors"
                        >
                            wctiger
                        </a>
                        <a
                            href="https://github.com/wctiger"
                            target="_blank"
                            rel="noreferrer"
                            className="ml-1 p-1 rounded-md hover:bg-accent transition-colors"
                            aria-label="GitHub"
                        >
                            <Github className="h-4 w-4" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
