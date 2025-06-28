import ContentFactory from './components/ContentFactory';
import Theme from './components/Theme';
import { Box } from '@mui/material';
import TopBar from './components/layout/TopBar';
import Footer from './components/layout/Footer';

function App() {
    return (
        <Theme>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100vh',
                }}
            >
                <TopBar />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <ContentFactory />
                </Box>
                <Footer />
            </Box>
        </Theme>
    );
}

export default App;
