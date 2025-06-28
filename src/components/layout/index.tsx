import { Container, Box, useTheme } from '@mui/material';
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
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 4px)' }, height: '85vh' }}>
                            {leftComp}
                        </Box>
                        <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 4px)' }, height: '85vh' }}>
                            {rightComp}
                        </Box>
                    </Box>
                    <Footer></Footer>
                </Container>
            </div>
        </>
    );
};

export default Layout;
