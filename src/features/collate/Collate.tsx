import styled from '@emotion/styled';
import { Paper, Typography } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { cropStore, uploadImageStore } from '../../stores';

const Collate = () => {
    const uploadImage = useRecoilValue(uploadImageStore);
    const cropArea = useRecoilValue(cropStore);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    
    useEffect(() => {
        const ctx = canvasRef.current?.getContext('2d');
        if (uploadImage && cropArea && canvasRef.current) {
            const image = new Image();
            image.onload = () => {
                console.log(cropArea);
                const ratio = image.height / image.width;
                const croppedImageWidth = image.width * cropArea.width / 100;
                const cropppedImageHeight = image.height * cropArea.height / 100;

                const canvasWidth = 200;
                const canvasHeight = canvasWidth * ratio;

                ctx?.drawImage(image, cropArea.x, cropArea.y, croppedImageWidth, cropppedImageHeight, 0, 0, canvasWidth, canvasHeight);
                ctx?.drawImage(image, cropArea.x, cropArea.y, croppedImageWidth, cropppedImageHeight, 200, 0, canvasWidth, canvasHeight);
                ctx?.drawImage(image, cropArea.x, cropArea.y, croppedImageWidth, cropppedImageHeight, 0, canvasHeight, canvasWidth, canvasHeight);
                ctx?.drawImage(image, cropArea.x, cropArea.y, croppedImageWidth, cropppedImageHeight, 200, canvasHeight, canvasWidth, canvasHeight);
                // ctx?.drawImage(image, 0, 0, image.width, image.height, 0, 0, 100, 75)
            };
            image.src = uploadImage as string;
        }
    }, [uploadImage, cropArea]);

    return (
        //@ts-ignore
        <StyledPaper>
            <Typography variant="h3">Image Preview</Typography>
            {uploadImage && (
                <CollateContainer>
                    <canvas ref={canvasRef} width={450} height={330}></canvas>
                </CollateContainer>
            )}
        </StyledPaper>
    );
};

export default Collate;

const StyledPaper = styled(Paper)`
    height: 100%;
    display: flex;
    flex-direction: column;
`;

const CollateContainer = styled.div`
    flex: 1;
`;
