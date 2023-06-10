import * as React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/home/Home';
import ServicePage from './components/services/ServicePage';
import ServicesSearchList from './components/services/ServicesSearchList';
import LoginVk from './components/auth/LoginVk';
import UserProfile from './components/user/UserProfile';
import Layout from './components/global/Layout';
import UserProfileEdit from './components/user/UserProfileEdit';
import FeedbackListPage from './components/feedback/FeedbackListPage';
import ArticlesListPage from './components/articles/ArticlesListPage';
import ArticlePage from './components/articles/ArticlePage';
import CategoriesListPage from './components/categories/CategoriesListPage';
import ScrollToTop from './components/utils/ScrollToTop';

interface IAppProps {
}

const App: React.FunctionComponent<IAppProps> = (props) => {
    return <>
        <BrowserRouter>
            <ScrollToTop />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route element={<Layout />}>
                    <Route path='/search' element={<ServicesSearchList />} />
                    <Route path='/services' element={<CategoriesListPage />} />
                    <Route path='/service/:serviceName' element={<ServicePage />} />
                    <Route path='/feedback' element={<FeedbackListPage />} />
                    <Route path='/articles' element={<ArticlesListPage />} />
                    <Route path='/article/:articleId' element={<ArticlePage />} />
                    <Route path='/profile' element={<UserProfile />} />
                    <Route path='/profile/edit' element={<UserProfileEdit />} />
                </Route>

                <Route path='/loginVk' element={<LoginVk />} />
            </Routes>
        </BrowserRouter>
    </>;
};

export default App;
