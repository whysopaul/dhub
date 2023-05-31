import * as React from 'react';
import '../../static/css/feedback.css';
import { TServicesData } from '../../actions/services/types';
import { useEffect, useRef, useState } from 'react';
import { useOnClickOutside } from '../utils/HandleClickOutside';
import ServiceRatingTag from '../services/ServiceRatingTag';

interface IGiveFeedbackPopupProps {
    service?: TServicesData,
    onClose: () => void
}

const GiveFeedbackPopup: React.FunctionComponent<IGiveFeedbackPopupProps> = (props) => {

    const ref = useRef(null)
    useOnClickOutside(ref, () => props.onClose())

    const [selectService, setSelectService] = useState(false)
    const [selectedService, setSelectedService] = useState<TServicesData>(null)

    useEffect(() => {
        if (props.service) {
            setSelectedService(props.service)
        }

        if (!props.service) {
            setSelectService(true)
        }
    }, [])

    const [functionality, setFunctionality] = useState(0)
    const [usability, setUsability] = useState(0)
    const [customerService, setCustomerService] = useState(0)

    const [textarea, setTextarea] = useState('')

    const starCount = (state: number, setState: (_: number) => void) => {
        return [...new Array(5)].map((_, idx) => {
            return <button type='button' className={idx < state ? 'star-button active' : 'star-button'} onClick={() => setState(idx + 1)} key={idx}><i className='fas fa-star' /></button>
        })
    }

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
                            {!selectService && <>
                                <h3 className='color-blue'>{selectedService?.name}</h3>
                                <div className='feedback-popup-rating'>
                                    <span>Функциональность</span>
                                    <div className='feedback-popup-stars'>
                                        {starCount(functionality, setFunctionality)}
                                    </div>
                                    <span>Простота использования</span>
                                    <div className='feedback-popup-stars'>
                                        {starCount(usability, setUsability)}
                                    </div>
                                    <span>Служба поддержки</span>
                                    <div className='feedback-popup-stars'>
                                        {starCount(customerService, setCustomerService)}
                                    </div>
                                    <span>Итоговая оценка</span>
                                    <div className='feedback-popup-total-rating'>
                                        <ServiceRatingTag rating={Number(((functionality + usability + customerService) / 3).toFixed(1))} />
                                    </div>
                                </div>
                            </>}
                        </div>
                    </div>
                    {!selectService && <textarea placeholder='Опишите ваш опыт использования' value={textarea} onChange={e => setTextarea(e.target.value)} />}
                    <button type='button' className='blue-shadow-button'>
                        <span>{selectService ? 'Далее' : 'Отправить'}</span>
                        <i className='fas fa-long-arrow-alt-right' />
                    </button>
                </div>
            </form>
            <button className='popup-close-button' onClick={() => props.onClose()}><i className='fas fa-times' /></button>
        </div>
    </>;
};

export default GiveFeedbackPopup;
