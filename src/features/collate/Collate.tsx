import { Download, Loader2, Check } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import photoPaperConfigRaw from '../../config/photo-paper-config.json';
import useImageCollate from './hooks/useImageCollate';
import { useStore } from '../../stores/store';
import { IImageConfig } from '../../types';
import StyledPaper from '../../components/StyledPaper';

const photoPaperConfigArr = photoPaperConfigRaw as IImageConfig[];

const BG_OPTIONS = [{ value: '#fff', label: 'White', bgClass: 'bg-white', borderClass: 'border border-border' }];

const CUSTOM_NAME = 'Custom';

type DimUnit = 'mm' | 'inch';

function toInternalConfig(w: number, h: number, unit: DimUnit, backgroundColor: string): IImageConfig {
    return {
        name: CUSTOM_NAME,
        width: unit === 'mm' ? w / 10 : w,
        height: unit === 'mm' ? h / 10 : h,
        unit: unit === 'mm' ? 'cm' : 'inch',
        backgroundColor,
    };
}

const Collate = () => {
    const { uploadImage, photoPaper, setPhotoPaper } = useStore();
    const { loading, downloadPrint } = useImageCollate();

    const [backgroundColor, setBackgroundColor] = useState('#fff');

    const [customUnit, setCustomUnit] = useState<DimUnit>('mm');
    const [customW, setCustomW] = useState('');
    const [customH, setCustomH] = useState('');

    const isCustom = photoPaper?.name === CUSTOM_NAME;

    useEffect(() => {
        const defaultPaper = photoPaperConfigArr.find(c => c.name === '6寸(4R)') ?? photoPaperConfigArr[0];
        setPhotoPaper({ ...defaultPaper, backgroundColor });
    }, []);

    const applyCustomDims = (w: string, h: string, unit: DimUnit, bgColor: string) => {
        const wv = parseFloat(w);
        const hv = parseFloat(h);
        if (wv > 0 && hv > 0) {
            setPhotoPaper(toInternalConfig(wv, hv, unit, bgColor));
        }
    };

    const onPhotoPaperChange = (value: string) => {
        if (value === CUSTOM_NAME) {
            setPhotoPaper({ name: CUSTOM_NAME, width: 0, height: 0, unit: 'cm', backgroundColor });
            return;
        }
        const selectedConfig = photoPaperConfigArr.find(config => config.name === value);
        if (selectedConfig) {
            setPhotoPaper({ ...selectedConfig, backgroundColor });
        }
    };

    const onBgChange = (value: string) => {
        setBackgroundColor(value);
        setPhotoPaper({ ...photoPaper!, backgroundColor: value });
    };

    return (
        <StyledPaper>
            {uploadImage && (
                <>
                    {/* Header */}
                    <div className="mb-4 space-y-0.5">
                        <h2 className="font-display text-2xl sm:text-3xl font-light tracking-wide">Arrange</h2>
                        <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground/70">
                            Layout for printing
                        </p>
                    </div>

                    {/* Controls row */}
                    <div className="grid grid-cols-2 gap-x-5 gap-y-4 mb-4">
                        {/* Paper size */}
                        <div className="col-span-2 sm:col-span-1">
                            <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground/70 mb-1.5">
                                Paper Size
                            </p>
                            <Select value={photoPaper?.name ?? ''} onValueChange={onPhotoPaperChange}>
                                <SelectTrigger className="h-9 text-xs w-full">
                                    <SelectValue placeholder="Select paper size" />
                                </SelectTrigger>
                                <SelectContent>
                                    {photoPaperConfigArr.map(({ name, unit }) => (
                                        <SelectItem key={name} value={name} className="text-xs">
                                            {`${name} ${unit}`}
                                        </SelectItem>
                                    ))}
                                    <SelectItem value={CUSTOM_NAME} className="text-xs">
                                        <span>{CUSTOM_NAME}</span>
                                        <span className="ml-3 text-muted-foreground/60">enter dimensions</span>
                                    </SelectItem>
                                </SelectContent>
                            </Select>

                            {isCustom && (
                                <div className="mt-2 space-y-2">
                                    <div className="flex gap-1">
                                        {(['mm', 'inch'] as const).map(u => (
                                            <button
                                                key={u}
                                                onClick={() => {
                                                    setCustomUnit(u);
                                                    applyCustomDims(customW, customH, u, backgroundColor);
                                                }}
                                                className={cn(
                                                    'px-2.5 py-1 text-[10px] tracking-[0.15em] uppercase border transition-colors',
                                                    customUnit === u
                                                        ? 'border-primary text-primary bg-primary/5'
                                                        : 'border-border/50 text-muted-foreground hover:border-border'
                                                )}
                                            >
                                                {u}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Input
                                            type="number"
                                            placeholder="W"
                                            value={customW}
                                            min={1}
                                            className="h-8 text-xs w-20"
                                            onChange={e => {
                                                setCustomW(e.target.value);
                                                applyCustomDims(e.target.value, customH, customUnit, backgroundColor);
                                            }}
                                        />
                                        <span className="text-muted-foreground/50 text-xs">×</span>
                                        <Input
                                            type="number"
                                            placeholder="H"
                                            value={customH}
                                            min={1}
                                            className="h-8 text-xs w-20"
                                            onChange={e => {
                                                setCustomH(e.target.value);
                                                applyCustomDims(customW, e.target.value, customUnit, backgroundColor);
                                            }}
                                        />
                                        <span className="text-[10px] text-muted-foreground/50">{customUnit}</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Background swatches */}
                        <div className="col-span-2 sm:col-span-1">
                            <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground/70 mb-1.5">
                                Background
                            </p>
                            <div className="flex items-center gap-2.5 h-9">
                                {BG_OPTIONS.map(opt => (
                                    <button
                                        key={opt.value}
                                        onClick={() => onBgChange(opt.value)}
                                        title={opt.label}
                                        aria-label={opt.label}
                                        className={cn(
                                            'w-7 h-7 flex items-center justify-center transition-all duration-200',
                                            opt.bgClass,
                                            opt.borderClass,
                                            backgroundColor === opt.value
                                                ? 'ring-2 ring-primary ring-offset-2 ring-offset-background'
                                                : 'hover:ring-1 hover:ring-border hover:ring-offset-1 hover:ring-offset-background'
                                        )}
                                    >
                                        {backgroundColor === opt.value && (
                                            <Check
                                                className={cn(
                                                    'h-3 w-3',
                                                    opt.value === '#fff' ? 'text-foreground/60' : 'text-white'
                                                )}
                                            />
                                        )}
                                    </button>
                                ))}
                                <span className="text-[10px] tracking-[0.1em] text-muted-foreground/60 ml-1">
                                    {BG_OPTIONS.find(o => o.value === backgroundColor)?.label}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Canvas preview */}
                    <div className="flex-grow flex items-center justify-center p-4 bg-muted/20 border border-border/30 overflow-hidden">
                        <div className="relative">
                            {loading && (
                                <div className="absolute inset-0 flex items-center justify-center bg-background/70 z-10">
                                    <Loader2 className="h-5 w-5 animate-spin text-primary" />
                                </div>
                            )}
                            <canvas id="collate-canvas" className="max-w-full max-h-[55vh] sm:max-h-[60vh] shadow-md" />
                        </div>
                    </div>

                    {/* Download */}
                    <div className="mt-4 pt-4 border-t border-border/40">
                        <Button
                            variant="default"
                            size="sm"
                            className="text-xs tracking-[0.1em] uppercase"
                            onClick={downloadPrint}
                            disabled={loading}
                        >
                            {loading ? (
                                <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />
                            ) : (
                                <Download className="mr-2 h-3.5 w-3.5" />
                            )}
                            Download Print
                        </Button>
                    </div>
                </>
            )}
        </StyledPaper>
    );
};

export default Collate;
