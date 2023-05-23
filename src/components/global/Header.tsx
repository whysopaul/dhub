import * as React from 'react';
import Logo from '../../static/images/logo.svg';
import Navigation from './Navigation';
import Login from './Login';
import styles from '../../static/css/Header.module.css';
import { useSelector } from 'react-redux';
import { RootStore } from '../../store';
import UserHeader from './UserHeader';
import { Link, useLocation, useNavigate } from 'react-router-dom';

interface IHeaderProps {
    root?: boolean
}

const Header: React.FunctionComponent<IHeaderProps> = (props) => {

    const rootState = useSelector((state: RootStore) => state)

    const navigate = useNavigate()
    const location = useLocation()

    const createBreadCrumbs = (i: string) => {
        switch (i) {
            case '':
                return <li><Link to='/'>Главная</Link></li>
            case 'service':
                return <li><Link to='/services'>Сервисы</Link></li>
            case 'services':
                return <li><span>Сервисы</span></li>
            case 'profile':
                return <li><span>Профиль</span></li>
            default:
                return <li><span>{i}</span></li>
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
                        {location.pathname.split('/').map(i => createBreadCrumbs(i))}
                    </ul>
                </div>
            </>}
        </header>
    </>;
};

export default Header;
