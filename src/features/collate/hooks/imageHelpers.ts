import { Area } from 'react-easy-crop';
import { IImageConfig } from '../../../types';
import { cmToPx, inchToPx } from '../../../utils';

export async function getCroppedImg(imageSrc: string, pixelCrop: Area) {
    const image = await createImage(imageSrc);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        return null;
    }

    // set canvas size to match the original image
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);

    // croppedAreaPixels values are bounding box relative
    // extract the cropped image using these values
    const data = ctx.getImageData(pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height);

    // set canvas width to final desired crop size - this will clear existing context
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    // paste generated rotate image at the top left corner
    ctx.putImageData(data, 0, 0);

    const croppedImage = await createImage(canvas.toDataURL('image/jpeg'));
    return croppedImage;
}

export function generateCollate(
    patternImage: HTMLImageElement,
    targetImageConfig: IImageConfig,
    photoPaperConfig: IImageConfig
) {
    const canvasOutput = document.createElement('canvas');
    const ctxOutput = canvasOutput.getContext('2d');
    if (!ctxOutput) return '';

    // Take the cropped image and resize it
    const [targetWidth, targetHeight] = getImageInPx(targetImageConfig);
    const [photoPaperWidth, photoPaperHeight] = getImageInPx(photoPaperConfig);

    const canvasScaled = document.createElement('canvas');
    const ctxScaled = canvasScaled.getContext('2d');
    if (!ctxScaled) return '';

    canvasScaled.width = targetWidth;
    canvasScaled.height = targetHeight;
    ctxScaled.drawImage(patternImage, 0, 0, targetWidth, targetHeight);
    const scaledData = ctxScaled.getImageData(0, 0, targetWidth, targetHeight);

    const { imagePositions, rotatePaper } = calculatePositions(
        photoPaperWidth,
        photoPaperHeight,
        targetWidth,
        targetHeight
    );

    if (rotatePaper) {
        canvasOutput.width = photoPaperHeight;
        canvasOutput.height = photoPaperWidth;
    } else {
        canvasOutput.width = photoPaperWidth;
        canvasOutput.height = photoPaperHeight;
    }

    ctxOutput.fillStyle = photoPaperConfig.backgroundColor || 'white';
    ctxOutput.fillRect(0, 0, canvasOutput.width, canvasOutput.height);

    for (const row of imagePositions) {
        for (const pos of row) {
            const { pos_x, pos_y } = pos;
            ctxOutput.putImageData(scaledData, pos_x, pos_y);
        }
    }

    return canvasOutput.toDataURL('image/jpeg');
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

function createImage(url: string) {
    return new Promise<HTMLImageElement>((resolve, reject) => {
        const image = new Image();
        image.addEventListener('load', () => resolve(image));
        image.addEventListener('error', error => reject(error));
        image.src = url;
    });
}

const GUTTER = 5;
function calculatePositions(
    paperWidth: number,
    paperHeight: number,
    singlePhotoWidth: number,
    singlePhotoHeight: number
) {
    let rotatePaper = false;
    const columnCount = Math.floor(paperWidth / (singlePhotoWidth + GUTTER));
    const rowCount = Math.floor(paperHeight / (singlePhotoHeight + GUTTER));
    const rotateColumnCount = Math.floor(paperHeight / (singlePhotoWidth + GUTTER));
    const rotateRowCount = Math.floor(paperWidth / (singlePhotoHeight + GUTTER));

    let bestColumnCount = columnCount;
    let bestRowCount = rowCount;
    let horizontalStartPoint = (paperWidth - bestColumnCount * (singlePhotoWidth + GUTTER) + GUTTER) / 2;
    let verticalStartPoint = (paperHeight - bestRowCount * (singlePhotoHeight + GUTTER) + GUTTER) / 2;

    // Rotate to get better print efficiency
    if (rotateColumnCount * rotateRowCount > columnCount * rowCount) {
        rotatePaper = true;
        bestColumnCount = rotateColumnCount;
        bestRowCount = rotateRowCount;
        horizontalStartPoint = (paperHeight - bestColumnCount * (singlePhotoWidth + GUTTER) + GUTTER) / 2;
        verticalStartPoint = (paperWidth - bestRowCount * (singlePhotoHeight + GUTTER) + GUTTER) / 2;
    }

    if (horizontalStartPoint < 0 || verticalStartPoint < 0) {
        console.warn('dimension calculation is wrong', { horizontalStartPoint, verticalStartPoint });
    }

    const posArr = Array.from(Array(bestRowCount), () => Array(bestColumnCount));
    for (let i = 0; i < bestColumnCount; i++) {
        let pos_x = horizontalStartPoint + (singlePhotoWidth + GUTTER) * i;
        for (let j = 0; j < bestRowCount; j++) {
            let pos_y = verticalStartPoint + (singlePhotoHeight + GUTTER) * j;
            posArr[j][i] = { pos_x, pos_y };
        }
    }

    return {
        imagePositions: posArr,
        rotatePaper,
    };
}

function getWatermark() {}
