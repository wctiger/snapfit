import { Printer, ArrowLeft } from 'lucide-react';
import StyledPaper from '../../components/StyledPaper';

const Preview = () => {
    return (
        <StyledPaper className="justify-center items-center">
            <div className="flex flex-col items-center justify-center gap-6 text-center max-w-sm mx-auto">
                <div className="p-4 rounded-full bg-muted">
                    <Printer className="h-8 w-8 sm:h-10 sm:w-10 text-muted-foreground" />
                </div>
                <div className="space-y-2">
                    <h2 className="text-lg sm:text-xl font-semibold tracking-tight">Print Preview</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        Your print layout will appear here once you upload a photo.
                    </p>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <ArrowLeft className="h-4 w-4" />
                    <span>Start by uploading a photo</span>
                </div>
            </div>
        </StyledPaper>
    );
};

export default Preview;
