import { FC, ReactNode } from 'react';

interface ILayoutProps {
    leftComp: ReactNode;
    rightComp: ReactNode;
}

const Layout: FC<ILayoutProps> = ({ leftComp, rightComp }) => {
    return (
        <div className="container mx-auto h-full max-w-screen-xl">
            <div className="flex flex-wrap justify-center gap-6 h-full">
                <div className="flex-1 min-w-full sm:min-w-[calc(50%-12px)] h-full overflow-auto">
                    {leftComp}
                </div>
                <div className="flex-1 min-w-full sm:min-w-[calc(50%-12px)] h-full overflow-auto">
                    {rightComp}
                </div>
            </div>
        </div>
    );
};

export default Layout;
