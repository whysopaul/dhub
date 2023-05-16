import * as React from 'react';
import { useRef, useState } from 'react';
import { useOnClickOutside } from '../utils/HandleClickOutside';

interface IHomeServiceSelectionProps {
}

const HomeServiceSelection: React.FunctionComponent<IHomeServiceSelectionProps> = (props) => {

    const [showPopup, setShowPopup] = useState(false)
    const ref = useRef(null)
    useOnClickOutside(ref, () => setShowPopup(false))

    return <>
        <button className='filled-blue-bg' onClick={() => setShowPopup(true)}>
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
                <div>
                    <p>Выберите категории (одну или несколько):</p>
                    <ul>

                    </ul>
                    <div>
                        <button><span>Показать все категории</span><i className='fas fa-chevron-down' /></button>
                    </div>
                </div>
                <hr />
                <div>
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
                <div>
                    <p>Поиск по названию:</p>
                    <input type='text' placeholder='Введите полное название сервиса или его часть' />
                </div>
                <div>
                    <button><span>Подобрать сервис</span></button>
                    <button>
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
