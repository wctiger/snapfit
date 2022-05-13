import styled from '@emotion/styled';
import { Paper, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { Area } from 'react-easy-crop';
import { useRecoilValue } from 'recoil';
import { cropStore, uploadImageStore } from '../../stores';
import usePhoto from './hooks/usePhoto';

const Collate = () => {
    const uploadImage = useRecoilValue(uploadImageStore);
    // const cropArea = useRecoilValue(cropStore);

    // const [croppedImage, setCroppedImage] = useState('');

    // useEffect(() => {
    //     if (uploadImage && cropArea) {
    //         getCroppedImg(uploadImage as string, cropArea).then(imageBase64 => {
    //             setCroppedImage(imageBase64!);
    //         });
    //     }
    // }, [uploadImage, cropArea]);
    const photoPreview = usePhoto();

    return (
        //@ts-ignore
        <StyledPaper>
            <Typography variant="h3">Image Preview</Typography>
            {uploadImage && (
                <CollateContainer>
                    {/* <canvas ref={canvasRef} width={450} height={330}></canvas> */}
                    <img
                        style={{ maxWidth: '100%', maxHeight: '100%' }}
                        src={photoPreview}
                        alt="image cut preview"
                    ></img>
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

const createImage = (url: string) =>
    new Promise<HTMLImageElement>((resolve, reject) => {
        const image = new Image();
        image.addEventListener('load', () => resolve(image));
        image.addEventListener('error', error => reject(error));
        image.src = url;
    });

async function getCroppedImg(imageSrc: string, pixelCrop: Area) {
    const image = await createImage(imageSrc);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
        return null;
    }

    // set canvas size to match the bounding box
    canvas.width = image.width;
    canvas.height = image.height;

    // draw rotated image
    ctx.drawImage(image, 0, 0);

    // croppedAreaPixels values are bounding box relative
    // extract the cropped image using these values
    const data = ctx.getImageData(pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height);

    // // set canvas width to final desired crop size - this will clear existing context
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    // // paste generated rotate image at the top left corner
    ctx.putImageData(data, 0, 0);

    // As Base64 string
    return canvas.toDataURL('image/jpeg');
}
