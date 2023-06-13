import * as React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootStore } from '../../store';
import { useEffect, useState } from 'react';
import '../../static/css/services.css';
import ServiceRatingTag from './ServiceRatingTag';
import CategoryTag from '../categories/CategoryTag';
import Banner from '../../static/images/service_banner.webp'
import { createServiceLink } from '../utils';
import { mockFeedbackData } from '../../actions/feedback/feedback';
import FeedbackCardComponent from '../feedback/FeedbackCardComponent';
import { TServicesData } from '../../actions/services/types';
import ServiceGallery from './ServiceGallery';
import { mockSpecialists } from '../../actions/specialists/specialists';
import SpecialistCardComponent from '../specialists/SpecialistCardComponent';
import GiveFeedbackPopup from '../feedback/GiveFeedbackPopup';
import ServiceEditPopup from './ServiceEditPopup';

interface IServicePageProps {
}

const ServicePage: React.FunctionComponent<IServicePageProps> = (props) => {

    const { serviceName } = useParams()
    const authState = useSelector((state: RootStore) => state.auth.user)
    const serviceState = useSelector((state: RootStore) => state.services.services)
    const [currentService, setCurrentService] = useState<TServicesData>()
    const [editMode, setEditMode] = useState(false)

    useEffect(() => {
        setCurrentService(serviceState.find(i => createServiceLink(i.name) === serviceName))
    }, [, serviceState])

    const [selectedImageSource, setSelectedImageSource] = useState(null)

    // 1 - Отзывы
    // 2 - Специалисты
    const [mode, setMode] = useState<number>(1)

    const [showFeedbackPopup, setShowFeedbackPopup] = useState(false)

    const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth)
    const [currentCard, setCurrentCard] = useState<number>(0)

    useEffect(() => {
        setScreenWidth(window.innerWidth)

        const updateServicesQty = () => {
            setScreenWidth(window.innerWidth)
        }

        window.addEventListener('resize', updateServicesQty)

        return () => {
            window.removeEventListener('resize', updateServicesQty)
        }
    }, [, screenWidth])

    // Comment Mobile Swipe

    const [touchPosition, setTouchPosition] = useState(null)

    const handleTouchStart = (e: React.TouchEvent) => {
        const touchDown = e.touches[0].clientX
        setTouchPosition(touchDown)
    }

    const handleTouchMove = (e: React.TouchEvent, cardsQty: number) => {
        const touchDown = touchPosition

        if (touchDown === null) {
            return
        }

        const currentTouch = e.touches[0].clientX
        const diff = touchDown - currentTouch

        if (diff > 5) {
            if (currentCard + 1 > cardsQty) {
                return setCurrentCard(0)
            }
            return setCurrentCard(currentCard + 1)
        }

        if (diff < -5) {
            if (currentCard - 1 < 0) {
                return setCurrentCard(cardsQty)
            }
            return setCurrentCard(currentCard - 1)
        }

        setTouchPosition(null)
    }

    return <>

        {selectedImageSource && <ServiceGallery service={currentService} source={selectedImageSource} onClose={() => setSelectedImageSource(null)} />}
        {showFeedbackPopup && <GiveFeedbackPopup service={currentService} onClose={() => setShowFeedbackPopup(false)} />}
        {editMode && <ServiceEditPopup service={currentService} onClose={() => setEditMode(false)} />}

        {currentService && <>
            <div className='service-main-container'>
                <div>
                    <div className='service-info'>
                        <div className='service-info-header'>
                            <div className='service-title-section'>
                                <a href='#'>
                                    <h1 className='section-main-title'>{currentService.name}</h1>
                                    <i className='fas fa-external-link-alt' />
                                </a>
                                {authState && <button onClick={() => setEditMode(true)}>Редактировать</button>}
                                <span>{currentService.categories_3[0]?.name}</span>
                            </div>
                            <div className='service-rating-section'>
                                <ServiceRatingTag rating={currentService.rating} />
                                <div className='service-rating-divider' />
                                <div className='service-feedback-qty'>
                                    <i className='fas fa-star' />
                                    <span>34 отзыва</span>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <p>{currentService.description.text}</p>
                    </div>
                    <div className='service-more-info'>
                        <div className='service-banner-wrapper'>
                            <div className='service-banner-container'>
                                <div>
                                    <h3>Специалист в этом сервисе?</h3>
                                    <button className='arrow-right-button'>
                                        <span>Подробнее</span>
                                        <i className='fas fa-long-arrow-alt-right' />
                                    </button>
                                </div>
                                <div>
                                    <img src={Banner} alt="" />
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className='service-details'>
                            <span>Бесплатная версия</span>
                            <span className='service-details-data'>{currentService.description.isFree ? 'Да' : 'Нет'}</span>
                            <span>Пробный период</span>
                            <span className='service-details-data'>{currentService.description.hasTrial ? 'Да' : 'Нет'}</span>
                            <span>Стоимость</span>
                            <span className='service-details-data'>{currentService.description.price}</span>
                            <span>Способ оплаты</span>
                            <span className='service-details-data'>{currentService.description.paymentMethod}</span>
                            <span>Дислокация</span>
                            <span className='service-details-data'>{currentService.description.locations?.map(i => i.name).join(', ')}</span>
                            <span>Платформа</span>
                            <span className='service-details-data'>{currentService.description.platforms?.map(i => i.name).join(', ')}</span>
                            <span>Партнерская программа</span>
                            <span className='service-details-data'>{currentService.description.hasPartnership ? 'Да' : 'Нет'}</span>
                        </div>
                    </div>
                    <a href='#' className='arrow-right-link'>
                        <span>Перейти в сервис</span>
                        <i className='fas fa-long-arrow-alt-right' />
                    </a>
                </div>
                <div>
                    <div className='service-images'>
                        {currentService.images.screenshots?.slice(0, 4).map(i => {
                            return <>
                                <div className='service-image-wrapper' onClick={() => setSelectedImageSource(i.source)} key={i.id}>
                                    <img src={i.source} alt="" />
                                </div>
                            </>
                        })}
                        {currentService.images.screenshots?.length === 0 && <div className='service-image-wrapper empty'>
                            <i className='fas fa-image' />
                        </div>}
                    </div>
                    <div className='service-page-categories'>
                        <ul className='categories-list'>
                            {currentService.categories_3.map(i => {

                                const categoriesQty = serviceState.filter(service => service.categories_3.find(category => category.id === i.id)).length

                                return <CategoryTag name={i.name} qty={categoriesQty} key={i.id} />
                            })}
                        </ul>
                    </div>
                </div>
            </div>
            <section>
                <div className='service-section-header-options'>
                    <div className='service-section-header-buttons'>
                        <button className={mode === 1 ? 'active' : null} onClick={() => setMode(1)}>
                            <p>Отзывы</p>
                            <span>30</span>
                        </button>
                        <button className={mode === 2 ? 'active' : null} onClick={() => setMode(2)}>
                            <p>Специалисты</p>
                            <span>30</span>
                        </button>
                    </div>
                    {mode === 1 && <div className='sort-selection'>
                        <span>Сортировать:</span>
                        <select className='color-blue'>
                            <option value="">по умолчанию</option>
                        </select>
                    </div>}
                </div>
                {mode === 1 && <>
                    <div className='section-header-container'>
                        <h2 className='section-main-title'>Отзывы</h2>
                        <button className='feedback-button' onClick={() => setShowFeedbackPopup(true)}>
                            <i className='far fa-edit' />
                            <span>Оставить отзыв</span>
                        </button>
                    </div>
                    {screenWidth > 576 && <div className='feedback-cards'>
                        {mockFeedbackData.map(i => {
                            return <FeedbackCardComponent comment={i} key={i.id} />
                        })}
                    </div>}
                    {screenWidth <= 576 && <div className='feedback-cards'>
                        {mockFeedbackData.slice(currentCard, currentCard + 1).map(i => {
                            const dataLength = mockFeedbackData.length
                            return <>
                                <FeedbackCardComponent comment={i} key={i.id} onTouchStart={handleTouchStart} onTouchMove={e => handleTouchMove(e, dataLength - 1)} />
                                <div className='cards-mobile-swipe-bar'>
                                    {[...new Array(dataLength)].map((_, idx) => {
                                        return <button className={i.id === idx + 1 ? 'cards-mobile-swipe-point active' : 'cards-mobile-swipe-point'} onClick={() => setCurrentCard(idx)} key={idx}></button>
                                    })}
                                </div>
                            </>
                        })}
                    </div>}
                </>}

                {mode === 2 && <>
                    <div className='section-header-container'>
                        <h2 className='section-main-title'>Специалисты по {currentService.name}</h2>
                    </div>
                    {screenWidth > 576 && <div className='service-specialists-cards'>
                        {mockSpecialists.map(specialist => {
                            return <SpecialistCardComponent specialist={specialist} key={specialist.id} />
                        })}
                    </div>}
                    {screenWidth <= 576 && <div className='service-specialists-cards'>
                        {mockSpecialists.slice(currentCard, currentCard + 1).map(specialist => {
                            const dataLength = mockSpecialists.length
                            return <>
                                <SpecialistCardComponent specialist={specialist} key={specialist.id} onTouchStart={handleTouchStart} onTouchMove={e => handleTouchMove(e, dataLength - 1)} />
                                <div className='cards-mobile-swipe-bar'>
                                    {[...new Array(dataLength)].map((_, idx) => {
                                        return <button className={specialist.id === idx + 1 ? 'cards-mobile-swipe-point active' : 'cards-mobile-swipe-point'} onClick={() => setCurrentCard(idx)} key={idx}></button>
                                    })}
                                </div>
                            </>
                        })}
                    </div>}
                </>}
            </section>
        </>}
    </>;
};

export default ServicePage;
