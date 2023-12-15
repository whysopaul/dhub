import * as React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
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
import GetData from './components/utils/GetData';
// import AdminPanel from './components/admin/AdminPanel';
import CollectionsPage from './components/collections/CollectionsPage';
import CollectionPage from './components/collections/CollectionPage';
import Head from './components/utils/Head';
import { Suspense, lazy } from 'react';
import Loading from './components/global/Loading';
import Privacy from './components/legal/Privacy';
import OfferAgreement from './components/legal/OfferAgreement';
import { useSelector } from 'react-redux';
import { RootStore } from './store';

const AdminPanel = lazy(() => import('./components/admin/AdminPanel'));

interface IAppProps {
}

const App: React.FunctionComponent<IAppProps> = (props) => {

    const userState = useSelector((state: RootStore) => state.auth.user)

    return <>
        <Suspense fallback={<Loading height={'100vh'} />}>
            <BrowserRouter>
                <GetData />
                <ScrollToTop />

                <Head />

                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route element={<Layout />}>
                        <Route path='/services' element={<ServicesSearchList />} />
                        <Route path='/services/:pageNumber' element={<ServicesSearchList />} />
                        <Route path='/service/:serviceId' element={<ServicePage />} />
                        <Route path='/categories' element={<CategoriesListPage />} />
                        <Route path='/feedback' element={<FeedbackListPage />} />
                        <Route path='/articles' element={<ArticlesListPage />} />
                        <Route path='/article/:articleId' element={<ArticlePage />} />
                        <Route path='/collections' element={<CollectionsPage />} />
                        <Route path='/collection/:collectionId' element={<CollectionPage />} />
                        {userState && <Route path='/profile' element={<UserProfile />} />}
                        {userState && <Route path='/profile/edit' element={<UserProfileEdit />} />}
                        {userState && userState.is_admin && <Route path='/admin' element={<AdminPanel />} />}
                    </Route>
                    <Route path='/privacy' element={<Privacy />} />
                    <Route path='/offer' element={<OfferAgreement />} />
                    <Route path='*' element={<Navigate to='/' replace />} />

                    <Route path='/loginVk' element={<LoginVk />} />
                </Routes>
            </BrowserRouter>
        </Suspense>
    </>;
};

export default App;
