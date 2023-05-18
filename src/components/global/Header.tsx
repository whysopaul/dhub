import * as React from 'react';
import Logo from '../../static/images/logo_transparent.svg';
import Navigation from './Navigation';
import Login from './Login';
import styles from '../../static/css/Header.module.css';
import { useSelector } from 'react-redux';
import { RootStore } from '../../store';
import UserHeader from './UserHeader';
import { useNavigate } from 'react-router-dom';

interface IHeaderProps {
    template: React.ReactElement
}

const Header: React.FunctionComponent<IHeaderProps> = (props) => {

    const authState = useSelector((state: RootStore) => state.auth.user)

    const navigate = useNavigate()

    return <>
        <header style={styles}>
            <div className={styles.wrapper}>
                <div className={styles.navbar}>
                    <img src={Logo} alt="" className='cursor-pointer' onClick={() => navigate('/')} />
                    <div className={styles.navigation}>
                        <Navigation />
                    </div>
                    {!authState && <Login />}
                    {authState && <UserHeader />}
                </div>
                {props.template}
            </div>
        </header>
    </>;
};

export default Header;
