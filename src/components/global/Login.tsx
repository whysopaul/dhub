import * as React from 'react';
import { useRef } from 'react';
import { useOnClickOutside } from '../utils/HandleClickOutside';
import { useDispatch } from 'react-redux';
import { connectVkAccount } from '../../actions/auth/auth';
import LoginImg from '../../static/images/login.webp';
import '../../static/css/login.less';
import { useOnPopup } from '../utils/HandleOnPopup';

interface ILoginProps {
    onClose: () => void
}

const Login: React.FunctionComponent<ILoginProps> = (props) => {

    const dispatch = useDispatch()

    const ref = useRef(null)

    useOnClickOutside(ref, () => props.onClose())

    useOnPopup()

    return <>
        <div className='backdrop'></div>
        <div className='login-popup-container' ref={ref}>
            <img src={LoginImg} alt="" />
            <h3>Войти в аккаунт</h3>
            <p>Войдите в аккаунт, чтобы сохранять историю просмотров и делиться своим опытом использования сервисов</p>
            <button className='login-popup-login-button' onClick={() => { dispatch(connectVkAccount()); props.onClose() }}>
                <i className='fab fa-vk' />
                <span>Войти через ВКонтакте</span>
            </button>
            <button className='popup-close-button' onClick={() => props.onClose()}><i className='fas fa-times' /></button>
        </div>
    </>;
};

export default Login;
