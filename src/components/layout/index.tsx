import { Container, Grid } from '@mui/material';
import { FC, ReactNode } from 'react';
import Footer from './Footer';
import TopBar from './TopBar';

interface ILayoutProps {
    leftComp: ReactNode;
    rightComp: ReactNode;
}

const Layout: FC<ILayoutProps> = ({ leftComp, rightComp }) => {
    return (
        <>
            <TopBar />
            <Container maxWidth="lg">
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={6} style={{ height: '80vh' }}>
                        {leftComp}
                    </Grid>
                    <Grid item xs={12} sm={6} style={{ height: '80vh' }}>
                        {rightComp}
                    </Grid>
                </Grid>
                <Footer></Footer>
            </Container>
        </>
    );
};

export default Layout;
