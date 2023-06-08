import * as React from 'react';
import { useRef, useState } from 'react';
import { useOnClickOutside } from '../utils/HandleClickOutside';
import { useSelector } from 'react-redux';
import { RootStore } from '../../store';
import CategoryTag from '../categories/CategoryTag';
import CategoryTagInput from '../categories/CategoryTagInput';
import { useOnPopup } from '../utils/HandleOnPopup';

interface IServiceSelectionProps {
    onClose: () => void
}

const ServiceSelection: React.FunctionComponent<IServiceSelectionProps> = (props) => {

    const rootState = useSelector((state: RootStore) => state)

    const ref = useRef(null)
    useOnClickOutside(ref, () => props.onClose())

    const [showCategories, setShowCategories] = useState(16)

    const [search, setSearch] = useState('')
    const isFreeRef = useRef<HTMLInputElement>(null)
    const hasTrialRef = useRef<HTMLInputElement>(null)
    const hasPartnershipRef = useRef<HTMLInputElement>(null)
    // 1 - по подписке; 2 - за действие; 3 - разовая
    const [paymentMethod, setPaymentMethod] = useState<number>(null)

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        const urlParams = new URLSearchParams()

        if (search) {
            urlParams.append('search', search.trim())
        }

        if (isFreeRef.current.checked) {
            urlParams.append('isFree', 'true')
        }
        if (hasTrialRef.current.checked) {
            urlParams.append('hasTrial', 'true')
        }
        if (hasPartnershipRef.current.checked) {
            urlParams.append('hasPartnership', 'true')
        }

        if (paymentMethod) {
            urlParams.append('paymentMethod', paymentMethod.toString())
        }

        let checkedCategories = document.querySelectorAll('input[type="checkbox"][name="category"]:checked')
        let categoriesValues = Array.from(checkedCategories, category => category.getAttribute('value')).join(',')
        if (checkedCategories.length > 0) {
            urlParams.append('categories', categoriesValues)
        }

        return window.location.replace('/search?' + urlParams)
    }

    useOnPopup()

    return <>
        <div className='backdrop-no-blur'></div>
        <div className='service-selection-container' ref={ref}>
            <form action='/services' onSubmit={onSubmit}>
                <div className='service-selection-header'>
                    <h2 className='section-main-title'>Найти сервис</h2>
                    <p>Пожалуйста, заполните и выберете поля ниже. Это поможет нам найти для вас тот сервис, который вам нужен.</p>
                </div>
                <hr />
                <div className='categories-section'>
                    <p>Выберите категории (одну или несколько):</p>
                    <ul className='categories-list'>
                        {rootState.categories.categories.slice(0, showCategories).map(i => {
                            // return <CategoryTag name={i.name} qty={rootState.services.services.filter(service => service.categories.find(category => category.id === i.id)).length} />
                            return <CategoryTagInput category={i} qty={rootState.services.services.filter(service => service.categories.find(category => category.id === i.id)).length} />
                        })}
                    </ul>
                    <div className='show-more-container'>
                        <button type='button' className='color-blue cursor-pointer' onClick={() => showCategories ? setShowCategories(undefined) : setShowCategories(16)}>
                            <span>{showCategories ? 'Показать все категории' : 'Скрыть все категории'}</span>
                            <i className={showCategories ? 'fas fa-chevron-down' : 'fas fa-chevron-up'} />
                        </button>
                    </div>
                </div>
                <hr />
                <div className='service-selection-advanced-inputs'>
                    <div>
                        <p>Функциональные особенности:</p>
                        <label><input type='checkbox' ref={isFreeRef} />Бесплатная версия</label>
                        <label><input type='checkbox' ref={hasTrialRef} />Пробный период</label>
                        <label><input type='checkbox' ref={hasPartnershipRef} />Партнёрская программа</label>
                    </div>
                    <div>
                        <p>Способ оплаты:</p>
                        <label><input type='radio' onChange={() => setPaymentMethod(1)} checked={paymentMethod === 1} />По подписке</label>
                        <label><input type='radio' onChange={() => setPaymentMethod(2)} checked={paymentMethod === 2} />За действие</label>
                        <label><input type='radio' onChange={() => setPaymentMethod(3)} checked={paymentMethod === 3} />Разовая</label>
                    </div>
                </div>
                <hr />
                <div className='wide-search-container'>
                    <p>Поиск по названию:</p>
                    <input type='text' name='search' placeholder='Введите название сервиса или его часть' value={search} onChange={e => setSearch(e.target.value)} />
                    <i className='fas fa-search color-blue' />
                </div>
                <div className='service-selection-buttons'>
                    <button type='submit' className='blue-shadow-button'>
                        <span>Найти сервис</span>
                        <i className='fas fa-long-arrow-alt-right' />
                    </button>
                    <button type='button' className='round-item-button'>
                        <div>
                            <i className='far fa-smile' />
                        </div>
                        <span>Обратиться за помощью</span>
                    </button>
                </div>
                <button type='button' className='service-selection-close' onClick={() => props.onClose()}><i className='fas fa-times' /></button>
            </form>
        </div>
    </>;
};

export default ServiceSelection;
