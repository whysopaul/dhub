import * as React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { RootStore } from '../../store';
import { useEffect, useState } from 'react';
import '../../static/css/services.css';
import ServiceRatingTag from './ServiceRatingTag';
import CategoryTag from '../categories/CategoryTag';
import Banner from '../../static/images/service_banner.webp'
import FeedbackCardComponent from '../feedback/FeedbackCardComponent';
import { TServicesData } from '../../actions/services/types';
import ServiceGallery from './ServiceGallery';
import { mockSpecialists } from '../../actions/specialists/specialists';
import SpecialistCardComponent from '../specialists/SpecialistCardComponent';
import GiveFeedbackPopup from '../feedback/GiveFeedbackPopup';
import ServiceEditPopup from './ServiceEditPopup';
import { useDispatch } from 'react-redux';
import { getService } from '../../actions/services/services';
import { feedbacksLength, getScreen } from '../utils';
import { userAddHistory, userShowLoginPopup } from '../../actions/auth/auth';
import Loading from '../global/Loading';

interface IServicePageProps {
}

const ServicePage: React.FunctionComponent<IServicePageProps> = (props) => {

    const { serviceId } = useParams()
    const authState = useSelector((state: RootStore) => state.auth.user)
    const serviceState = useSelector((state: RootStore) => state.services)
    const [currentService, setCurrentService] = useState<TServicesData>(null)
    const [editMode, setEditMode] = useState(false)

    const [openDiscounts, setOpenDiscounts] = useState(false)
    const [openScreenshots, setOpenScreenshots] = useState(false)
    const [openCategories, setOpenCategories] = useState(false)
    const [openSpecialistInfo, setOpenSpecialistInfo] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getService(parseInt(serviceId)))
    }, [, serviceState.services])

    useEffect(() => {
        if (serviceState.currentService?.id === parseInt(serviceId)) {
            setCurrentService(serviceState.currentService)
        }
    }, [, serviceState.currentService])

    useEffect(() => {
        if (authState) {
            dispatch(userAddHistory(authState.d_token, parseInt(serviceId)))
        }
    }, [])

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

    const navigate = useNavigate()

    if (currentService === null) return <>
        <Loading height={400} />
    </>

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
                                {authState?.is_admin && <button onClick={() => setEditMode(true)}>Редактировать</button>}
                                {currentService.discounts.find(d => d.is_promocode) && <div className='service-promocode'>
                                    <p>Промокод:</p>
                                    <span>{currentService.discounts.find(d => d.is_promocode).code}</span>
                                    <a title={currentService.discounts.find(d => d.is_promocode).description}>
                                        <i className='far fa-question-circle' />
                                    </a>
                                </div>}
                                {/* <span>{currentService.categories_3[0]?.name}</span> */}
                            </div>
                            <div className='service-rating-section'>
                                <ServiceRatingTag rating={currentService.rating} />
                                <div className='service-rating-divider' />
                                <div className='service-feedback-qty'>
                                    <i className='fas fa-star' />
                                    <span>{feedbacksLength(currentService.feedbacks.length)}</span>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <p>{currentService.description.text}</p>
                    </div>
                    <div className='service-more-info'>
                        {/* <div className='service-banner-wrapper'>
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
                        </div> */}
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
                        {screenWidth <= 576 && currentService.images.screenshots?.length > 0 && <div className='service-dropdown-container' onClick={() => setOpenScreenshots(!openScreenshots)}>
                            <div className='service-dropdown-header'>
                                <p>Скриншоты</p>
                                <i className={openScreenshots ? 'fas fa-arrow-down' : 'fas fa-arrow-right'} />
                            </div>
                            {openScreenshots && <div className='service-dropdown-content'>
                                <div className='service-images'>
                                    {currentService.images.screenshots.length > 0 && currentService.images.screenshots.slice(0, 4).map(i => {
                                        return <>
                                            <div className='service-image-wrapper' onClick={() => setSelectedImageSource(getScreen(i.link))} key={i.id}>
                                                <img src={getScreen(i.link)} alt="" />
                                            </div>
                                        </>
                                    })}
                                    {currentService.images.screenshots.length === 0 && <div className='service-image-wrapper empty'>
                                        <i className='fas fa-image' />
                                    </div>}
                                </div>
                            </div>}
                        </div>}
                        {currentService.discounts.length > 0 && <div className='service-dropdown-container'>
                            <div className='service-dropdown-header' onClick={() => setOpenDiscounts(!openDiscounts)}>
                                <p>Промокоды и скидки</p>
                                <i className={openDiscounts ? 'fas fa-arrow-down' : 'fas fa-arrow-right'} />
                            </div>
                            {openDiscounts && <div className='service-dropdown-content'>
                                {currentService.discounts.map(d => {
                                    if (d.is_promocode) {
                                        return <div key={d.id}>
                                            <div className='service-promocode'>
                                                {/* <i className='fas fa-tag' /> */}
                                                <p>Промокод:</p>
                                                <span>{d.code}</span>
                                            </div>
                                            <p>{d.description}</p>
                                        </div>
                                    }
                                    if (d.is_sale) {
                                        return <div key={d.id}>
                                            <p>Скидка:</p>
                                            <p>{d.description}</p>
                                        </div>
                                    }
                                })}
                            </div>}
                        </div>}
                        {screenWidth <= 576 && <div className='service-dropdown-container'>
                            <div className='service-dropdown-header' onClick={() => setOpenCategories(!openCategories)}>
                                <p>Категории</p>
                                <i className={openCategories ? 'fas fa-arrow-down' : 'fas fa-arrow-right'} />
                            </div>
                            {openCategories && <div className='service-dropdown-content'>
                                <div className='service-page-categories'>
                                    <ul className='categories-list'>
                                        {currentService.categories_3.map(i => {

                                            const categoriesQty = serviceState.services.filter(service => service.categories_3.find(category => category.id === i.id)).length

                                            return <CategoryTag name={i.name} qty={categoriesQty} onClick={() => navigate('/services?categories=' + i.id)} key={i.id} />
                                        })}
                                    </ul>
                                </div>
                            </div>}
                        </div>}
                        <div className='service-dropdown-container'>
                            <div className='service-dropdown-header' onClick={() => setOpenSpecialistInfo(!openSpecialistInfo)}>
                                <p>Специалист в этом сервисе?</p>
                                <i className={openSpecialistInfo ? 'fas fa-arrow-down' : 'fas fa-arrow-right'} />
                            </div>
                            {openSpecialistInfo && <div className='service-dropdown-content'>
                                <div>
                                    <p>Специалист в этом сервисе? Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae amet, a ipsa, non dolores culpa, delectus explicabo repellat quo laboriosam possimus vero ex! Quasi perferendis asperiores repellendus, animi nesciunt iure dolorem quis magnam blanditiis voluptates, placeat esse error est corrupti ut deleniti? Magnam eos, eligendi similique obcaecati harum laboriosam suscipit officiis fugit, molestias animi, adipisci quos excepturi? Quae maiores autem ipsum ratione doloremque illum necessitatibus, nesciunt voluptatum tempora odit ipsam, rerum quos distinctio veritatis corrupti fuga facilis optio deserunt laborum at delectus? Sit, iusto explicabo? Aperiam, blanditiis qui perspiciatis numquam molestiae voluptate, ullam distinctio eligendi dolorem, laboriosam magni vitae fuga.</p>
                                </div>
                            </div>}
                        </div>
                    </div>
                </div>

                {screenWidth > 576 && <div>
                    <div className='service-images'>
                        {currentService.images.screenshots.length > 0 && currentService.images.screenshots.slice(0, 4).map(i => {
                            return <>
                                <div className='service-image-wrapper' onClick={() => setSelectedImageSource(getScreen(i.link))} key={i.id}>
                                    <img src={getScreen(i.link)} alt="" />
                                </div>
                            </>
                        })}
                        {currentService.images.screenshots.length === 0 && <div className='service-image-wrapper empty'>
                            <i className='fas fa-image' />
                        </div>}
                    </div>
                    <div className='service-page-categories'>
                        <ul className='categories-list'>
                            {currentService.categories_3.map(i => {

                                const categoriesQty = serviceState.services.filter(service => service.categories_3.find(category => category.id === i.id)).length

                                return <CategoryTag name={i.name} qty={categoriesQty} onClick={() => navigate('/services?categories=' + i.id)} key={i.id} />
                            })}
                        </ul>
                    </div>
                </div>}

                <a href='#' className='arrow-right-link'>
                    <span>Перейти в сервис</span>
                    <i className='fas fa-long-arrow-alt-right' />
                </a>
            </div>
            <section>
                <div className='service-section-header-options'>
                    <div className='service-section-header-buttons'>
                        <button className={mode === 1 ? 'active' : null} onClick={() => setMode(1)}>
                            <p>Отзывы</p>
                            <span>{currentService.feedbacks.length}</span>
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
                        <button className='feedback-button' onClick={() => authState ? setShowFeedbackPopup(true) : dispatch(userShowLoginPopup())}>
                            <i className='far fa-edit' />
                            <span>Оставить отзыв</span>
                        </button>
                    </div>
                    {screenWidth > 576 && <div className='feedback-cards'>
                        {currentService.feedbacks.length > 0 && currentService.feedbacks.map(i => {
                            return <FeedbackCardComponent comment={i} key={i.id} />
                        })}
                    </div>}
                    {screenWidth <= 576 && <div className='feedback-cards'>
                        {currentService.feedbacks.length > 0 && currentService.feedbacks.slice(currentCard, currentCard + 1).map(i => {
                            const dataLength = currentService.feedbacks.length
                            return <>
                                <FeedbackCardComponent comment={i} key={i.id} onTouchStart={handleTouchStart} onTouchMove={e => handleTouchMove(e, dataLength - 1)} />
                                <div className='cards-mobile-swipe-bar'>
                                    {[...new Array(dataLength)].map((_, idx) => {
                                        return <button className={currentCard === idx ? 'cards-mobile-swipe-point active' : 'cards-mobile-swipe-point'} onClick={() => setCurrentCard(idx)} key={idx}></button>
                                    })}
                                </div>
                            </>
                        })}
                    </div>}
                    {currentService.feedbacks.length === 0 && <div className='feedback-no-feedbacks'>
                        <p>Отзывов пока нет. Оставьте отзыв первым!</p>
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
