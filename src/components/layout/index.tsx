import { Container, Box } from '@mui/material';
import { FC, ReactNode } from 'react';

interface ILayoutProps {
    leftComp: ReactNode;
    rightComp: ReactNode;
}

const Layout: FC<ILayoutProps> = ({ leftComp, rightComp }) => {
    return (
        <Container maxWidth="lg" sx={{ my: 3 }}>
            <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', justifyContent: 'center' }}>
                <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)' }, minHeight: '80vh' }}>
                    {leftComp}
                </Box>
                <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)' }, minHeight: '80vh' }}>
                    {rightComp}
                </Box>
            </Box>
        </Container>
    );
};

export default Layout;
