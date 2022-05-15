import { useEffect, useState } from 'react';
import { Area } from 'react-easy-crop';
import { useRecoilValue } from 'recoil';
import { cropStore, photoPaperStore, targetImageStore, uploadImageStore } from '../../../stores';
import { IImageConfig } from '../../../types';
import { cmToPx, inchToPx } from '../../crop/sizeConverter';

export default function usePhoto() {
    const uploadImage = useRecoilValue(uploadImageStore);
    const cropArea = useRecoilValue(cropStore);
    const targetImageConfig = useRecoilValue(targetImageStore);
    const photoPaperConfig = useRecoilValue(photoPaperStore);

    const [photoBase64, setPhotoBase64] = useState('');

    useEffect(() => {
        if (uploadImage && cropArea && targetImageConfig && photoPaperConfig) {
            getCroppedImg(uploadImage as string, cropArea, targetImageConfig, photoPaperConfig).then(imageBase64 => {
                setPhotoBase64(imageBase64!);
            });
        }
    }, [uploadImage, cropArea, targetImageConfig, photoPaperConfig]);

    return photoBase64;
}

function createImage(url: string) {
    return new Promise<HTMLImageElement>((resolve, reject) => {
        const image = new Image();
        image.addEventListener('load', () => resolve(image));
        image.addEventListener('error', error => reject(error));
        image.src = url;
    });
}

async function getCroppedImg(
    imageSrc: string,
    pixelCrop: Area,
    targetImageConfig: IImageConfig,
    photoPaperConfig: IImageConfig
) {
    const image = await createImage(imageSrc);
    const canvasPrimary = document.createElement('canvas');
    const ctx = canvasPrimary.getContext('2d');

    if (!ctx) {
        return null;
    }

    // First: draw the cropped image in the original size

    // set canvas size to match the bounding box
    canvasPrimary.width = image.width;
    canvasPrimary.height = image.height;

    ctx.drawImage(image, 0, 0);

    // croppedAreaPixels values are bounding box relative
    // extract the cropped image using these values
    const data = ctx.getImageData(pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height);

    // set canvas width to final desired crop size - this will clear existing context
    canvasPrimary.width = pixelCrop.width;
    canvasPrimary.height = pixelCrop.height;

    // paste generated rotate image at the top left corner
    ctx.putImageData(data, 0, 0);

    const croppedImage = await createImage(canvasPrimary.toDataURL('image/jpeg'));

    // Second: Take the cropped image and resize it.
    const canvasScaled = document.createElement('canvas');
    const ctxScaled = canvasScaled.getContext('2d');
    if (!ctxScaled) return null;

    const [targetWidth, targetHeight] = getImageInPx(targetImageConfig);
    const [photoPaperWidth, photoPaperHeight] = getImageInPx(photoPaperConfig);

    ctxScaled.drawImage(croppedImage, 0, 0, targetWidth, targetHeight);
    const scaledData = ctxScaled.getImageData(0, 0, targetWidth, targetHeight);

    const { imagePositions, rotatePaper } = calculatePositions(
        photoPaperWidth,
        photoPaperHeight,
        targetWidth,
        targetHeight
    );

    if (rotatePaper) {
        // testing. Remember this is screen DPI - need to change to use print DPI.
        canvasPrimary.width = photoPaperHeight;
        canvasPrimary.height = photoPaperWidth;
    } else {
        // testing. Remember this is screen DPI - need to change to use print DPI.
        canvasPrimary.width = photoPaperWidth;
        canvasPrimary.height = photoPaperHeight;
    }

    for (const row of imagePositions) {
        for (const pos of row) {
            const { pos_x, pos_y } = pos;
            ctx.putImageData(scaledData, pos_x, pos_y);
        }
    }

    // As Base64 string
    return canvasPrimary.toDataURL('image/jpeg');
}

function getImageInPx(imageConfig: IImageConfig) {
    switch (imageConfig.unit) {
        case 'cm':
            return [cmToPx(imageConfig.width), cmToPx(imageConfig.height)];
        case 'inch':
            return [inchToPx(imageConfig.width), inchToPx(imageConfig.height)];
        default:
            return [imageConfig.width, imageConfig.height];
    }
}

const GAP = 5; // temp, set gap to 5px

function calculatePositions(
    paperWidth: number,
    paperHeight: number,
    singlePhotoWidth: number,
    singlePhotoHeight: number
) {
    let rotatePaper = false;
    const columnCount = Math.floor(paperWidth / (singlePhotoWidth + GAP));
    const rowCount = Math.floor(paperHeight / (singlePhotoHeight + GAP));
    const rotateColumnCount = Math.floor(paperHeight / (singlePhotoWidth + GAP));
    const rotateRowCount = Math.floor(paperWidth / (singlePhotoHeight + GAP));

    let bestColumnCount = columnCount;
    let bestRowCount = rowCount;
    let horizontalStartPoint = (paperWidth - bestColumnCount * (singlePhotoWidth + GAP) + GAP) / 2;
    let verticalStartPoint = (paperHeight - bestRowCount * (singlePhotoHeight + GAP) + GAP) / 2;

    // Rotate to get better print efficiency
    if (rotateColumnCount * rotateRowCount > columnCount * rowCount) {
        rotatePaper = true;
        bestColumnCount = rotateColumnCount;
        bestRowCount = rotateRowCount;
        horizontalStartPoint = (paperHeight - bestColumnCount * (singlePhotoWidth + GAP) + GAP) / 2;
        verticalStartPoint = (paperWidth - bestRowCount * (singlePhotoHeight + GAP) + GAP) / 2;
    }

    if (horizontalStartPoint < 0 || verticalStartPoint < 0) {
        console.warn('dimension calculation is wrong', { horizontalStartPoint, verticalStartPoint });
    }

    const posArr = Array.from(Array(bestRowCount), () => Array(bestColumnCount));
    for (let i = 0; i < bestColumnCount; i++) {
        let pos_x = horizontalStartPoint + (singlePhotoWidth + GAP) * i;
        for (let j = 0; j < bestRowCount; j++) {
            let pos_y = verticalStartPoint + (singlePhotoHeight + GAP) * j;
            posArr[j][i] = { pos_x, pos_y };
        }
    }

    return {
        imagePositions: posArr,
        rotatePaper,
    };
}
