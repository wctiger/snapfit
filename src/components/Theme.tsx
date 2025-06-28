import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import { FC, ReactNode } from 'react';
import { useStore } from '../stores/store';

const Theme: FC<{ children: ReactNode }> = props => {
    // TODO: listen to system theme change
    const themeKey = useStore(state => state.theme);
    const getTheme = (mode: 'light' | 'dark' = 'light') => {
        return createTheme({
            palette: {
                mode,
            },
        });
    };

    return <ThemeProvider theme={getTheme(themeKey)}>{props.children}</ThemeProvider>;
};

export default Theme;
