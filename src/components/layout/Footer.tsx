import GitHubIcon from '@mui/icons-material/GitHub';
import { Box, Divider, Link, Typography } from '@mui/material';

const Footer = () => {
    return (
        <Box component="footer" sx={{ mt: 'auto', py: 3, px: 2, bgcolor: 'background.paper' }}>
            <Divider sx={{ mt: '10px' }} />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    textAlign: 'center',
                    fontSize: '0.9rem',
                    mt: 2,
                }}
            >
                <Typography variant="body2" color="text.secondary">
                    Inspired by [
                    <Link href="http://www.sandcomp.com/blog/sandphoto/" target="_blank" color="inherit">
                        sandphoto
                    </Link>
                    ]
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: { xs: 1, sm: 0 } }}>
                    <Typography variant="body2" color="text.secondary">
                        Copyright &copy;&nbsp;
                        <Link href="https://github.com/wctiger" target="_blank" color="inherit">
                            wctiger
                        </Link>
                    </Typography>
                    <Link href="https://github.com/wctiger" target="_blank" color="inherit" sx={{ ml: 0.5 }}>
                        <GitHubIcon fontSize="inherit" />
                    </Link>
                </Box>
            </Box>
        </Box>
    );
};

export default Footer;
