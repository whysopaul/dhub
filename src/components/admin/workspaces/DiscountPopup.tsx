import * as React from 'react';
import { TDiscount } from '../../../actions/services/types';
import { useDispatch } from 'react-redux';
import { useRef, useState } from 'react';
import { useOnClickOutside } from '../../utils/HandleClickOutside';
import { useOnPopup } from '../../utils/HandleOnPopup';
import { useSelector } from 'react-redux';
import { RootStore } from '../../../store';
import { createDiscount, serviceUpdateDiscount } from '../../../actions/services/services';

interface IDiscountPopupProps {
    discount: TDiscount,
    onClose: () => void,
}

const DiscountPopup: React.FunctionComponent<IDiscountPopupProps> = (props) => {

    const rootState = useSelector((state: RootStore) => state)

    const [discount, setDiscount] = useState<TDiscount>(props.discount)

    const dispatch = useDispatch()

    const [serviceName, setServiceName] = useState('')
    const [showAlert, setShowAlert] = useState(false)

    const searchQuery = rootState.services.services.filter(s => s.name.toLocaleLowerCase().includes(serviceName.toLocaleLowerCase()))

    const ref = useRef(null)

    useOnClickOutside(ref, () => props.onClose())

    useOnPopup()

    return <>
        <div className='backdrop' />
        <div className='popup-container' ref={ref}>
            <h2>{props.discount.service === -1 ? 'Добавить скидку' : 'Редактировать скидку'}</h2>
            <div className='popup-add-form'>
                {props.discount.service === -1 && <label>
                    <span>Поиск:</span>
                    <input
                        type='text'
                        placeholder='Введите название сервиса'
                        value={serviceName}
                        onChange={e => setServiceName(e.target.value)}
                        disabled={props.discount.service !== -1}
                    />
                    {searchQuery.length > 0 && <div className='popup-search-dropdown'>
                        <ul className='popup-list-scroll'>
                            {searchQuery.map(s => {
                                return <li key={s.id}>
                                    <button
                                        className={discount.service === s.id ? 'category-tag active' : 'category-tag'}
                                        onClick={() => setDiscount({
                                            ...discount,
                                            service: s.id
                                        })}
                                    >
                                        {s.name}
                                    </button>
                                </li>
                            })}
                        </ul>
                    </div>}
                </label>}
                <label>
                    <span>Сервис:</span>
                    <select
                        className='popup-service-select'
                        disabled
                    >
                        <option>{discount.service === -1 ? '--------' : rootState.services.services.find(s => s.id === discount.service)?.name}</option>
                    </select>
                </label>
                <div>
                    <span>Тип:</span>
                    <div className='popup-type-selection'>
                        <label>
                            <input
                                type='radio'
                                onChange={() => setDiscount({
                                    ...discount,
                                    is_promocode: true,
                                    is_sale: false
                                })}
                                checked={discount.is_promocode}
                            />
                            <span>Промокод</span>
                        </label>
                        <label>
                            <input
                                type='radio'
                                onChange={() => setDiscount({
                                    ...discount,
                                    is_promocode: false,
                                    is_sale: true
                                })}
                                checked={discount.is_sale}
                            />
                            <span>Скидка</span>
                        </label>
                    </div>
                </div>
                {discount.is_promocode && <label>
                    <span>Промокод:</span>
                    <input
                        type='text'
                        placeholder='Введите промокод'
                        value={discount.code}
                        onChange={e => setDiscount({
                            ...discount,
                            code: e.target.value
                        })}
                    />
                </label>}
                <label>
                    <span>Описание:</span>
                    <textarea
                        placeholder={`Описание ${discount.is_promocode ? 'промокода' : 'скидки'}`}
                        value={discount.description}
                        onChange={e => setDiscount({
                            ...discount,
                            description: e.target.value
                        })}
                    />
                </label>
            </div>
            {showAlert && <div>
                <p className='service-edit-alert'>Поля "Сервис" и "Описание" должны быть заполнены</p>
            </div>}
            <div>
                <button
                    className='blue-shadow-button'
                    onClick={() => {
                        if (discount.service !== -1 && discount.description.length > 0) {
                            if (props.discount.service === -1) {
                                dispatch(createDiscount(rootState.auth.user.d_token, discount))
                            }
                            if (props.discount.service !== -1) {
                                dispatch(serviceUpdateDiscount(rootState.auth.user.d_token, discount))
                            }
                            setShowAlert(false)
                            props.onClose()
                        } else {
                            setShowAlert(true)
                        }
                    }}
                >
                    {props.discount.service === -1 ? 'Добавить скидку' : 'Сохранить изменения'}
                </button>
            </div>
            <button
                className='popup-close-button'
                onClick={() => props.onClose()}
            >
                <i className='fas fa-times' />
            </button>
        </div>
    </>;
};

export default DiscountPopup;
