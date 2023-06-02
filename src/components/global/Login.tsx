import * as React from 'react';
import { useRef, useState } from 'react';
import { useOnClickOutside } from '../utils/HandleClickOutside';
import { closePopup, openPopup } from '../utils';
import { useDispatch } from 'react-redux';
import { connectVkAccount } from '../../actions/auth/auth';
import LoginImg from '../../static/images/login.webp';
import '../../static/css/login.less';

interface ILoginProps {
}

const Login: React.FunctionComponent<ILoginProps> = (props) => {

    const dispatch = useDispatch()

    const [showPopup, setShowPopup] = useState(false)
    const ref = useRef(null)

    useOnClickOutside(ref, () => closePopup(setShowPopup))

    return <>
        <button className='header-navbar-login-button' onClick={() => openPopup(setShowPopup)}>
            <i className='fas fa-user' />
            <span>Войти в аккаунт</span>
        </button>

        {showPopup && <>
            <div className='backdrop'></div>
            <div className='login-popup-container' ref={ref}>
                <img src={LoginImg} alt="" />
                <h3>Войти в аккаунт</h3>
                <p>Войдите в аккаунт, чтобы сохранять историю просмотров и делиться своим опытом использования сервисов</p>
                <button className='login-popup-login-button' onClick={() => dispatch(connectVkAccount())}>
                    <i className='fab fa-vk' />
                    <span>Войти через ВКонтакте</span>
                </button>
                <button className='popup-close-button' onClick={() => closePopup(setShowPopup)}><i className='fas fa-times' /></button>
            </div>
        </>}
    </>;
};

export default Login;
