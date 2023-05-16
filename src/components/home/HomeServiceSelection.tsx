import * as React from 'react';
import { useRef, useState } from 'react';
import { useOnClickOutside } from '../utils/HandleClickOutside';
import { closePopup, openPopup } from '../utils';
import { useSelector } from 'react-redux';
import { RootStore } from '../../store';
import CategoryTag from '../categories/CategoryTag';

interface IHomeServiceSelectionProps {
}

const HomeServiceSelection: React.FunctionComponent<IHomeServiceSelectionProps> = (props) => {

    const rootState = useSelector((state: RootStore) => state)

    const [showPopup, setShowPopup] = useState(false)

    const ref = useRef(null)
    useOnClickOutside(ref, () => closePopup(setShowPopup))

    const [showCategories, setShowCategories] = useState(16)

    return <>
        <button className='blue-shadow-button' onClick={() => openPopup(setShowPopup)}>
            <span>Подобрать сервис</span>
            <i className='fas fa-long-arrow-alt-right' />
        </button>

        {showPopup && <>
            <div className='backdrop-no-blur'></div>
            <div className='home-service-selection-container' ref={ref}>
                <div className='home-service-selection-header'>
                    <h2>Подобрать сервис</h2>
                    <p>Пожалуйста, заполните и выберете поля ниже. Это поможет нам подобрать для вас тот сервис, который вам нужен.</p>
                </div>
                <hr />
                <div className='home-service-selection-categories'>
                    <p>Выберите категории (одну или несколько):</p>
                    <ul className='categories-list'>
                        {rootState.categories.categories.slice(0, showCategories).map(i => {
                            return <CategoryTag name={i.name} qty={rootState.services.services.filter(service => service.categories.find(category => category.id === i.id)).length} />
                        })}
                    </ul>
                    <div className='home-service-selection-categories-button-container'>
                        <button className='color-blue cursor-pointer' onClick={() => showCategories ? setShowCategories(undefined) : setShowCategories(16)}><span>{showCategories ? 'Показать все категории' : 'Скрыть все категории'}</span><i className={showCategories ? 'fas fa-chevron-down' : 'fas fa-chevron-up'} /></button>
                    </div>
                </div>
                <hr />
                <div className='home-service-selection-advanced-inputs'>
                    <div>
                        <p>Функциональные особенности:</p>
                        <label><input type='checkbox' name='isFree' />Бесплатная версия</label>
                        <label><input type='checkbox' name='hasTrial' />Пробный период</label>
                        <label><input type='checkbox' name='hasPartnership' />Партнёрская программа</label>
                    </div>
                    <div>
                        <p>Способ оплаты:</p>
                        <label><input type='radio' name='paymentMethod' />По клику</label>
                        <label><input type='radio' name='paymentMethod' />По времени</label>
                        <label><input type='radio' name='paymentMethod' />По действию</label>
                    </div>
                </div>
                <hr />
                <div className='home-service-selection-search-container'>
                    <p>Поиск по названию:</p>
                    <input type='text' placeholder='Введите полное название сервиса или его часть' />
                    <i className='fas fa-search color-blue' />
                </div>
                <div className='home-service-selection-buttons'>
                    <button className='blue-shadow-button'><span>Подобрать сервис</span></button>
                    <button className='round-item-button'>
                        <div>
                            <i className='far fa-smile' />
                        </div>
                        <span>Обратиться за помощью</span>
                    </button>
                </div>
                <button className='home-service-selection-close cursor-pointer' onClick={() => closePopup(setShowPopup)}><i className='fas fa-times' /></button>
            </div>
        </>}
    </>;
};

export default HomeServiceSelection;
