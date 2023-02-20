import { Paper, Typography } from '@mui/material';
import { ChangeEvent } from 'react';
import { useSetRecoilState } from 'recoil';
import { uploadImageStore } from '../../stores';
import { readFile } from '../../utils';

const Upload = () => {
    const setUploadImage = useSetRecoilState(uploadImageStore);
    const onFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        // TODO: verify file type
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            let imageDataUrl = (await readFile(file)) + '';
            setUploadImage(imageDataUrl);
        }
    };
    return (
        <Paper style={{ height: '100%' }}>
            <Typography variant="h4">{`Upload a photo`}</Typography>
            <input type="file" accept="image/*" onChange={onFileChange} />
        </Paper>
    );
};

export default Upload;
