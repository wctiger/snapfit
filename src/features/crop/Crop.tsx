import { Download, RotateCcw, ZoomIn, ZoomOut } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import Cropper, { Area } from 'react-easy-crop';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
import imageConfigRaw from '../../config/target-image-config.json';
import { getCroppedImg } from '../../core/imageHelpers';
import { useStore } from '../../stores/store';
import { IImageConfig } from '../../types';
import { downloadImage } from '../../utils';
import StyledPaper from '../../components/StyledPaper';
import { CUSTOM_NAME, DimUnit, toInternalConfig } from '../customDimensions';

const imageConfigArr = imageConfigRaw as IImageConfig[];

const ZOOM_MIN = 1;
const ZOOM_MAX = 3;

const Crop = () => {
    const croppedImageRaw = useRef<string>('');
    const { uploadImage, setUploadImage, targetImage, setTargetImage, setCrop } = useStore();

    const [crop, setLocalCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(ZOOM_MIN);

    const [customUnit, setCustomUnit] = useState<DimUnit>('mm');
    const [customW, setCustomW] = useState('');
    const [customH, setCustomH] = useState('');

    const isCustom = targetImage?.name === CUSTOM_NAME;
    const cropRatio = targetImage && targetImage.width > 0 ? targetImage.width / targetImage.height : undefined;

    useEffect(() => {
        setTargetImage(imageConfigArr[0]);
    }, []);

    // Debounce custom dim changes so canvas work only fires after typing stops
    useEffect(() => {
        if (!isCustom) return;
        const wv = parseFloat(customW);
        const hv = parseFloat(customH);
        if (!(wv > 0 && hv > 0)) return;
        const t = setTimeout(() => setTargetImage(toInternalConfig(wv, hv, customUnit)), 400);
        return () => clearTimeout(t);
    }, [customW, customH, customUnit, isCustom]);

    const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
        setCrop(croppedAreaPixels);
        if (uploadImage) {
            getCroppedImg(uploadImage, croppedAreaPixels).then(({ rawImageUrl }) => {
                if (rawImageUrl) {
                    croppedImageRaw.current = rawImageUrl;
                }
            });
        }
    };

    const onTargetImageChange = (value: string) => {
        if (value === CUSTOM_NAME) {
            setTargetImage({ name: CUSTOM_NAME, width: 0, height: 0, unit: 'cm' });
            return;
        }
        const selectedConfig = imageConfigArr.find(config => config.name === value);
        if (selectedConfig) {
            setTargetImage(selectedConfig);
        }
    };

    return (
        <StyledPaper>
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="space-y-0.5">
                    <h2 className="font-display text-2xl sm:text-3xl font-light tracking-wide">Crop Image</h2>
                    <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground/70">Frame your shot</p>
                </div>
                <button
                    className="flex items-center gap-1.5 text-[10px] tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors border border-transparent hover:border-border/50 px-2 py-1.5 mt-0.5"
                    onClick={() => setUploadImage(null)}
                >
                    <RotateCcw className="h-3 w-3" />
                    Change
                </button>
            </div>

            {/* Target size selector */}
            <div className="mb-4">
                <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground/70 mb-1.5">Target Size</p>
                <Select onValueChange={onTargetImageChange} value={targetImage?.name ?? ''}>
                    <SelectTrigger className="w-full h-9 text-xs">
                        <SelectValue placeholder="Select target size" />
                    </SelectTrigger>
                    <SelectContent>
                        {imageConfigArr.map(({ name, width, height, unit }) => {
                            const wMm =
                                unit === 'cm'
                                    ? Math.round(width * 10)
                                    : unit === 'inch'
                                      ? Math.round(width * 25.4)
                                      : width;
                            const hMm =
                                unit === 'cm'
                                    ? Math.round(height * 10)
                                    : unit === 'inch'
                                      ? Math.round(height * 25.4)
                                      : height;
                            return (
                                <SelectItem key={name} value={name} className="text-xs flex justify-between">
                                    <span>{name}</span>
                                    <span className="ml-3 text-muted-foreground/60 tabular-nums">
                                        {wMm}×{hMm}mm
                                    </span>
                                </SelectItem>
                            );
                        })}
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
                                    onClick={() => setCustomUnit(u)}
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
                                onChange={e => setCustomW(e.target.value)}
                            />
                            <span className="text-muted-foreground/50 text-xs">×</span>
                            <Input
                                type="number"
                                placeholder="H"
                                value={customH}
                                min={1}
                                className="h-8 text-xs w-20"
                                onChange={e => setCustomH(e.target.value)}
                            />
                            <span className="text-[10px] text-muted-foreground/50">{customUnit}</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Crop area */}
            <div className="relative flex-1 min-h-[260px] sm:min-h-[300px] bg-muted/40 overflow-hidden border border-border/40">
                <Cropper
                    image={uploadImage as string}
                    crop={crop}
                    onCropChange={point => setLocalCrop(point)}
                    zoom={zoom}
                    aspect={cropRatio}
                    minZoom={ZOOM_MIN}
                    maxZoom={ZOOM_MAX}
                    onZoomChange={z => setZoom(z)}
                    onCropComplete={onCropComplete}
                />
            </div>

            {/* Zoom slider */}
            <div className="mt-3.5">
                <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground/70 mb-2">
                    Zoom &nbsp;
                    <span className="text-foreground/50">{zoom.toFixed(2)}×</span>
                </p>
                <div className="flex items-center gap-3">
                    <ZoomOut className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
                    <Slider
                        min={ZOOM_MIN}
                        max={ZOOM_MAX}
                        step={0.05}
                        value={[zoom]}
                        onValueChange={value => setZoom(value[0])}
                        className="flex-1"
                    />
                    <ZoomIn className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
                </div>
            </div>

            {/* Footer action */}
            <div className="mt-4 pt-4 border-t border-border/40">
                <Button
                    variant="outline"
                    size="sm"
                    className="text-xs tracking-[0.1em] uppercase"
                    onClick={() => {
                        if (croppedImageRaw.current) {
                            downloadImage(croppedImageRaw.current, `${targetImage?.name}_crop_preview.jpg`);
                        }
                    }}
                >
                    <Download className="mr-2 h-3.5 w-3.5" />
                    Preview Cropped
                </Button>
            </div>
        </StyledPaper>
    );
};

export default Crop;
