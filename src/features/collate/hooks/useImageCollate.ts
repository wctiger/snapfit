import { useEffect, useState } from 'react';
import { useStore } from '../../../stores/store';
import { downloadImage } from '../../../utils';
import { generateCollate, getCroppedImg } from '../../../core/imageHelpers';

export default function useImageCollate() {
    const { uploadImage, crop, targetImage, photoPaper } = useStore();

    const [imageCollate, setImageCollate] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (uploadImage && crop && targetImage && photoPaper) {
            setLoading(true);
            getCroppedImg(uploadImage as string, crop).then(({ croppedImage }) => {
                if (croppedImage) {
                    const collate = generateCollate(croppedImage, targetImage, photoPaper);
                    setImageCollate(collate);
                    setLoading(false);
                }
            });
        }
    }, [uploadImage, crop, targetImage, photoPaper]);

    const downloadPrint = () => {
        if (!imageCollate) {
            console.warn('no image is available');
        }
        const outputFile = `${targetImage?.name}_${photoPaper?.name}.jpg`;
        downloadImage(imageCollate, outputFile);
    };

    return {
        loading,
        photoPreview: imageCollate,
        downloadPrint,
    };
}
