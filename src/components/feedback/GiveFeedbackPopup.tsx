import * as React from 'react';
import '../../static/css/feedback.css';
import { TServicesData } from '../../actions/services/types';
import { useRef } from 'react';
import { useOnClickOutside } from '../utils/HandleClickOutside';
import ServiceRatingTag from '../services/ServiceRatingTag';

interface IGiveFeedbackPopupProps {
    service: TServicesData,
    onClose: () => void
}

const GiveFeedbackPopup: React.FunctionComponent<IGiveFeedbackPopupProps> = (props) => {

    const ref = useRef(null)
    useOnClickOutside(ref, () => props.onClose())

    return <>
        <div className='backdrop'></div>
        <div className='feedback-popup-container' ref={ref}>
            <form>
                <div className='feedback-popup-main'>
                    <div className='feedback-popup-columns'>
                        <div>
                            <i className='far fa-edit color-blue' />
                        </div>
                        <div>
                            <h3>Оставьте отзыв на сервис</h3>
                            <h3 className='color-blue'>{props.service.name}</h3>
                            <div className='feedback-popup-rating'>
                                <span>Функциональность</span>
                                <div></div>
                                <span>Простота использования</span>
                                <div></div>
                                <span>Служба поддержки</span>
                                <div></div>
                                <span>Итоговая оценка</span>
                                <ServiceRatingTag rating={75} />
                            </div>
                        </div>
                    </div>
                    <textarea placeholder='Опишите ваш опыт использования' />
                    <button type='submit' className='blue-shadow-button'>
                        <span>Отправить</span>
                        <i className='fas fa-long-arrow-alt-right' />
                    </button>
                </div>
            </form>
            <button className='popup-close-button' onClick={() => props.onClose()}><i className='fas fa-times' /></button>
        </div>
    </>;
};

export default GiveFeedbackPopup;
