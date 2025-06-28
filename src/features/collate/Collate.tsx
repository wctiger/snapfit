import DownloadIcon from '@mui/icons-material/Download';
import {
    Button,
    MenuItem,
    Select,
    SelectChangeEvent,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
    Box,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useStore } from '../../stores/store';
import photoPaperConfigArr from '../../config/photo-paper-config.json';
import useImageCollate from './hooks/useImageCollate';
import StyledPaper from '../../components/StyledPaper';

const Collate = () => {
    const { uploadImage, photoPaper, setPhotoPaper } = useStore();
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
        <StyledPaper>
            {uploadImage && (
                <>
                    <Typography variant="h5" gutterBottom>Collate Image</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                        <Select
                            fullWidth
                            size="small"
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
                            sx={{ ml: 2 }}
                        >
                            <ToggleButton value={'#fff'}>
                                White
                            </ToggleButton>
                            <ToggleButton value={'blue'}>
                                Blue
                            </ToggleButton>
                            <ToggleButton value={'#333'}>
                                Gray
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Box>
                    <Box sx={{ flexGrow: 1, textAlign: 'center', my: 0.5 }}>
                        <canvas style={{ maxWidth: '100%', maxHeight: '70vh' }} id="collate-canvas"></canvas>
                    </Box>
                    <Button
                        variant="contained"
                        color="success"
                        startIcon={<DownloadIcon />}
                        onClick={() => {
                            downloadPrint();
                        }}
                        sx={{ mt: 2 }}
                    >
                        Download Print
                    </Button>
                </>
            )}
        </StyledPaper>
    );
};

export default Collate;