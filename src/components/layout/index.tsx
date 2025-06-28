import { Container, Box } from '@mui/material';
import { FC, ReactNode } from 'react';

interface ILayoutProps {
    leftComp: ReactNode;
    rightComp: ReactNode;
}

const Layout: FC<ILayoutProps> = ({ leftComp, rightComp }) => {
    return (
        <Container maxWidth="lg" sx={{ my: 2 }}>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 8px)' }, minHeight: '70vh' }}>
                    {leftComp}
                </Box>
                <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 8px)' }, minHeight: '70vh' }}>
                    {rightComp}
                </Box>
            </Box>
        </Container>
    );
};

export default Layout;
