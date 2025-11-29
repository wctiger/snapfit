import { Download, RotateCcw } from 'lucide-react';
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
            <h5 className="text-2xl font-semibold mb-4">Crop Image</h5>
            <div className="flex justify-between mb-6">
                <Button
                    variant="outline"
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
                <Button
                    variant="outline"
                    onClick={() => {
                        setUploadImage(null);
                    }}
                >
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Pick another photo
                </Button>
            </div>
            <div className="mb-4">
                {customSizing ? (
                    <div></div>
                ) : (
                    <Select
                        onValueChange={onTargetImageChange}
                        value={targetImage?.name ?? ''}
                    >
                        <SelectTrigger className="w-full">
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
            <div className="relative flex-1 min-h-[300px] bg-muted rounded-md overflow-hidden">
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
            <div className="mt-4 px-2">
                <Slider
                    min={ZOOM_MIN}
                    max={ZOOM_MAX}
                    step={0.05}
                    value={[zoom]}
                    onValueChange={(value) => {
                        setZoom(value[0]);
                    }}
                />
            </div>
        </StyledPaper>
    );
};

export default Crop;