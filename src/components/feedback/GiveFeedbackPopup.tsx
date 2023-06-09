import * as React from 'react';
import '../../static/css/feedback.css';
import { TServicesData } from '../../actions/services/types';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useOnClickOutside } from '../utils/HandleClickOutside';
import ServiceRatingTag from '../services/ServiceRatingTag';
import { useSelector } from 'react-redux';
import { RootStore } from '../../store';
import { useOnPopup } from '../utils/HandleOnPopup';
import { useDispatch } from 'react-redux';
import { feedbackCreateFeedback } from '../../actions/feedback/feedback';

interface IGiveFeedbackPopupProps {
    service?: TServicesData,
    onClose: () => void
}

const GiveFeedbackPopup: React.FunctionComponent<IGiveFeedbackPopupProps> = (props) => {

    const userState = useSelector((state: RootStore) => state.auth.user)
    const serviceState = useSelector((state: RootStore) => state.services.services)

    const dispatch = useDispatch()

    const [search, setSearch] = useState('')
    const searchRef = useRef<HTMLInputElement>(null)
    const [showList, setShowList] = useState(false)

    const searchFilterName = useMemo(() => {
        return serviceState.filter(service => service.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
    }, [search, serviceState])

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

    useOnPopup()

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
                            {selectService && <>
                                <div className='feedback-popup-search'>
                                    <input type='text' placeholder='Выберите сервис из списка' value={search} onChange={e => setSearch(e.target.value)} onFocus={() => setShowList(true)} ref={searchRef} />
                                    <button type='button' onClick={() => showList ? setShowList(false) : searchRef.current.focus()}>
                                        <i className={`fas fa-caret-${showList ? 'up' : 'down'} color-blue cursor-pointer`} />
                                    </button>
                                </div>
                                <div className='feedback-popup-services-list'>
                                    {showList && searchFilterName.map(service => {
                                        return <>
                                            <label className='feedback-popup-services-list-item' key={service.id}>
                                                <img src={service.images.logo} loading='lazy' />
                                                <div>
                                                    <p>{service.name}</p>
                                                    <span>{service.categories_3[0]?.name}</span>
                                                </div>
                                                <input type='radio' name='service' checked={selectedService?.id === service.id} onChange={() => setSelectedService(service)} />
                                            </label>
                                        </>
                                    })}
                                </div>
                            </>}
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
                    {selectService && <button type='button' className='blue-shadow-button' onClick={() => selectedService ? setSelectService(false) : alert('Выберите сервис из списка')}>
                        <span>Далее</span>
                        <i className='fas fa-long-arrow-alt-right' />
                    </button>}
                    {!selectService && <button type='button' className='blue-shadow-button' onClick={() => {
                        dispatch(feedbackCreateFeedback(userState.d_token, {
                            id: -1,
                            user: userState,
                            service: selectedService.id,
                            text: textarea,
                            functionality: functionality,
                            usability: usability,
                            customer_service: customerService,
                            likes: [],
                            total_rating: Number(((functionality + usability + customerService) / 3).toFixed(1))
                        }));
                        props.onClose()
                    }}>
                        <span>Отправить</span>
                        <i className='fas fa-long-arrow-alt-right' />
                    </button>}
                </div>
            </form>
            <button className='popup-close-button' onClick={() => props.onClose()}><i className='fas fa-times' /></button>
        </div>
    </>;
};

export default GiveFeedbackPopup;
