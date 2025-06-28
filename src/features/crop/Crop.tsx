import { Box, Button, MenuItem, Select, SelectChangeEvent, Slider } from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';
import { useEffect, useRef, useState } from 'react';
import Cropper, { Area } from 'react-easy-crop';
import { useStore } from '../../stores/store';
import imageConfigArr from '../../config/target-image-config.json';
import { IImageConfig } from '../../types';
import DownloadIcon from '@mui/icons-material/Download';
import { getCroppedImg } from '../../core/imageHelpers';
import { downloadImage } from '../../utils';
import StyledPaper from '../../components/StyledPaper';

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

    const onTargetImageChange = ({ target: { value } }: SelectChangeEvent) => {
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
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Button
                    startIcon={<DownloadIcon />}
                    onClick={() => {
                        if (croppedImageRaw.current) {
                            const outputFile = `${targetImage?.name}_crop_preview.jpg`;
                            downloadImage(croppedImageRaw.current, outputFile);
                        }
                    }}
                >
                    Preview Cropped Image
                </Button>
                <Button
                    startIcon={<ReplayIcon />}
                    onClick={() => {
                        setUploadImage(null);
                    }}
                >
                    Pick another photo
                </Button>
            </Box>
            <Box sx={{ mb: 2 }}>
                {customSizing ? (
                    <Box></Box>
                ) : (
                    <Select
                        fullWidth
                        size="small"
                        onChange={onTargetImageChange}
                        value={targetImage?.name ?? ''}
                    >
                        {imageConfigArr.map(({ name, descripton }) => (
                            <MenuItem key={name} value={name}>
                                {`${name} ${descripton ? '(' + descripton + ')' : ''}`}
                            </MenuItem>
                        ))}
                    </Select>
                )}
            </Box>
            <Box sx={{ position: 'relative', flex: 1 }}>
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
            </Box>
            <Slider
                min={ZOOM_MIN}
                max={ZOOM_MAX}
                step={0.05}
                valueLabelDisplay="auto"
                valueLabelFormat={value => `${value}x`}
                value={zoom}
                onChange={(_, value) => {
                    setZoom(+value);
                }}
                sx={{ mt: 2 }}
            />
        </StyledPaper>
    );
};

export default Crop;