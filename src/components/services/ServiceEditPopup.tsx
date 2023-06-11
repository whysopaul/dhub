import * as React from 'react';
import { useRef, useState } from 'react';
import { useOnClickOutside } from '../utils/HandleClickOutside';
import { useOnPopup } from '../utils/HandleOnPopup';
import { TServicesData } from '../../actions/services/types';

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
                        {props.service.description.locations.map(location => {
                            return <li>{location.name}</li>
                        })}
                    </ul>
                    <p>Платформа:</p>
                    <ul className='categories-list'>
                        {props.service.description.platforms.map(platform => {
                            return <li>{platform.name}</li>
                        })}
                    </ul>
                </div>
                <div>
                    <p>Категории:</p>
                    <ul className='categories-list'>
                        {props.service.categories_3.map(category => {
                            return <li>{category.name}</li>
                        })}
                    </ul>
                </div>
            </div>
            <div>
                <button className='blue-shadow-button'>Сохранить изменения</button>
            </div>
        </div>
    </>;
};

export default ServiceEditPopup;
