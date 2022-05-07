import { RecoilRoot } from 'recoil';
import './App.css';
import Layout from './components/layout';
import Theme from './Theme';

function App() {
    return (
        <RecoilRoot>
            <Theme>
                <Layout />
            </Theme>
        </RecoilRoot>
    );
}

export default App;
