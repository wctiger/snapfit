import styled from '@emotion/styled';
import DownloadIcon from '@mui/icons-material/Download';
import {
    Button,
    MenuItem,
    Paper,
    Select,
    SelectChangeEvent,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import photoPaperConfigArr from '../../config/photo-paper-config.json';
import { photoPaperStore, uploadImageStore } from '../../stores';
import useImageCollate from './hooks/useImageCollate';

const Collate = () => {
    const uploadImage = useRecoilValue(uploadImageStore);
    const [photoPaper, setPhotoPaper] = useRecoilState(photoPaperStore);
    const { loading, photoPreview, downloadPrint } = useImageCollate();

    const [backgroundColor, setBackgroundColor] = useState('#fff');

    useEffect(() => {
        //@ts-ignore
        setPhotoPaper({ ...photoPaperConfigArr[0], backgroundColor });
    }, []);

    const onPhotoPaperChange = ({ target: { value } }: SelectChangeEvent) => {
        //@ts-ignore
        const selectedConfig: IImageConfig = photoPaperConfigArr.find(config => config.name === value);
        if (selectedConfig) {
            setPhotoPaper({ ...selectedConfig, backgroundColor });
        }
    };

    return (
        //@ts-ignore
        <StyledPaper>
            <Typography variant="h4">Image Preview</Typography>

            {uploadImage &&
                (!loading ? (
                    <>
                        <ControlBar>
                            <Select
                                size="small"
                                style={{ width: '45%' }}
                                value={photoPaper?.name ?? ''}
                                onChange={onPhotoPaperChange}
                            >
                                {photoPaperConfigArr.map(({ name, unit }) => (
                                    <MenuItem key={name} value={name}>{`${name} ${unit}`}</MenuItem>
                                ))}
                            </Select>

                            <ToggleButtonGroup
                                size="small"
                                exclusive
                                value={backgroundColor}
                                onChange={(_, value) => {
                                    setBackgroundColor(value);
                                    setPhotoPaper({ ...photoPaper!, backgroundColor: value });
                                }}
                            >
                                <ToggleButton style={{ color: '#fff' }} value={'#fff'}>
                                    White
                                </ToggleButton>
                                <ToggleButton style={{ color: 'blue' }} value={'blue'}>
                                    Blue
                                </ToggleButton>
                                <ToggleButton style={{ color: '#333' }} value={'#333'}>
                                    Gray
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </ControlBar>
                        <CollateContainer>
                            <img
                                style={{ maxWidth: '100%', maxHeight: '70vh' }}
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
                ) : (
                    <Paper>Loading...</Paper>
                ))}
        </StyledPaper>
    );
};

export default Collate;

const StyledPaper = styled(Paper)`
    height: 100%;
    display: flex;
    flex-direction: column;
`;

const ControlBar = styled.div`
    display: flex;
    justify-content: space-between;
`;

const CollateContainer = styled.div`
    flex: 1;
    text-align: center;
`;
