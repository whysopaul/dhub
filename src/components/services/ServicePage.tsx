import * as React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootStore } from '../../store';
import { useEffect, useState } from 'react';
import '../../static/css/services.css';
import ServiceRatingTag from './ServiceRatingTag';
import CategoryTag from '../categories/CategoryTag';
import Banner from '../../static/images/service_banner.webp'
import { closePopup, createServiceLink, openPopup } from '../utils';
import { mockFeedbackData } from '../../actions/feedback/feedback';
import FeedbackCardComponent from '../feedback/FeedbackCardComponent';
import { TServicesData } from '../../actions/services/types';
import ServiceGallery from './ServiceGallery';
import { mockSpecialists } from '../../actions/specialists/specialists';
import SpecialistCardComponent from '../specialists/SpecialistCardComponent';
import GiveFeedbackPopup from '../feedback/GiveFeedbackPopup';

interface IServicePageProps {
}

const ServicePage: React.FunctionComponent<IServicePageProps> = (props) => {

    const { serviceName } = useParams()
    const serviceState = useSelector((state: RootStore) => state.services.services)
    const [currentService, setCurrentService] = useState<TServicesData>()

    useEffect(() => {
        setCurrentService(serviceState.find(i => createServiceLink(i.name) === serviceName))
    }, [, serviceState])

    const [selectedImageSource, setSelectedImageSource] = useState(null)

    // 1 - Отзывы
    // 2 - Специалисты
    const [mode, setMode] = useState<number>(1)

    const [showFeedbackPopup, setShowFeedbackPopup] = useState(false)

    return <>

        {selectedImageSource && <ServiceGallery service={currentService} source={selectedImageSource} onClose={() => { setSelectedImageSource(null); document.body.style.overflow = '' }} />}
        {showFeedbackPopup && <GiveFeedbackPopup service={currentService} onClose={() => closePopup(setShowFeedbackPopup)} />}

        {currentService && <>
            <div className='service-page-categories'>
                <ul className='categories-list'>
                    {currentService.categories.map(i => {

                        const categoriesQty = serviceState.filter(service => service.categories.find(category => category.id === i.id)).length

                        return <CategoryTag name={i.name} qty={categoriesQty} />
                    })}
                </ul>
            </div>
            <div className='service-main-container'>
                <div className='service-images'>
                    {currentService.images.screenshots?.slice(0, 4).map(i => {
                        return <>
                            <div className='service-image-wrapper' onClick={() => { setSelectedImageSource(i.source); document.body.style.overflow = 'hidden' }}>
                                <img src={i.source} alt="" />
                            </div>
                        </>
                    })}
                    {currentService.images.screenshots?.length === 0 && <p>Нет скриншотов для показа</p>}
                </div>
                <div className='service-info'>
                    <h1 className='section-main-title'>{currentService.name}</h1>
                    <span>{currentService.categories[0]?.name}</span>
                    <div className='service-rating-section'>
                        <ServiceRatingTag rating={currentService.rating} />
                    </div>
                    <hr />
                    <p>{currentService.description.text}</p>
                    <div className='service-banner-wrapper'>
                        <div className='service-banner-container'>
                            <div>
                                <h3>Специалист в этом сервисе?</h3>
                                <button className='arrow-right-button'>
                                    <span>Регистрируйся</span>
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
            </div>
            <section>
                <div className='service-section-header-options'>
                    <div className='service-section-header-buttons'>
                        <button className={mode === 1 && 'active'} onClick={() => setMode(1)}><p>Отзывы</p><span>30</span></button>
                        <button className={mode === 2 && 'active'} onClick={() => setMode(2)}><p>Специалисты</p><span>30</span></button>
                    </div>
                    <div className='sort-selection'>
                        <span>Сортировать:</span>
                        <select className='color-blue'>
                            <option value="">по умолчанию</option>
                        </select>
                    </div>
                </div>
                {mode === 1 && <>
                    <div className='service-section-header'>
                        <h2 className='section-main-title'>Отзывы</h2>
                        <button className='feedback-button' onClick={() => openPopup(setShowFeedbackPopup)}><i className='far fa-edit' /><span>Оставить отзыв</span></button>
                    </div>
                    <div className='service-feedback-cards'>
                        {mockFeedbackData.map(i => {
                            return <FeedbackCardComponent comment={i} />
                        })}
                    </div>
                </>}

                {mode === 2 && <>
                    <div className='service-section-header'>
                        <h2 className='section-main-title'>Специалисты по {currentService.name}</h2>
                    </div>
                    <div className='service-specialists-cards'>
                        {mockSpecialists.map(specialist => {
                            return <SpecialistCardComponent specialist={specialist} />
                        })}
                    </div>
                </>}
            </section>
        </>}
    </>;
};

export default ServicePage;
