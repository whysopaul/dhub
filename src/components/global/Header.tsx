import * as React from 'react';
import Logo from '../../static/images/logo.svg';
import Navigation from './Navigation';
import Login from './Login';
import { useSelector } from 'react-redux';
import { RootStore } from '../../store';
import UserHeader from './UserHeader';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { mockArtData } from '../../actions/articles/articles';
import { useState } from 'react';
import NavbarMobile from './NavbarMobile';
import { useDispatch } from 'react-redux';
import { userHideLoginPopup, userShowLoginPopup } from '../../actions/auth/auth';

interface IHeaderProps {
    root?: boolean
}

const Header: React.FunctionComponent<IHeaderProps> = (props) => {

    const rootState = useSelector((state: RootStore) => state)

    const dispatch = useDispatch()

    const [showNavbarMobile, setShowNavbarMobile] = useState(false)

    const navigate = useNavigate()
    const location = useLocation()

    const createBreadCrumbs = (path: string) => {

        let pathArray = path.split('/')
        pathArray[pathArray.length - 1] === '' && pathArray.pop()

        if (path.includes('service')) {
            return pathArray.map(link => {
                switch (link) {
                    case '':
                        return <li><Link to='/'>Главная</Link></li>
                    case 'service':
                        return <li><Link to='/services'>Сервисы</Link></li>
                    case 'services':
                        return <li><span>Сервисы</span></li>
                    default:
                        if (parseInt(link) > 1000) {
                            return <li><span>{rootState.services.services_simple_list.find(service => service.id === parseInt(link))?.name}</span></li>
                        } else {
                            return null
                        }
                }
            })
        }

        if (path.includes('categories')) {
            return pathArray.map(link => {
                switch (link) {
                    case '':
                        return <li><Link to='/'>Главная</Link></li>
                    case 'categories':
                        return <li><span>Категории</span></li>
                    default:
                        return null
                }
            })
        }

        // if (path.includes('results')) {
        //     return pathArray.map(link => {
        //         switch (link) {
        //             case '':
        //                 return <li><Link to='/'>Главная</Link></li>
        //             case 'results':
        //                 return <li><span>Поиск</span></li>
        //             default:
        //                 return null
        //         }
        //     })
        // }

        if (path.includes('feedback')) {
            return pathArray.map(link => {
                switch (link) {
                    case '':
                        return <li><Link to='/'>Главная</Link></li>
                    case 'feedback':
                        return <li><span>Отзывы</span></li>
                    default:
                        return null
                }
            })
        }

        if (path.includes('article')) {
            return pathArray.map(link => {
                switch (link) {
                    case '':
                        return <li><Link to='/'>Главная</Link></li>
                    case 'article':
                        return <li><Link to='/articles'>Статьи</Link></li>
                    case 'articles':
                        return <li><span>Статьи</span></li>
                    default:
                        return <li><span>{mockArtData.find(article => article.id === parseInt(link))?.title}</span></li>
                }
            })
        }

        if (path.includes('collection')) {
            return pathArray.map(link => {
                switch (link) {
                    case '':
                        return <li><Link to='/'>Главная</Link></li>
                    case 'collection':
                        return <li><Link to='/collections'>Подборки</Link></li>
                    case 'collections':
                        return <li><span>Подборки</span></li>
                    default:
                        return <li><span>{rootState.services.collections.find(c => c.id === parseInt(link))?.title}</span></li>
                }
            })
        }

        if (path.includes('profile')) {
            return pathArray.map((link, idx) => {
                switch (link) {
                    case '':
                        return <li><Link to='/'>Главная</Link></li>
                    case 'profile':
                        if (idx + 1 === pathArray.length) {
                            return <li><span>Профиль</span></li>
                        }
                        return <li><Link to='/profile'>Профиль</Link></li>
                    case 'edit':
                        return <li><span>Редактировать профиль</span></li>
                    default:
                        return null
                }
            })
        }

        if (path === '/admin') {
            return pathArray.map(link => {
                switch (link) {
                    case '':
                        return <li><Link to='/'>Главная</Link></li>
                    case 'admin':
                        return <li><span>Панель администратора</span></li>
                    default:
                        return null
                }
            })
        }
    }

    return <>

        {rootState.auth.showLoginPopup && <Login onClose={() => dispatch(userHideLoginPopup())} />}
        {showNavbarMobile && <NavbarMobile onClose={() => setShowNavbarMobile(false)} />}

        <header className='header'>
            <div className='header-navbar'>
                {/* <img src={Logo} alt="" className='cursor-pointer' onClick={() => navigate('/')} /> */}
                <h1 className='header-logo'><Link to='/' title='Главная страница'>digital <span>hub</span></Link></h1>
                <div className='header-navbar-navigation'>
                    <Navigation />
                </div>
                {!rootState.auth.user && <>
                    <button className='header-navbar-login-button' onClick={() => dispatch(userShowLoginPopup())}>
                        <i className='fas fa-user' />
                        <span>Войти в аккаунт</span>
                    </button>
                </>}
                {rootState.auth.user && <UserHeader />}
                <div className='header-navbar-navigation mobile'>
                    <button onClick={() => rootState.auth.user ? navigate('/profile') : dispatch(userShowLoginPopup())} title={rootState.auth.user ? 'Профиль' : 'Войти в аккаунт'}><i className='fas fa-user' /></button>
                    <button className='bg-blue' onClick={() => setShowNavbarMobile(true)} title='Главное меню'><i className='fas fa-bars color-white' /></button>
                </div>
            </div>
            {!props.root && <>
                <div className='header-breadcrumbs'>
                    <ul>
                        {createBreadCrumbs(location.pathname)}
                    </ul>
                </div>
            </>}
        </header>
    </>;
};

export default Header;
