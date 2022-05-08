import styled from '@emotion/styled';
import { Box, Button, FormControlLabel, MenuItem, Paper, Select, Slider, Switch } from '@mui/material';
import { useCallback, useState } from 'react';
import Cropper, { Area } from 'react-easy-crop';
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import { cropStore, uploadImageStore } from '../../stores';
import { sizeConfig } from './sizeConfig';

const ZOOM_MIN = 1;
const ZOOM_MAX = 3;

const Crop = () => {
    const [uploadImage, setUploadImage] = useRecoilState(uploadImageStore);
    const setCrop = useSetRecoilState(cropStore);
    const [crop, setLocalCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(ZOOM_MIN);

    const [customSizing, setCustomSizing] = useState(false);

    const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
        console.log(croppedArea, croppedAreaPixels);
        setCrop(croppedArea);
    }, []);

    const [cropRatio, setCropRatio] = useState(1); // TODO: dynamic

    return (
        <StyledPaper>
            <Button
                onClick={() => {
                    setUploadImage(null);
                }}
            >
                Reset Image
            </Button>
            <Box>
                <FormControlLabel control={<Switch checked={customSizing} onChange={(e, checked) => {
                    setCustomSizing(checked);
                }} />} label="Use Custom Sizing" />
                {
                    customSizing ?
                    <></> : <Select onChange={({target: { value}}) => {
                        setCropRatio(value as number)
                    }}>
                        {Object.keys(sizeConfig).map(key => 
                            <MenuItem value={sizeConfig[key].width / sizeConfig[key].height}>{key}</MenuItem>
                        )}
                    </Select>
                }
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
                        console.log("TCL🚀 ~ file: Crop.tsx ~ line 38 ~ Crop ~ zoom", zoom);
                        setZoom(zoom)
                    }}
                    onCropComplete={onCropComplete}
                />
            </CropperContainer>
            <Slider min={ZOOM_MIN} max={ZOOM_MAX} step={0.05} value={zoom} onChange={(_, value) => { setZoom(+value) }} />
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
