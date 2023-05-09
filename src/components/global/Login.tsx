import * as React from 'react';
import styles from '../../static/css/Login.module.css';
import { useRef, useState } from 'react';
import { useOnClickOutside } from '../utils/HandleClickOutside';

interface ILoginProps {
}

const Login: React.FunctionComponent<ILoginProps> = (props) => {

    const [showPopup, setShowPopup] = useState(false)
    const ref = useRef(null)

    useOnClickOutside(ref, () => setShowPopup(false))

    return <>
        <button onClick={() => setShowPopup(true)}>
            <i className='fas fa-user' />
            <span>Войти в аккаунт</span>
        </button>

        {showPopup && <>
            <div className='backdrop'></div>
            <div className={styles.popup} ref={ref}>
                <img src="" alt="" />
                <h3>Войти в аккаунт</h3>
                <p>Войдите в аккаунт, чтобы сохранять историю просмотров и делиться своим опытом использования сервисов</p>
                <button>
                    <i className='fab fa-vk' />
                    <span>Войти через ВКонтакте</span>
                </button>
                <span><i className='fas fa-times' /></span>
            </div>
        </>}
    </>;
};

export default Login;
