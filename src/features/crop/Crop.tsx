import { Download, RotateCcw, ZoomIn, ZoomOut } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import Cropper, { Area } from 'react-easy-crop';
import { useStore } from '../../stores/store';
import imageConfigArr from '../../config/target-image-config.json';
import { IImageConfig } from '../../types';
import { getCroppedImg } from '../../core/imageHelpers';
import { downloadImage } from '../../utils';
import StyledPaper from '../../components/StyledPaper';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';

const ZOOM_MIN = 1;
const ZOOM_MAX = 3;

const Crop = () => {
    const croppedImageRaw = useRef<string>('');
    const { uploadImage, setUploadImage, targetImage, setTargetImage, setCrop } = useStore();

    const [crop, setLocalCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(ZOOM_MIN);
    const [customSizing, setCustomSizing] = useState(false);
    const [cropRatio, setCropRatio] = useState(0);

    useEffect(() => {
        //@ts-ignore
        const selectedConfig: IImageConfig = imageConfigArr[0];
        const cropRatio = selectedConfig.width / selectedConfig.height;
        setCropRatio(cropRatio);
        setTargetImage(selectedConfig);
    }, [imageConfigArr]);

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
        //@ts-ignore
        const selectedConfig: IImageConfig = imageConfigArr.find(config => config.name === value);
        if (selectedConfig) {
            const cropRatio = selectedConfig.width / selectedConfig.height;
            setCropRatio(cropRatio);
            setTargetImage(selectedConfig);
        }
    };

    return (
        <StyledPaper>
            <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg sm:text-xl font-semibold tracking-tight">Crop Image</h2>
                <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:text-foreground"
                    onClick={() => setUploadImage(null)}
                >
                    <RotateCcw className="mr-1.5 h-3.5 w-3.5" />
                    Change
                </Button>
            </div>

            <div className="space-y-4 mb-5">
                <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">Target Size</Label>
                    {customSizing ? (
                        <div></div>
                    ) : (
                        <Select onValueChange={onTargetImageChange} value={targetImage?.name ?? ''}>
                            <SelectTrigger className="w-full h-10">
                                <SelectValue placeholder="Select target size" />
                            </SelectTrigger>
                            <SelectContent>
                                {imageConfigArr.map(({ name, descripton }) => (
                                    <SelectItem key={name} value={name}>
                                        {`${name} ${descripton ? '(' + descripton + ')' : ''}`}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}
                </div>
            </div>

            <div className="relative flex-1 min-h-[280px] sm:min-h-[320px] bg-muted/50 rounded-lg overflow-hidden border border-border/50">
                <Cropper
                    image={uploadImage as string}
                    crop={crop}
                    onCropChange={point => {
                        setLocalCrop(point);
                    }}
                    zoom={zoom}
                    aspect={cropRatio}
                    minZoom={ZOOM_MIN}
                    maxZoom={ZOOM_MAX}
                    onZoomChange={zoom => {
                        setZoom(zoom);
                    }}
                    onCropComplete={onCropComplete}
                />
            </div>

            <div className="mt-4 space-y-3">
                <div className="flex items-center gap-3">
                    <ZoomOut className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <Slider
                        min={ZOOM_MIN}
                        max={ZOOM_MAX}
                        step={0.05}
                        value={[zoom]}
                        onValueChange={value => {
                            setZoom(value[0]);
                        }}
                        className="flex-1"
                    />
                    <ZoomIn className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                </div>
            </div>

            <div className="mt-5 pt-4 border-t border-border/50">
                <Button
                    variant="outline"
                    size="sm"
                    className="w-full sm:w-auto"
                    onClick={() => {
                        if (croppedImageRaw.current) {
                            const outputFile = `${targetImage?.name}_crop_preview.jpg`;
                            downloadImage(croppedImageRaw.current, outputFile);
                        }
                    }}
                >
                    <Download className="mr-2 h-4 w-4" />
                    Preview Cropped Image
                </Button>
            </div>
        </StyledPaper>
    );
};

export default Crop;