import { useEffect, useState } from 'react';
import { Area } from 'react-easy-crop';
import { useRecoilValue } from 'recoil';
import { uploadImageStore, cropStore } from '../../../stores';
import { inchToPx } from '../../crop/sizeConverter';

export default function usePhoto() {
    const uploadImage = useRecoilValue(uploadImageStore);
    const cropArea = useRecoilValue(cropStore);
    const [photoBase64, setPhotoBase64] = useState('');

    useEffect(() => {
        if (uploadImage && cropArea) {
            getCroppedImg(uploadImage as string, cropArea).then(imageBase64 => {
                setPhotoBase64(imageBase64!);
            });
        }
    }, [uploadImage, cropArea]);

    return photoBase64;
}

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

    calculatePositions(inchToPx(6), inchToPx(4), inchToPx(0.6), inchToPx(1));

    // As Base64 string
    return canvas.toDataURL('image/jpeg');
}

const GAP = 5; // temp, set gap to 5px

function calculatePositions(
    paperWidth: number,
    paperHeight: number,
    singlePhotoWidth: number,
    singlePhotoHeight: number
) {
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

    return posArr;
}
