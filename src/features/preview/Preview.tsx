import { Grid, Typography } from '@mui/material';
import React from 'react';
import StyledPaper from '../../components/StyledPaper';

const Preview = () => {
    return (
        <StyledPaper>
            <Grid container spacing={2} alignItems="center" justifyContent="center">
                <Grid item>
                    <Typography variant="h4">Print Preview</Typography>
                </Grid>
                <Grid item margin={'20px 5px 0'}>
                    <Typography variant="body1">
                        To preview the printed image on actual photo paper, kindly upload a photo from the left panel.
                    </Typography>
                </Grid>
            </Grid>
        </StyledPaper>
    );
};

export default Preview;
