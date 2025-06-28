import Brightness4 from '@mui/icons-material/Brightness4';
import Brightness7 from '@mui/icons-material/Brightness7';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useStore } from '../../stores/store';

export default function TopBar() {
    const { theme, setTheme } = useStore();
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton size="large" edge="start" color="inherit" sx={{ mr: 2 }}>
                        <ContentCutIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        SNAPFIT
                    </Typography>
                    <IconButton
                        sx={{ ml: 1 }}
                        onClick={() => {
                            const nextKey = theme === 'dark' ? 'light' : 'dark';
                            setTheme(nextKey);
                        }}
                        color="inherit"
                    >
                        {theme === 'dark' ? <Brightness7 /> : <Brightness4 />}
                    </IconButton>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
