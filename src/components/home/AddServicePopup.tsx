import * as React from 'react';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useOnClickOutside } from '../utils/HandleClickOutside';
import Image from '../../static/images/add_service.webp';
import '../../static/css/addservice.less';
import { useOnPopup } from '../utils/HandleOnPopup';

interface IAddServicePopupProps {
    onClose: () => void
}

const AddServicePopup: React.FunctionComponent<IAddServicePopupProps> = (props) => {

    const ref = useRef(null)

    useOnClickOutside(ref, () => props.onClose())

    useOnPopup()

    return <>
        <div className='backdrop'></div>
        <div className='add-service-popup' ref={ref}>
            <img src={Image} alt="" />
            <h3>Владелец сервиса?</h3>
            <p>Оставьте заявку на его добавление. Мы свяжемся с вами для получения информации о вашем сервисе, после чего пользователи смогут найти его на страницах сайта</p>
            <form>
                <input type="text" placeholder='Имя*' required />
                <input type="text" placeholder='Контакт для обратной связи (email или телефон)*' required />
                <input type="text" placeholder='Название сервиса' />
                <input type="text" placeholder='Ссылка на сервис*' required />
                <textarea placeholder='Краткое описание сервиса'></textarea>
                <div className='add-service-privacy'>
                    <input type="checkbox" id='privacy' />
                    <label htmlFor='privacy'>
                        <div className='add-service-checkbox-button'>
                            <div></div>
                        </div>
                        <span>Соглашаюсь с <Link to='/'>политикой обработки</Link> персональных данных</span>
                    </label>
                </div>
                <button className='blue-shadow-button'>
                    <span>Оставить заявку</span>
                    <i className='fas fa-long-arrow-alt-right' />
                </button>
            </form>
            <button className='popup-close-button' onClick={() => props.onClose()}><i className='fas fa-times' /></button>
        </div>
    </>;
};

export default AddServicePopup;
