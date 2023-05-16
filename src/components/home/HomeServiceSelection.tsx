import * as React from 'react';
import { useRef, useState } from 'react';
import { useOnClickOutside } from '../utils/HandleClickOutside';
import { closePopup, openPopup } from '../utils';

interface IHomeServiceSelectionProps {
}

const HomeServiceSelection: React.FunctionComponent<IHomeServiceSelectionProps> = (props) => {

    const [showPopup, setShowPopup] = useState(false)

    const ref = useRef(null)
    useOnClickOutside(ref, () => closePopup(setShowPopup))

    return <>
        <button className='filled-blue-bg' onClick={() => openPopup(setShowPopup)}>
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

                    </ul>
                    <div className='home-service-selection-categories-button-container'>
                        <button className='color-blue cursor-pointer'><span>Показать все категории</span><i className='fas fa-chevron-down' /></button>
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
                    <button className='filled-blue-bg'><span>Подобрать сервис</span></button>
                    <button className='transparent-bg'>
                        <div>
                            <i className='far fa-smile' />
                        </div>
                        <span>Обратиться за помощью</span>
                    </button>
                </div>
            </div>
        </>}
    </>;
};

export default HomeServiceSelection;
