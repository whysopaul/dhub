import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootStore } from '../../store';
import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import LogoTransparent from '../../static/images/logo_transparent.svg';
import Navigation from './Navigation';
import Login from './Login';
import { useOnPopup } from '../utils/HandleOnPopup';
import { useDispatch } from 'react-redux';
import { userLogout } from '../../actions/auth/auth';

interface INavbarMobileProps {
    onClose: () => void
}

const NavbarMobile: React.FunctionComponent<INavbarMobileProps> = (props) => {

    const dispatch = useDispatch()

    const authState = useSelector((state: RootStore) => state.auth.user)

    const [showLoginPopup, setShowLoginPopup] = useState(false)

    const navigate = useNavigate()
    const location = useLocation()

    const initialPath = useRef(location.pathname)

    useEffect(() => {
        if (location.pathname !== initialPath.current) {
            props.onClose()
        }
    }, [location])

    useOnPopup()

    return <>

        {showLoginPopup && <Login onClose={() => setShowLoginPopup(false)} />}

        <div className='navbar-mobile'>
            <div className='navbar-mobile-header'>
                {/* <img src={LogoTransparent} alt="" className='cursor-pointer' onClick={() => navigate('/')} /> */}
                <h1 className='navbar-mobile-header-logo'><Link to='/' title='Главная страница'>digital <span>hub</span></Link></h1>
                <div className='navbar-mobile-header-buttons'>
                    <button className='navbar-mobile-user-button' onClick={() => authState ? navigate('/profile') : setShowLoginPopup(true)}><i className='fas fa-user' /></button>
                    <button className='navbar-mobile-close-button' onClick={() => props.onClose()}><i className='fas fa-times' /></button>
                </div>
            </div>
            <div className='navbar-mobile-navigation'>
                <Navigation />
            </div>
            {authState && <div className='navbar-mobile-logout-container'>
                <button className='navbar-mobile-logout-container-button' onClick={() => dispatch(userLogout())}>Выйти из аккаунта</button>
            </div>}
            <div className='navbar-mobile-social-networks-buttons'>
                <button><i className='fab fa-vk' /></button>
                <button><i className='fab fa-telegram-plane' /></button>
                <button><i className='fab fa-whatsapp' /></button>
            </div>
        </div>
    </>;
};

export default NavbarMobile;
