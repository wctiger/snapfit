import styled from '@emotion/styled';
import DownloadIcon from '@mui/icons-material/Download';
import { Button, MenuItem, Paper, Select, SelectChangeEvent, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import photoPaperConfigArr from '../../config/photo-paper-config.json';
import { photoPaperStore, uploadImageStore } from '../../stores';
import useImageCollate from './hooks/useImageCollate';

const Collate = () => {
    const uploadImage = useRecoilValue(uploadImageStore);
    const [photoPaper, setPhotoPaper] = useRecoilState(photoPaperStore);
    const { photoPreview, downloadPrint } = useImageCollate();

    useEffect(() => {
        //@ts-ignore
        setPhotoPaper(photoPaperConfigArr[0]);
    }, []);

    const onPhotoPaperChange = ({ target: { value } }: SelectChangeEvent) => {
        //@ts-ignore
        const selectedConfig: IImageConfig = photoPaperConfigArr.find(config => config.name === value);
        if (selectedConfig) {
            setPhotoPaper(selectedConfig);
        }
    };

    return (
        //@ts-ignore
        <StyledPaper>
            <Typography variant="h3">Image Preview</Typography>

            {uploadImage && (
                <>
                    <Select value={photoPaper?.name ?? ''} onChange={onPhotoPaperChange}>
                        {photoPaperConfigArr.map(({ name, unit }) => (
                            <MenuItem key={name} value={name}>{`${name} ${unit}`}</MenuItem>
                        ))}
                    </Select>
                    <CollateContainer>
                        <img
                            style={{ maxWidth: '100%', maxHeight: '100%' }}
                            src={photoPreview}
                            alt="image cut preview"
                        ></img>
                    </CollateContainer>
                    <Button
                        startIcon={<DownloadIcon />}
                        onClick={() => {
                            downloadPrint();
                        }}
                    >
                        Download
                    </Button>
                </>
            )}
        </StyledPaper>
    );
};

export default Collate;

const StyledPaper = styled(Paper)`
    height: 100%;
    display: flex;
    flex-direction: column;
`;

const CollateContainer = styled.div`
    flex: 1;
    text-align: center;
`;
