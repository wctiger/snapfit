import { Github } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const Footer = () => {
    return (
        <footer className="mt-auto py-6 px-4 bg-background">
            <div className="h-[1px] w-full bg-border mb-4" />
            <div className="flex flex-col sm:flex-row items-center justify-between text-center text-sm mt-2">
                <p className="text-muted-foreground">
                    Inspired by [
                    <a href="http://www.sandcomp.com/blog/sandphoto/" target="_blank" rel="noreferrer" className="hover:underline text-foreground">
                        sandphoto
                    </a>
                    ]
                </p>
                <div className="flex items-center mt-2 sm:mt-0">
                    <p className="text-muted-foreground">
                        Copyright &copy;&nbsp;
                        <a href="https://github.com/wctiger" target="_blank" rel="noreferrer" className="hover:underline text-foreground">
                            wctiger
                        </a>
                    </p>
                    <a href="https://github.com/wctiger" target="_blank" rel="noreferrer" className="ml-2 text-foreground hover:text-muted-foreground">
                        <Github className="h-4 w-4" />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
