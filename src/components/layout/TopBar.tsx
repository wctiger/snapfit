import Brightness4 from '@mui/icons-material/Brightness4';
import Brightness7 from '@mui/icons-material/Brightness7';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useRecoilState } from 'recoil';
import { themeStore } from '../../stores';

export default function TopBar() {
    const [themeKey, setThemeKey] = useRecoilState(themeStore);
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        CUT!
                    </Typography>
                    <IconButton
                        sx={{ ml: 1 }}
                        onClick={() => {
                            const nextKey = themeKey === 'dark' ? 'light' : 'dark';
                            setThemeKey(nextKey);
                        }}
                        color="inherit"
                    >
                        {themeKey === 'dark' ? <Brightness7 /> : <Brightness4 />}
                    </IconButton>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
