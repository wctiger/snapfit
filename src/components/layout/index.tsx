import { Container, Grid } from '@mui/material';
import Content from './Content';
import Footer from './Footer';
import TopBar from './TopBar';

const Layout = () => {
    return (
        <>
            <TopBar />
            <Container maxWidth="md">
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={6} style={{background: 'orangered', height: 800}}>
                        <Content VerbiageComp={'TEST1'} SelectionComp={'Test2'} DisplayComp={'Test3'} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <Content VerbiageComp={'TEST1'} SelectionComp={'Test2'} DisplayComp={'Test3'} />
                    </Grid>
                </Grid>
                <Footer></Footer>
            </Container>
        </>
    );
};

export default Layout;
