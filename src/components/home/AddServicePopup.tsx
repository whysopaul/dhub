import * as React from 'react';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useOnClickOutside } from '../utils/HandleClickOutside';
import Image from '../../static/images/add_service.webp';
import '../../static/css/addservice.less';
import { useOnPopup } from '../utils/HandleOnPopup';
import { useDispatch } from 'react-redux';
import { createServiceApplication } from '../../actions/services/services';

interface IAddServicePopupProps {
    onClose: () => void
}

const AddServicePopup: React.FunctionComponent<IAddServicePopupProps> = (props) => {

    const dispatch = useDispatch()

    const [name, setName] = useState('')
    const [contact, setContact] = useState('')
    const [serviceName, setServiceName] = useState('')
    const [link, setLink] = useState('')
    const [description, setDescription] = useState('')
    const [privacy, setPrivacy] = useState(false)

    const ref = useRef(null)

    useOnClickOutside(ref, () => props.onClose())

    useOnPopup()

    const onSubmit = e => {
        e.preventDefault()

        dispatch(createServiceApplication({
            username: name,
            contact,
            service_name: serviceName,
            service_link: link,
            description
        }))

        props.onClose()
    }

    return <>
        <div className='backdrop'></div>
        <div className='add-service-popup' ref={ref}>
            <img src={Image} alt="" />
            <h3>Владелец сервиса?</h3>
            <p>Оставьте заявку на его добавление. Мы свяжемся с вами для получения информации о вашем сервисе, после чего пользователи смогут найти его на страницах сайта</p>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder='Имя*' value={name} onChange={e => setName(e.target.value)} required />
                <input type="text" placeholder='Контакт для обратной связи (email или телефон)*' value={contact} onChange={e => setContact(e.target.value)} required />
                <input type="text" placeholder='Название сервиса' value={serviceName} onChange={e => setServiceName(e.target.value)} />
                <input type='url' placeholder='Ссылка на сервис*' value={link} onChange={e => setLink(e.target.value)} required />
                <textarea placeholder='Краткое описание сервиса' value={description} onChange={e => setDescription(e.target.value)} />
                <div className='add-service-privacy'>
                    <input type="checkbox" id='privacy' onChange={() => setPrivacy(!privacy)} checked={privacy} required />
                    <label htmlFor='privacy'>
                        <div className='add-service-checkbox-button'>
                            <div></div>
                        </div>
                        <span>Соглашаюсь с <Link to='/'>политикой обработки</Link> персональных данных</span>
                    </label>
                </div>
                <button type='submit' className='blue-shadow-button'>
                    <span>Оставить заявку</span>
                    <i className='fas fa-long-arrow-alt-right' />
                </button>
            </form>
            <button className='popup-close-button' onClick={() => props.onClose()}><i className='fas fa-times' /></button>
        </div>
    </>;
};

export default AddServicePopup;
