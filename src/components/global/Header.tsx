import * as React from 'react';
import Logo from '../../static/images/logo.svg';
import Navigation from './Navigation';
import Login from './Login';
import styles from '../../static/css/Header.module.css';
import { useSelector } from 'react-redux';
import { RootStore } from '../../store';
import UserHeader from './UserHeader';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { mockArtData } from '../../actions/articles/articles';
import { createServiceLink } from '../utils';

interface IHeaderProps {
    root?: boolean
}

const Header: React.FunctionComponent<IHeaderProps> = (props) => {

    const rootState = useSelector((state: RootStore) => state)

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
                        return <li><span>{rootState.services.services.find(service => createServiceLink(service.name) === decodeURI(link))?.name}</span></li>
                }
            })
        }

        if (path.includes('search')) {
            return pathArray.map(link => {
                switch (link) {
                    case '':
                        return <li><Link to='/'>Главная</Link></li>
                    case 'search':
                        return <li><span>Поиск</span></li>
                    default:
                        return null
                }
            })
        }

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
    }

    return <>
        <header style={styles}>
            <div className={styles.navbar}>
                <img src={Logo} alt="" className='cursor-pointer' onClick={() => navigate('/')} />
                <div className={styles.navigation}>
                    <Navigation />
                </div>
                {!rootState.auth.user && <Login />}
                {rootState.auth.user && <UserHeader />}
            </div>
            {!props.root && <>
                <div className={styles.breadcrumbs}>
                    <ul>
                        {createBreadCrumbs(location.pathname)}
                    </ul>
                </div>
            </>}
        </header>
    </>;
};

export default Header;
