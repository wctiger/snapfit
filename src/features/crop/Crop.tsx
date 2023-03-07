import styled from '@emotion/styled';
import { Box, Button, debounce, MenuItem, Paper, Select, SelectChangeEvent, Slider, Typography } from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';
import { useCallback, useEffect, useRef, useState } from 'react';
import Cropper, { Area } from 'react-easy-crop';
import { useRecoilState, useSetRecoilState } from 'recoil';
import imageConfigArr from '../../config/target-image-config.json';
import { cropStore, targetImageStore, uploadImageStore } from '../../stores';
import { IImageConfig } from '../../types';
import DownloadIcon from '@mui/icons-material/Download';
import { getCroppedImg } from '../../core/imageHelpers';
import { downloadImage } from '../../utils';

const ZOOM_MIN = 1;
const ZOOM_MAX = 3;

const Crop = () => {
    const croppedImageRaw = useRef<string>('');
    const [uploadImage, setUploadImage] = useRecoilState(uploadImageStore);
    const [targetImage, setTargetImage] = useRecoilState(targetImageStore);
    const setCrop = useSetRecoilState(cropStore);

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
            {/* <Typography variant="h4">Crop</Typography> */}
            <Box display={'flex'} style={{ justifyContent: 'space-between' }}>
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
            <Box>
                {/* <FormControlLabel
                    control={
                        <Switch
                            checked={customSizing}
                            onChange={(e, checked) => {
                                setCustomSizing(checked);
                            }}
                        />
                    }
                    label="Use Custom Sizing"
                /> */}
                {customSizing ? (
                    <Box></Box>
                ) : (
                    <Select
                        style={{ width: '100%' }}
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
            <CropperContainer>
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
            </CropperContainer>
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
            />
        </StyledPaper>
    );
};

export default Crop;

const StyledPaper = styled(Paper)`
    height: 100%;
    display: flex;
    flex-direction: column;
`;

const CropperContainer = styled.div`
    position: relative;
    flex: 1;
`;
