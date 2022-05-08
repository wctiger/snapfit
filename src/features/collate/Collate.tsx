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
        if (uploadImage && cropArea) {
            const image = new Image();
            image.onload = () => {
                console.log(cropArea);
                ctx?.drawImage(image, cropArea.x, cropArea.y, cropArea.width, cropArea.height, 0, 0, 100, 100);
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
                    <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }}></canvas>
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
