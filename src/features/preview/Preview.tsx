import { ArrowLeft } from 'lucide-react';
import StyledPaper from '../../components/StyledPaper';

const STEPS = [
    { num: '01', label: 'Upload', desc: 'Select a photo from your device' },
    { num: '02', label: 'Crop', desc: 'Choose a target size and frame' },
    { num: '03', label: 'Arrange', desc: 'Set paper size and background' },
];

const Preview = () => {
    return (
        <StyledPaper className="justify-center items-center">
            <div className="w-full flex flex-col gap-7 max-w-[260px] mx-auto">
                <div className="space-y-1">
                    <h2 className="font-display text-2xl sm:text-3xl font-light tracking-wide">Print Preview</h2>
                    <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground/70">
                        Your layout will appear here
                    </p>
                </div>

                <div className="space-y-5">
                    {STEPS.map((step, i) => (
                        <div
                            key={step.num}
                            className="flex items-start gap-4 animate-fade-up"
                            style={{ animationDelay: `${0.15 + i * 0.08}s` }}
                        >
                            <span className="font-display text-3xl font-light text-primary/25 leading-none mt-0.5 w-8 flex-shrink-0">
                                {step.num}
                            </span>
                            <div className="space-y-0.5 pt-1">
                                <p className="text-[10px] tracking-[0.22em] uppercase font-medium text-foreground/70">
                                    {step.label}
                                </p>
                                <p className="text-[11px] text-muted-foreground leading-relaxed">{step.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div
                    className="flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-muted-foreground/50 animate-fade-up"
                    style={{ animationDelay: '0.42s' }}
                >
                    <ArrowLeft className="h-3 w-3" />
                    <span>Start with a photo</span>
                </div>
            </div>
        </StyledPaper>
    );
};

export default Preview;
