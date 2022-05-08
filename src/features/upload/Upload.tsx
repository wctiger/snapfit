import { Paper, Typography } from '@mui/material';
import { ChangeEvent } from 'react';
import { useSetRecoilState } from 'recoil';
import { uploadImageStore } from '../../stores';

const Upload = () => {
    const setUploadImage = useSetRecoilState(uploadImageStore);
    const onFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        console.log('🚀 ~ file: Upload.tsx ~ line 16 ~ onFileChange ~ e', e);
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            let imageDataUrl = await readFile(file);
            setUploadImage(imageDataUrl);
        }
    };
    return (
        <Paper style={{ height: '100%' }}>
            <Typography variant="h3">{`${1}: Upload a photo`}</Typography>
            <input type="file" accept="image/*" onChange={onFileChange} />
        </Paper>
    );
};

export default Upload;

function readFile(file: Blob) {
    return new Promise(resolve => {
        const reader = new FileReader();
        reader.addEventListener('load', () => resolve(reader.result), false);
        reader.readAsDataURL(file);
    });
}
