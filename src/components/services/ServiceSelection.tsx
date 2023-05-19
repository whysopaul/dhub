import * as React from 'react';
import { useRef, useState } from 'react';
import { useOnClickOutside } from '../utils/HandleClickOutside';
import { useSelector } from 'react-redux';
import { RootStore } from '../../store';
import CategoryTag from '../categories/CategoryTag';

interface IServiceSelectionProps {
    onClose: () => void
}

const ServiceSelection: React.FunctionComponent<IServiceSelectionProps> = (props) => {

    const rootState = useSelector((state: RootStore) => state)

    const ref = useRef(null)
    useOnClickOutside(ref, () => props.onClose())

    const [showCategories, setShowCategories] = useState(16)

    const [search, setSearch] = useState('')

    return <>
        <div className='backdrop-no-blur'></div>
        <div className='service-selection-container' ref={ref}>
            <form action='/services'>
                <div className='service-selection-header'>
                    <h2>Подобрать сервис</h2>
                    <p>Пожалуйста, заполните и выберете поля ниже. Это поможет нам подобрать для вас тот сервис, который вам нужен.</p>
                </div>
                <hr />
                <div className='service-selection-categories'>
                    <p>Выберите категории (одну или несколько):</p>
                    <ul className='categories-list'>
                        {rootState.categories.categories.slice(0, showCategories).map(i => {
                            return <CategoryTag name={i.name} qty={rootState.services.services.filter(service => service.categories.find(category => category.id === i.id)).length} />
                        })}
                    </ul>
                    <div className='service-selection-categories-button-container'>
                        <button type='button' className='color-blue cursor-pointer' onClick={() => showCategories ? setShowCategories(undefined) : setShowCategories(16)}><span>{showCategories ? 'Показать все категории' : 'Скрыть все категории'}</span><i className={showCategories ? 'fas fa-chevron-down' : 'fas fa-chevron-up'} /></button>
                    </div>
                </div>
                <hr />
                <div className='service-selection-advanced-inputs'>
                    <div>
                        <p>Функциональные особенности:</p>
                        <label><input type='checkbox' name='isFree' />Бесплатная версия</label>
                        <label><input type='checkbox' name='hasTrial' />Пробный период</label>
                        <label><input type='checkbox' name='hasPartnership' />Партнёрская программа</label>
                    </div>
                    <div>
                        <p>Способ оплаты:</p>
                        <label><input type='radio' name='paymentMethod' value='1' />По клику</label>
                        <label><input type='radio' name='paymentMethod' value='2' />По времени</label>
                        <label><input type='radio' name='paymentMethod' value='3' />По действию</label>
                    </div>
                </div>
                <hr />
                <div className='service-selection-search-container'>
                    <p>Поиск по названию:</p>
                    <input type='text' name='search' placeholder='Введите полное название сервиса или его часть' value={search} onChange={e => setSearch(e.target.value)} />
                    <i className='fas fa-search color-blue' />
                </div>
                <div className='service-selection-buttons'>
                    <button type='submit' className='blue-shadow-button'><span>Подобрать сервис</span></button>
                    <button type='button' className='round-item-button'>
                        <div>
                            <i className='far fa-smile' />
                        </div>
                        <span>Обратиться за помощью</span>
                    </button>
                </div>
                <button type='button' className='service-selection-close cursor-pointer' onClick={() => props.onClose()}><i className='fas fa-times' /></button>
            </form>
        </div>
    </>;
};

export default ServiceSelection;
