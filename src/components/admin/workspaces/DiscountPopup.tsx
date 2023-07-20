import * as React from 'react';
import { TDiscount, TServicesData } from '../../../actions/services/types';
import { useDispatch } from 'react-redux';
import { useRef, useState } from 'react';
import { useOnClickOutside } from '../../utils/HandleClickOutside';
import { useOnPopup } from '../../utils/HandleOnPopup';
import { useSelector } from 'react-redux';
import { RootStore } from '../../../store';

interface IDiscountPopupProps {
    discount: TDiscount,
    onClose: () => void,
    action: 'create' | 'edit'
}

const DiscountPopup: React.FunctionComponent<IDiscountPopupProps> = (props) => {

    const rootState = useSelector((state: RootStore) => state)

    const [discount, setDiscount] = useState<TDiscount>(props.discount)

    const dispatch = useDispatch()

    const [service, setService] = useState<TServicesData>(null)
    const [serviceName, setServiceName] = useState(discount.service !== -1 ? rootState.services.services.find(s => s.id === discount.service).name : '')
    const [type, setType] = useState<'promocode' | 'sale'>(discount.service !== -1 ? discount.is_promocode ? 'promocode' : 'sale' : 'promocode')
    const [showAlert, setShowAlert] = useState(false)

    const searchQuery = rootState.services.services.filter(s => s.name.toLocaleLowerCase().includes(serviceName.toLocaleLowerCase()))

    const ref = useRef(null)

    useOnClickOutside(ref, () => props.onClose())

    useOnPopup()

    return <>
        <div className='backdrop' />
        <div className='popup-container' ref={ref}>
            <h2>{props.action === 'create' ? 'Добавить скидку' : 'Редактировать скидку'}</h2>
            <div className='popup-add-form'>
                <label>
                    <span>Сервис:</span>
                    <input type='text' placeholder='Введите название сервиса' value={serviceName} onChange={e => setServiceName(e.target.value)} disabled={props.discount.service !== -1} />
                </label>
                <div>
                    <span>Тип:</span>
                    <div className='popup-type-selection'>
                        <label>
                            <input type='radio' onChange={() => setType('promocode')} checked={type === 'promocode'} />
                            <span>Промокод</span>
                        </label>
                        <label>
                            <input type='radio' onChange={() => setType('sale')} checked={type === 'sale'} />
                            <span>Скидка</span>
                        </label>
                    </div>
                </div>
                {type === 'promocode' && <label>
                    <span>Промокод:</span>
                    <input type='text' placeholder='Введите промокод' value={discount.code} onChange={e => setDiscount({
                        ...discount,
                        code: e.target.value
                    })} />
                </label>}
                <label>
                    <span>Описание:</span>
                    <textarea placeholder={`Описание ${type === 'promocode' ? 'промокода' : 'скидки'}`} value={discount.description} onChange={e => setDiscount({
                        ...discount,
                        description: e.target.value
                    })} />
                </label>
            </div>
            {showAlert && <div>
                <p className='service-edit-alert'>Поля "Сервис" и "Описание" должны быть заполнены</p>
            </div>}
            <div>
                <button className='blue-shadow-button' onClick={() => {
                    if (service && discount.description.length > 0) {
                        // dispatch(createCategory(name, index))
                        setShowAlert(false)
                        props.onClose()
                    } else {
                        setShowAlert(true)
                    }
                }}>{props.action === 'create' ? 'Добавить скидку' : 'Сохранить изменения'}</button>
            </div>
            <button className='popup-close-button' onClick={() => props.onClose()}><i className='fas fa-times' /></button>
        </div>
    </>;
};

export default DiscountPopup;
