import styled from '@emotion/styled';
import { Button, Paper } from '@mui/material';
import { useCallback, useState } from 'react';
import Cropper, { Area } from 'react-easy-crop';
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import { cropStore, uploadImageStore } from '../../stores';

const Crop = () => {
    const [uploadImage, setUploadImage] = useRecoilState(uploadImageStore);
    const setCrop = useSetRecoilState(cropStore);
    const [crop, setLocalCrop] = useState({ x: 0, y: 0 });

    const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
        console.log(croppedArea, croppedAreaPixels);
        setCrop(croppedArea);
    }, []);
    return (
        <StyledPaper>
            <Button
                onClick={() => {
                    setUploadImage(null);
                }}
            >
                Reset Image
            </Button>
            <CropperContainer>
                <Cropper
                    image={uploadImage as string}
                    crop={crop}
                    onCropChange={point => {
                        setLocalCrop(point);
                    }}
                    onCropComplete={onCropComplete}
                />
            </CropperContainer>
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
