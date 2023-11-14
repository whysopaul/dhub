import * as React from 'react';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';

interface ILayoutProps {
}

const Layout: React.FunctionComponent<ILayoutProps> = (props) => {
    return <>
        <Header />
        <main className='page-main-container'>
            <Outlet />
        </main>
        <Footer />
    </>;
};

export default Layout;
