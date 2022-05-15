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
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (uploadImage && cropArea && targetImageConfig && photoPaperConfig) {
            setLoading(true);
            getCroppedImg(uploadImage as string, cropArea).then(croppedImage => {
                if (croppedImage) {
                    const collate = generateCollate(croppedImage, targetImageConfig, photoPaperConfig);
                    setImageCollate(collate);
                    setLoading(false);
                }
            });
        }
    }, [uploadImage, cropArea, targetImageConfig, photoPaperConfig]);

    const downloadPrint = () => {
        if (!imageCollate) {
            console.warn('no image is available');
        }
        const outputFile = `${targetImageConfig?.name}_${photoPaperConfig?.name}.jpg`;
        downloadImage(imageCollate, outputFile);
    };

    return {
        loading,
        photoPreview: imageCollate,
        downloadPrint,
    };
}
