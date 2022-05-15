import styled from '@emotion/styled';
import GitHubIcon from '@mui/icons-material/GitHub';

const Footer = () => {
    return (
        <Wrapper>
            <div>
                Inspired by [
                <a href="http://www.sandcomp.com/blog/sandphoto/" target="_blank">
                    sandphoto
                </a>
                ]
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div>
                    Copyright &copy;&nbsp;
                    <a href="https://github.com/wctiger" target="_blank">
                        wctiger
                    </a>
                </div>
                <div style={{ marginLeft: 2 }}>
                    <a href="https://github.com/wctiger" target="_blank">
                        <GitHubIcon fontSize="inherit" />
                    </a>
                </div>
            </div>
        </Wrapper>
    );
};

export default Footer;

const Wrapper = styled.footer`
    margin-top: 1rem;
    border-top: 1px solid #aaa; // todo: theme
    text-align: center;
    padding: 1.5rem 0.5rem;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #444;

    & a {
        text-decoration: none;
        &:visited {
            color: 444;
        }
    }
`;
