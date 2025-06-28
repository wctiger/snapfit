import { CameraAlt } from '@mui/icons-material';
import { Button, Box, Typography } from '@mui/material';
import { ChangeEvent } from 'react';
import { useStore } from '../../stores/store';
import StyledPaper from '../../components/StyledPaper';
import { readFile } from '../../utils';

const Upload = () => {
    const setUploadImage = useStore(state => state.setUploadImage);
    const onFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        // TODO: verify file type
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            let imageDataUrl = (await readFile(file)) + '';
            setUploadImage(imageDataUrl);
        }
    };
    return (
        <StyledPaper sx={{ justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant="h5" gutterBottom>{`Upload a photo`}</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mt: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <input style={{ display: 'none' }} id="file-upload" type="file" onChange={onFileChange} />
                    <label htmlFor="file-upload">
                        <Button variant="contained" color="primary" component="span" endIcon={<CameraAlt />}>
                            Select File
                        </Button>
                    </label>
                </Box>
            </Box>
        </StyledPaper>
    );
};

export default Upload;
