import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { FC, ReactNode } from 'react';
import { useStore } from '../stores/store';

const Theme: FC<{ children: ReactNode }> = props => {
    const { theme } = useStore();

    const getTheme = (mode: 'light' | 'dark') =>
        createTheme({
            palette: {
                mode,
                ...(mode === 'light'
                    ? {
                          // Light theme palette
                          primary: {
                              main: '#1976d2',
                          },
                          secondary: {
                              main: '#dc004e',
                          },
                          background: {
                              default: '#f4f6f8',
                              paper: '#ffffff',
                          },
                      }
                    : {
                          // Dark theme palette
                          primary: {
                              main: '#90caf9',
                          },
                          secondary: {
                              main: '#f48fb1',
                          },
                          background: {
                              default: '#121212',
                              paper: '#1e1e1e',
                          },
                      }),
            },
            typography: {
                fontFamily: 'Roboto, sans-serif',
                h4: {
                    fontWeight: 600,
                },
            },
            components: {
                MuiPaper: {
                    styleOverrides: {
                        root: {
                            backgroundImage: 'unset', // Remove default background image for Paper
                        },
                    },
                },
            },
        });

    return (
        <ThemeProvider theme={getTheme(theme)}>
            <CssBaseline />
            {props.children}
        </ThemeProvider>
    );
};

export default Theme;
