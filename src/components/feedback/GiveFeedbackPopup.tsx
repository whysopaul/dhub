import * as React from 'react';
import '../../static/css/feedback.css';
import { TServicesData, TServicesDataSimple } from '../../actions/services/types';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useOnClickOutside } from '../utils/HandleClickOutside';
import ServiceRatingTag from '../services/ServiceRatingTag';
import { useSelector } from 'react-redux';
import { RootStore } from '../../store';
import { useOnPopup } from '../utils/HandleOnPopup';
import { useDispatch } from 'react-redux';
import { feedbackClearGeneratedFeedback, feedbackCreateFeedback, feedbackGenerateFeedback, feedbackUpdateFeedback } from '../../actions/feedback/feedback';
import { TFeedback } from '../../actions/feedback/types';
import ConfirmPopup from '../global/ConfirmPopup';

interface IGiveFeedbackPopupProps {
    service?: TServicesData,
    edit_feedback?: TFeedback,
    onClose: () => void
}

const GiveFeedbackPopup: React.FunctionComponent<IGiveFeedbackPopupProps> = (props) => {

    const userState = useSelector((state: RootStore) => state.auth.user)
    const serviceState = useSelector((state: RootStore) => state.services.services_simple_list)
    const feedbackState = useSelector((state: RootStore) => state.feedback)

    const dispatch = useDispatch()

    const [search, setSearch] = useState('')
    const searchRef = useRef<HTMLInputElement>(null)
    const [showList, setShowList] = useState(false)

    const searchFilterName = useMemo(() => {
        return serviceState.filter(service => service.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
    }, [search, serviceState])

    const ref = useRef(null)
    useOnClickOutside(ref, () => handleOnClose())

    const [selectService, setSelectService] = useState(false)
    const [selectedService, setSelectedService] = useState<TServicesDataSimple>(null)

    useEffect(() => {
        if (props.service) {
            setSelectedService({ id: props.service.id, name: props.service.name, logo: props.service.images.logo, logo_url: '' })
        }

        if (!props.service && !props.edit_feedback) {
            setSelectService(true)
        }
    }, [])

    const [functionality, setFunctionality] = useState(0)
    const [usability, setUsability] = useState(0)
    const [customerService, setCustomerService] = useState(0)

    const [textarea, setTextarea] = useState('')

    const starCount = (state: number, setState: (_: number) => void) => {
        return [...new Array(5)].map((_, idx) => {
            return <button type='button' className={idx < state ? 'star-button active' : 'star-button'} style={!state && showMessage ? { filter: 'drop-shadow(0 0 1px var(--color-red))' } : {}} onClick={() => setState(idx + 1)} disabled={feedbackState.feedback_is_loading} key={idx}><i className='fas fa-star' /></button>
        })
    }

    useEffect(() => {
        if (props.edit_feedback) {
            setSelectedService({ id: props.edit_feedback.service, name: props.edit_feedback.service_name, logo: props.edit_feedback.service_logo, logo_url: '' })
            setFunctionality(props.edit_feedback.functionality)
            setUsability(props.edit_feedback.usability)
            setCustomerService(props.edit_feedback.customer_service)
            setTextarea(props.edit_feedback.text)
        }
    }, [])

    useEffect(() => {
        if (feedbackState.generated_feedback && feedbackState.generated_feedback.text !== textarea) {
            const wordsArray = feedbackState.generated_feedback.text.split(' ')

            setTextarea('')

            // for (let i = 0; i < wordsCount; i++) {
            //     setTimeout(() => setTextarea(textarea => textarea + feedbackState.generated_feedback.text.split(' ')[i] + ((feedbackState.generated_feedback.text.split(' ')[i] === '\n' || i === (wordsCount - 1)) ? '' : ' ')), (150 * (i + 1)))
            // }
            wordsArray.map((_, idx) => setTimeout(() => setTextarea(textarea => textarea + wordsArray[idx] + ((wordsArray[idx] === '\n' || idx === (wordsArray.length - 1)) ? '' : ' ')), (150 * (idx + 1))))
        }
    }, [feedbackState.generated_feedback])

    const [isValidFeedback, setIsValidFeedback] = useState(false)
    const [showMessage, setShowMessage] = useState(false)

    useEffect(() => {
        if (functionality && usability && customerService && textarea) {
            setIsValidFeedback(true)
        }
    }, [, functionality, usability, customerService, textarea])

    const [openConfirmPopup, setOpenConfirmPopup] = useState(false)
    const [isConfirmedClosing, setIsConfirmedClosing] = useState(true)

    useEffect(() => {
        if (functionality || usability || customerService || textarea) {
            setIsConfirmedClosing(false)
        }
    }, [functionality, usability, customerService, textarea])

    const handleOnClose = () => {
        if (isConfirmedClosing) {
            props.onClose()
        } else {
            setOpenConfirmPopup(true)
        }
    }

    useEffect(() => {
        return () => dispatch(feedbackClearGeneratedFeedback())
    }, [])

    useOnPopup()

    return <>
        <div className='backdrop'></div>
        <div className='feedback-popup-container' ref={ref}>
            <form style={openConfirmPopup ? { pointerEvents: 'none' } : {}}>
                <div className='feedback-popup-main'>
                    <div className='feedback-popup-columns'>
                        {/* <div>
                            <i className='far fa-edit color-blue' />
                        </div> */}
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
                                                <img src={'https://api.vtargete.pro' + service.logo_url} alt={service.name} loading='lazy' />
                                                <div>
                                                    <p>{service.name}</p>
                                                    {/* <span>{service.categories_3[0]?.name}</span> */}
                                                </div>
                                                <input type='radio' name='service' checked={selectedService?.id === service.id} onChange={() => setSelectedService({ id: service.id, name: service.name, logo: service.logo, logo_url: '' })} />
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
                    {!selectService && <textarea placeholder='Опишите ваш опыт использования' style={!textarea && showMessage ? { boxShadow: '0 0 2px var(--color-red)' } : {}} value={textarea} onChange={e => setTextarea(e.target.value)} disabled={feedbackState.feedback_is_loading} />}
                    {selectService && <button type='button' className='blue-shadow-button' onClick={() => selectedService ? setSelectService(false) : alert('Выберите сервис из списка')}>
                        <span>Далее</span>
                        <i className='fas fa-long-arrow-alt-right' />
                    </button>}
                    {!selectService && !props.edit_feedback && <div className='feedback-popup-bottom-buttons'>
                        <button
                            type='button'
                            className='feedback-popup-bottom-buttons-ai-button'
                            title='Дописать отзыв с помощью ИИ'
                            onClick={() => {
                                if (isValidFeedback) {
                                    setShowMessage(false)
                                    dispatch(feedbackGenerateFeedback(userState.d_token, {
                                        id: -1,
                                        user: userState,
                                        service: selectedService.id,
                                        text: textarea,
                                        functionality,
                                        usability,
                                        customer_service: customerService,
                                        likes: [],
                                        total_rating: Number(((functionality + usability + customerService) / 3).toFixed(1)),
                                        service_name: selectedService.name,
                                        service_logo: selectedService.logo
                                    }))
                                } else {
                                    setShowMessage(true)
                                }
                            }}
                        >
                            <i className={feedbackState.feedback_is_loading ? 'fas fa-sync-alt fa-spin' : 'fas fa-magic'} />
                        </button>
                        <span className='feedback-popup-bottom-buttons-divider' />
                        <button
                            type='button'
                            className='feedback-popup-bottom-buttons-create-feedback-button'
                            onClick={() => {
                                if (isValidFeedback) {
                                    dispatch(feedbackCreateFeedback(userState.d_token, {
                                        id: -1,
                                        user: userState,
                                        service: selectedService.id,
                                        text: textarea,
                                        functionality: functionality,
                                        usability: usability,
                                        customer_service: customerService,
                                        likes: [],
                                        total_rating: Number(((functionality + usability + customerService) / 3).toFixed(1)),
                                        service_name: selectedService.name,
                                        service_logo: selectedService.logo
                                    }));
                                    props.onClose()
                                } else {
                                    setShowMessage(true)
                                }
                            }}
                        >
                            <span>Отправить</span>
                            <i className='fas fa-long-arrow-alt-right' />
                        </button>
                    </div>}
                    {props.edit_feedback && <button type='button' className='blue-shadow-button' onClick={() => {
                        dispatch(feedbackUpdateFeedback(userState.d_token, {
                            ...props.edit_feedback,
                            text: textarea,
                            functionality,
                            usability,
                            customer_service: customerService,
                            total_rating: Number(((functionality + usability + customerService) / 3).toFixed(1))
                        }))
                        props.onClose()
                    }}>
                        Сохранить
                    </button>}
                    {showMessage && <p>Выставлены не все оценки, или отсутствует текст отзыва</p>}
                </div>
            </form>
            <button className='popup-close-button' onClick={() => handleOnClose()}><i className='fas fa-times' /></button>

            {openConfirmPopup && <ConfirmPopup title='Вы уверены, что хотите закрыть окно? Несохраненные данные будут утеряны.' onConfirm={() => props.onClose()} onClose={() => setOpenConfirmPopup(false)} />}
        </div>
    </>;
};

export default GiveFeedbackPopup;
