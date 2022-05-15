import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { cropStore, photoPaperStore, targetImageStore, uploadImageStore } from '../../../stores';
import { downloadImage } from '../../../utils';
import { generateCollate, getCroppedImg } from './imageHelpers';

export default function useImageCollate() {
    const uploadImage = useRecoilValue(uploadImageStore);
    const cropArea = useRecoilValue(cropStore);
    const targetImageConfig = useRecoilValue(targetImageStore);
    const photoPaperConfig = useRecoilValue(photoPaperStore);

    const [imageCollate, setImageCollate] = useState('');

    useEffect(() => {
        if (uploadImage && cropArea && targetImageConfig && photoPaperConfig) {
            getCroppedImg(uploadImage as string, cropArea).then(croppedImage => {
                if (croppedImage) {
                    const collate = generateCollate(croppedImage, targetImageConfig, photoPaperConfig);
                    setImageCollate(collate);
                }
            });
        }
    }, [uploadImage, cropArea, targetImageConfig, photoPaperConfig]);

    const downloadPrint = () => {
        if (!imageCollate) {
            console.warn('no image is available');
        }
        downloadImage(imageCollate, 'download.jpg');
    };

    return {
        photoPreview: imageCollate,
        downloadPrint,
    };
}
