import { FC, ReactNode } from 'react';
import { Card, CardContent } from './ui/card';
import { cn } from '@/lib/utils';

interface StyledPaperProps {
    children: ReactNode;
    className?: string;
    sx?: any; // Keeping for compatibility but ignoring
}

const StyledPaper: FC<StyledPaperProps> = ({ children, className }) => {
    return (
        <Card
            className={cn(
                'w-full h-full flex flex-col p-5 sm:p-6',
                'shadow-card transition-shadow duration-200',
                'border border-border/50',
                className
            )}
        >
            <CardContent className="flex-1 flex flex-col p-0">{children}</CardContent>
        </Card>
    );
};

export default StyledPaper;
