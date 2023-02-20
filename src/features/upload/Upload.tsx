import { Camera, CameraAlt } from '@mui/icons-material';
import { Button, Grid, Paper, Typography } from '@mui/material';
import { ChangeEvent } from 'react';
import { useSetRecoilState } from 'recoil';
import StyledPaper from '../../components/StyledPaper';
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
        <StyledPaper>
            <Typography variant="h4">{`Upload a photo`}</Typography>
            <div style={{ height: 30 }} />
            <Grid container spacing={2} alignItems="center" justifyContent="center">
                <Grid item alignItems="center">
                    <input style={{ display: 'none' }} id="file-upload" type="file" onChange={onFileChange} />
                    <label htmlFor="file-upload">
                        <Button variant="contained" color="primary" component="span" endIcon={<CameraAlt />}>
                            Select File
                        </Button>
                    </label>
                </Grid>
            </Grid>
        </StyledPaper>
    );
};

export default Upload;

// create a file upload component using Mui and React
