import ContentFactory from './components/ContentFactory';
import TopBar from './components/layout/TopBar';
import Footer from './components/layout/Footer';
import { useStore } from './stores/store';
import { useEffect } from 'react';

function App() {
    const { theme } = useStore();

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(theme);
    }, [theme]);

    return (
        <div className="flex flex-col h-screen overflow-hidden bg-background text-foreground">
            <TopBar />
            <main className="flex-grow p-6 overflow-auto">
                <ContentFactory />
            </main>
            <Footer />
        </div>
    );
}

export default App;
