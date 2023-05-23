import * as React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/home/Home';
import ServicePage from './components/services/ServicePage';
import ServicesListPage from './components/services/ServicesListPage';
import LoginVk from './components/auth/LoginVk';
import UserProfile from './components/user/UserProfile';
import Layout from './components/global/Layout';

interface IAppProps {
}

const App: React.FunctionComponent<IAppProps> = (props) => {
    return <>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route element={<Layout />}>
                    <Route path='/services' element={<ServicesListPage />} />
                    <Route path='/service/:serviceName' element={<ServicePage />} />
                    <Route path='/profile' element={<UserProfile />} />
                </Route>

                <Route path='/loginVk' element={<LoginVk />} />
            </Routes>
        </BrowserRouter>
    </>;
};

export default App;
