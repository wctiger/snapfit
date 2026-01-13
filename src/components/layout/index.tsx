import { FC, ReactNode } from 'react';

interface ILayoutProps {
    leftComp: ReactNode;
    rightComp: ReactNode;
}

const Layout: FC<ILayoutProps> = ({ leftComp, rightComp }) => {
    return (
        <div className="container mx-auto h-full max-w-screen-xl px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 h-full">
                <div className="h-full overflow-auto">{leftComp}</div>
                <div className="h-full overflow-auto">{rightComp}</div>
            </div>
        </div>
    );
};

export default Layout;
