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
        if (uploadImage) {
            const image = new Image();
            image.setAttribute('style', {
                maxHeight: '100%',
                maxWidth: '100%',
            });
            image.onload = () => {
                console.log(cropArea);
                ctx?.drawImage(image, 0, 0);
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
