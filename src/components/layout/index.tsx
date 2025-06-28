import { Container, Grid, useTheme } from '@mui/material';
import { FC, ReactNode } from 'react';
import { useStore } from '../../stores/store';
import Footer from './Footer';
import TopBar from './TopBar';

interface ILayoutProps {
    leftComp: ReactNode;
    rightComp: ReactNode;
}

const Layout: FC<ILayoutProps> = ({ leftComp, rightComp }) => {
    const themeKey = useStore(state => state.theme);
    const isDarkMode = themeKey === 'dark';

    return (
        <>
            <TopBar />
            <div style={{ backgroundColor: isDarkMode ? '#212121' : '#f5f5f5' }}>
                <Container maxWidth="lg">
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={6} style={{ height: '85vh' }}>
                            {leftComp}
                        </Grid>
                        <Grid item xs={12} sm={6} style={{ height: '85vh' }}>
                            {rightComp}
                        </Grid>
                    </Grid>
                    <Footer></Footer>
                </Container>
            </div>
        </>
    );
};

export default Layout;
