import * as React from 'react';
import '../../static/css/feedback.css';
import { TServicesData } from '../../actions/services/types';
import { useRef, useState } from 'react';
import { useOnClickOutside } from '../utils/HandleClickOutside';
import ServiceRatingTag from '../services/ServiceRatingTag';

interface IGiveFeedbackPopupProps {
    service: TServicesData,
    onClose: () => void
}

const GiveFeedbackPopup: React.FunctionComponent<IGiveFeedbackPopupProps> = (props) => {

    const ref = useRef(null)
    useOnClickOutside(ref, () => props.onClose())

    const [functionality, setFunctionality] = useState(0)
    const [usability, setUsability] = useState(0)
    const [customerService, setCustomerService] = useState(0)

    const [textarea, setTextarea] = useState('')

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
                                <div className='feedback-popup-stars'>
                                    {[...new Array(5)].map((_, idx) => {
                                        return <button type='button' className={idx < functionality ? 'star-button active' : 'star-button'} onClick={() => setFunctionality(idx + 1)}><i className='fas fa-star' /></button>
                                    })}
                                </div>
                                <span>Простота использования</span>
                                <div className='feedback-popup-stars'>
                                    {[...new Array(5)].map((_, idx) => {
                                        return <button type='button' className={idx < usability ? 'star-button active' : 'star-button'} onClick={() => setUsability(idx + 1)}><i className='fas fa-star' /></button>
                                    })}
                                </div>
                                <span>Служба поддержки</span>
                                <div className='feedback-popup-stars'>
                                    {[...new Array(5)].map((_, idx) => {
                                        return <button type='button' className={idx < customerService ? 'star-button active' : 'star-button'} onClick={() => setCustomerService(idx + 1)}><i className='fas fa-star' /></button>
                                    })}
                                </div>
                                <span>Итоговая оценка</span>
                                <div className='feedback-popup-total-rating'>
                                    <ServiceRatingTag rating={Number(((functionality + usability + customerService) / 3).toFixed(1))} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <textarea placeholder='Опишите ваш опыт использования' value={textarea} onChange={e => setTextarea(e.target.value)} />
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
