import * as React from 'react';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../../static/css/AddService.module.css';
import { useOnClickOutside } from '../utils/HandleClickOutside';
import Image from '../../static/images/add_service.webp';

interface IAddServicePopupProps {
}

const AddServicePopup: React.FunctionComponent<IAddServicePopupProps> = (props) => {

    const [showPopup, setShowPopup] = useState(false)
    const ref = useRef(null)

    useOnClickOutside(ref, () => setShowPopup(false))

    return <>
        <button className='transparent-bg' onClick={() => setShowPopup(true)}>
            <div>
                <i className='fas fa-plus' />
            </div>
            <span>Добавить сервис</span>
        </button>

        {showPopup && <>
            <div className='backdrop'></div>
            <div className={styles.popup} ref={ref}>
                <img src={Image} alt="" />
                <h3>Владелец сервиса?</h3>
                <p>Оставьте заявку на его добавление. Мы свяжемся с вами для получения информации о вашем сервисе, после чего пользователи смогут найти его на страницах сайта</p>
                <form>
                    <input type="text" placeholder='Имя*' required />
                    <input type="text" placeholder='Название сервиса' />
                    <input type="text" placeholder='Контакт для обратной связи (email или телефон)*' required />
                    <textarea placeholder='Краткое описание сервиса'></textarea>
                    <label><input type="checkbox" />Соглашаюсь с <Link to='/'>политикой обработки</Link> персональных данных</label>
                    <button>
                        <span>Оставить заявку</span>
                        <i className='fas fa-long-arrow-alt-right' />
                    </button>
                </form>
                <span className={styles.closeBtn} onClick={() => setShowPopup(false)}><i className='fas fa-times' /></span>
            </div>
        </>}
    </>;
};

export default AddServicePopup;
