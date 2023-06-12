import * as React from 'react';
import { useRef, useState } from 'react';
import { useOnClickOutside } from '../utils/HandleClickOutside';
import { useOnPopup } from '../utils/HandleOnPopup';
import { TServicesData } from '../../actions/services/types';
import { useDispatch } from 'react-redux';
import { serviceDataUpdate } from '../../actions/services/services';

interface IServiceEditPopupProps {
    service: TServicesData,
    onClose: () => void
}

const ServiceEditPopup: React.FunctionComponent<IServiceEditPopupProps> = (props) => {

    const ref = useRef(null)

    useOnClickOutside(ref, () => props.onClose())

    useOnPopup()

    const [name, setName] = useState(props.service.name)
    const [description, setDescription] = useState(props.service.description.text)
    const [isFree, setIsFree] = useState(props.service.description.isFree)
    const [hasTrial, setHasTrial] = useState(props.service.description.hasTrial)
    const [hasPartnership, setHasPartnership] = useState(props.service.description.hasPartnership)
    const [price, setPrice] = useState(props.service.description.price)
    const [paymentMethod, setPaymentMethod] = useState(props.service.description.paymentMethod)
    const locations = ['облако', 'сервер', 'приложение']
    const platforms = ['Apple', 'Windows', 'Linux']

    const dispatch = useDispatch()

    return <>
        <div className='backdrop'></div>
        <div className='service-edit-popup-container' ref={ref}>
            <h2>Редактирование сервиса</h2>
            <div className='service-edit-info'>
                <input type='text' value={name} onChange={e => setName(e.target.value)} />
                <textarea value={description} onChange={e => setDescription(e.target.value)} />
                <div className='service-edit-details'>
                    <label><span>Бесплатная версия:</span><input type='checkbox' checked={isFree} onChange={() => setIsFree(!isFree)} /></label>
                    <label><span>Пробный период:</span><input type='checkbox' checked={hasTrial} onChange={() => setHasTrial(!hasTrial)} /></label>
                    <label><span>Партнерская программа:</span><input type='checkbox' checked={hasPartnership} onChange={() => setHasPartnership(!hasPartnership)} /></label>
                    <label><span>Стоимость:</span><input type='text' value={price} onChange={e => setPrice(e.target.value)} /></label>
                    <label><span>Способ оплаты:</span><input type='text' value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)} /></label>
                    <p>Дислокация:</p>
                    <ul className='categories-list'>
                        {locations.map(location => {
                            return <li><button className={props.service.description.locations.find(loc => loc.name.includes(location)) ? 'category-tag active' : 'category-tag'}>{location}</button></li>
                        })}
                    </ul>
                    <p>Платформа:</p>
                    <ul className='categories-list'>
                        {platforms.map(platform => {
                            return <li><button className={props.service.description.platforms.find(pl => pl.name.includes(platform)) ? 'category-tag active' : 'category-tag'}>{platform}</button></li>
                        })}
                    </ul>
                    <p>Категории:</p>
                    <ul className='categories-list'>
                        {props.service.categories_3.map(category => {
                            return <li><button className='category-tag'>{category.name}</button></li>
                        })}
                        <li><button className='category-tag'><i className='fas fa-plus' /></button></li>
                    </ul>
                </div>
            </div>
            <div>
                <button className='blue-shadow-button' onClick={() => dispatch(serviceDataUpdate({
                    ...props.service,
                    name: name,
                    description: {
                        ...props.service.description,
                        text: description,
                        isFree: isFree,
                        hasTrial: hasTrial,
                        hasPartnership: hasPartnership,
                        price: price,
                        paymentMethod: paymentMethod
                    }
                }))}>Сохранить изменения</button>
            </div>
            <button className='popup-close-button' onClick={() => props.onClose()}><i className='fas fa-times' /></button>
        </div>
    </>;
};

export default ServiceEditPopup;
