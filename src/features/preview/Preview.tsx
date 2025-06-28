import { Box, Typography } from '@mui/material';
import React from 'react';
import StyledPaper from '../../components/StyledPaper';

const Preview = () => {
    return (
        <StyledPaper>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 2,
                }}
            >
                <Box>
                    <Typography variant="h4">Print Preview</Typography>
                </Box>
                <Box sx={{ margin: '20px 5px 0' }}>
                    <Typography variant="body1">
                        To preview the printed image on actual photo paper, kindly upload a photo from the left panel.
                    </Typography>
                </Box>
            </Box>
        </StyledPaper>
    );
};

export default Preview;
