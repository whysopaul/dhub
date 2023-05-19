import * as React from 'react';
import styles from '../../static/css/Login.module.css';
import { useRef, useState } from 'react';
import { useOnClickOutside } from '../utils/HandleClickOutside';
import { closePopup, openPopup } from '../utils';
import { useDispatch } from 'react-redux';
import { connectVkAccount } from '../../actions/auth/auth';
import LoginImg from '../../static/images/login.webp';

interface ILoginProps {
}

const Login: React.FunctionComponent<ILoginProps> = (props) => {

    const dispatch = useDispatch()

    const [showPopup, setShowPopup] = useState(false)
    const ref = useRef(null)

    useOnClickOutside(ref, () => closePopup(setShowPopup))

    return <>
        <button onClick={() => openPopup(setShowPopup)}>
            <i className='fas fa-user' />
            <span>Войти в аккаунт</span>
        </button>

        {showPopup && <>
            <div className='backdrop'></div>
            <div className={styles.popup} ref={ref}>
                <img src={LoginImg} alt="" />
                <h3>Войти в аккаунт</h3>
                <p>Войдите в аккаунт, чтобы сохранять историю просмотров и делиться своим опытом использования сервисов</p>
                <button className={styles.login} onClick={() => dispatch(connectVkAccount())}>
                    <i className='fab fa-vk' />
                    <span>Войти через ВКонтакте</span>
                </button>
                <button className='popup-close-button' onClick={() => closePopup(setShowPopup)}><i className='fas fa-times' /></button>
            </div>
        </>}
    </>;
};

export default Login;
