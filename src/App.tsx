import { RecoilRoot } from 'recoil';
import './App.css';
import ContentFactory from './components/ContentFactory';
import Theme from './components/Theme';

function App() {
    return (
        <RecoilRoot>
            <Theme>
                <ContentFactory />
            </Theme>
        </RecoilRoot>
    );
}

export default App;
