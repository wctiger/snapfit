import { FC, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface StyledPaperProps {
    children: ReactNode;
    className?: string;
    sx?: any;
}

const StyledPaper: FC<StyledPaperProps> = ({ children, className }) => {
    return (
        <div
            className={cn(
                'w-full h-full flex flex-col p-5 sm:p-6',
                'bg-card text-card-foreground',
                'border border-border/60',
                'shadow-card',
                'animate-fade-up',
                className
            )}
        >
            {children}
        </div>
    );
};

export default StyledPaper;
