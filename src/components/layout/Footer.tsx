import styled from '@emotion/styled';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Divider, Link, Typography } from '@mui/material';

const Footer = () => {
    return (
        <>
            <Divider style={{ marginTop: '10px' }} />
            <Wrapper>
                <Typography variant="body2">
                    Inspired by [
                    <Link href="http://www.sandcomp.com/blog/sandphoto/" target="_blank">
                        sandphoto
                    </Link>
                    ]
                </Typography>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body2">
                        Copyright &copy;&nbsp;
                        <Link href="https://github.com/wctiger" target="_blank">
                            wctiger
                        </Link>
                    </Typography>
                    <Typography variant="body2" style={{ marginLeft: 2 }}>
                        <Link href="https://github.com/wctiger" target="_blank">
                            <GitHubIcon fontSize="inherit" />
                        </Link>
                    </Typography>
                </div>
            </Wrapper>
        </>
    );
};

export default Footer;

const Wrapper = styled.footer`
    /* margin-top: 1rem; */
    /* border-top: 1px solid #aaa; // todo: theme */
    text-align: center;
    padding: 1.5rem 0.5rem;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* color: #444; */

    & a {
        text-decoration: none;
        &:visited {
            /* color: 444; */
        }
    }
`;
