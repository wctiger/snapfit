import { Box, Typography } from '@mui/material';
import StyledPaper from '../../components/StyledPaper';

const Preview = () => {
    return (
        <StyledPaper sx={{ justifyContent: 'center', alignItems: 'center' }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 2,
                    textAlign: 'center',
                }}
            >
                <Typography variant="h4">Print Preview</Typography>
                <Typography variant="body1">
                    To preview the printed image on actual photo paper, kindly upload a photo from the left panel.
                </Typography>
            </Box>
        </StyledPaper>
    );
};

export default Preview;
