import * as React from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { RootStore } from '../../store';
import { useEffect, useRef, useState } from 'react';
import '../../static/css/services.css';
import ServiceRatingTag from './ServiceRatingTag';
import CategoryTag from '../categories/CategoryTag';
// import Banner from '../../static/images/service_banner.webp'
import FeedbackCardComponent from '../feedback/FeedbackCardComponent';
import { TServicesData } from '../../actions/services/types';
import ServiceGallery from './ServiceGallery';
import SpecialistCardComponent from '../specialists/SpecialistCardComponent';
import GiveFeedbackPopup from '../feedback/GiveFeedbackPopup';
import ServiceEditPopup from './ServiceEditPopup';
import { useDispatch } from 'react-redux';
import { getService } from '../../actions/services/services';
import { feedbacksLength, getImage, sliceDescription } from '../utils';
import { userAddHistory, userShowLoginPopup } from '../../actions/auth/auth';
import { Helmet } from 'react-helmet-async';
import ServicePageMockup from './ServicePageMockup';
import HomeServicesComponent from '../home/HomeServicesComponent';
import HomeArticlesComponent from '../home/HomeArticlesComponent';

interface IServicePageProps {
}

const ServicePage: React.FunctionComponent<IServicePageProps> = (props) => {

    const { serviceId } = useParams()
    const authState = useSelector((state: RootStore) => state.auth.user)
    const serviceState = useSelector((state: RootStore) => state.services)
    const articleState = useSelector((state: RootStore) => state.articles.articles)
    const [currentService, setCurrentService] = useState<TServicesData>(null)
    const [editMode, setEditMode] = useState(false)

    const [showFullDescription, setShowFullDescription] = useState(false)

    const feedbacksRef = useRef<HTMLDivElement>(null)

    const [openDiscounts, setOpenDiscounts] = useState(false)
    const [openScreenshots, setOpenScreenshots] = useState(false)
    const [openCategories, setOpenCategories] = useState(false)
    // const [openSimilarServices, setOpenSimilarServices] = useState(false)
    const [openSpecialistInfo, setOpenSpecialistInfo] = useState(false)

    const dispatch = useDispatch()

    const { pathname } = useLocation()

    useEffect(() => {
        dispatch(getService(parseInt(serviceId)))
    }, [, serviceState.services, pathname])

    useEffect(() => {
        if (serviceState.currentService?.id === parseInt(serviceId)) {
            setCurrentService(sliceDescription(serviceState.currentService))
        }
    }, [, serviceState.currentService])

    useEffect(() => {
        if (authState) {
            dispatch(userAddHistory(authState.d_token, parseInt(serviceId)))
        }
    }, [])

    useEffect(() => {
        if (serviceState.services_simple_list.length > 0 && typeof serviceState.services_simple_list.find(s => s.id === parseInt(serviceId)) === 'undefined') {
            navigate('/', { replace: true })
        }
    }, [, serviceState.services_simple_list])

    const [selectedImageSource, setSelectedImageSource] = useState(null)

    // 1 - Отзывы
    // 2 - Специалисты
    // const [mode, setMode] = useState<number>(1)

    const [showFeedbackPopup, setShowFeedbackPopup] = useState(false)

    const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth)
    const [currentCard, setCurrentCard] = useState<number>(0)
    const [currentSpecialist, setCurrentSpecialist] = useState<number>(0)

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

    const handleTouchMove = (e: React.TouchEvent, currentItem: number, setCurrentItem: (_: number) => void, cardsQty: number) => {
        const touchDown = touchPosition

        if (touchDown === null) {
            return
        }

        const currentTouch = e.touches[0].clientX
        const diff = touchDown - currentTouch

        if (diff > 5) {
            if (currentItem + 1 > cardsQty) {
                return setCurrentItem(0)
            }
            return setCurrentItem(currentItem + 1)
        }

        if (diff < -5) {
            if (currentItem - 1 < 0) {
                return setCurrentItem(cardsQty)
            }
            return setCurrentItem(currentItem - 1)
        }

        setTouchPosition(null)
    }

    const navigate = useNavigate()

    const DESCRIPTION_SHORT_VALUE = screenWidth <= 576 ? 343 : 900

    if (currentService === null || currentService?.id !== parseInt(serviceId)) return <>
        <ServicePageMockup />
    </>

    return <>

        {selectedImageSource && <ServiceGallery service={currentService} source={selectedImageSource} onClose={() => setSelectedImageSource(null)} />}
        {showFeedbackPopup && <GiveFeedbackPopup service={currentService} onClose={() => setShowFeedbackPopup(false)} />}
        {editMode && <ServiceEditPopup service={currentService} onClose={() => setEditMode(false)} />}

        {currentService && <>
            <Helmet>
                <title>{currentService.name + ' | digital hub'}</title>
                <meta property='og:title' content={currentService.name + ' | digital hub'} />
                <meta property='og:image' content={currentService.images.logo} />
            </Helmet>

            <div itemScope itemType='https://schema.org/SoftwareApplication'>
                <div className='service-main-container'>
                    <div>
                        <div className='service-info'>
                            <div className='service-info-header'>
                                <div className='service-title-section'>
                                    <a href={currentService.link} target='_blank' rel='noopener noreferrer' title='Перейти в сервис'>
                                        <h1 className='section-main-title' itemProp='name'>{currentService.name}</h1>
                                        <i className='fas fa-external-link-alt' />
                                    </a>
                                    {authState?.is_admin && <button onClick={() => setEditMode(true)}>Редактировать</button>}
                                    {currentService.discounts.find(d => d.is_promocode) && <div className='service-promocode'>
                                        <p>Промокод:</p>
                                        <span>{currentService.discounts.find(d => d.is_promocode).code}</span>
                                        <a>
                                            <i className='far fa-question-circle' />
                                            <div className='service-promocode-dropdown'>
                                                <div>
                                                    {currentService.discounts.find(d => d.is_promocode).description}
                                                </div>
                                            </div>
                                        </a>
                                    </div>}
                                    {/* <span>{currentService.categories_3[0]?.name}</span> */}
                                </div>
                                <div className='service-rating-section' itemProp='aggregateRating' itemScope itemType='https://schema.org/AggregateRating'>
                                    <ServiceRatingTag rating={currentService.rating} itemProp='ratingValue' />
                                    <div className='service-rating-divider' />
                                    <div className='service-feedback-qty'>
                                        <i className='fas fa-star' />
                                        <button onClick={() => feedbacksRef.current.scrollIntoView({ behavior: 'smooth' })}>{currentService.feedbacks.length > 0 && <span itemProp='reviewCount'>{currentService.feedbacks.length}</span>}{feedbacksLength(currentService.feedbacks.length)}</button>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div className='service-description-text' itemProp='description'>
                                {currentService.description.text.length <= DESCRIPTION_SHORT_VALUE && currentService.description.text.split('\n').filter(p => p !== '').map((p, idx) => {
                                    return <p key={idx}>{p}</p>
                                })}
                                {currentService.description.text.length > DESCRIPTION_SHORT_VALUE && currentService.description.text.slice(0, showFullDescription ? undefined : DESCRIPTION_SHORT_VALUE).split('\n').filter(p => p !== '').map((p, idx) => {
                                    const shortenedParagraph = currentService.description.text.slice(0, DESCRIPTION_SHORT_VALUE).split('\n').filter(paragraph => paragraph !== '').length
                                    return <p key={idx} style={((shortenedParagraph === idx + 1) && !showFullDescription) ? { display: 'inline', marginRight: '8px', marginBottom: 0 } : {}}>{p + (((shortenedParagraph === idx + 1) && !showFullDescription) ? '...' : '')}</p>
                                })}
                                {currentService.description.text.length > DESCRIPTION_SHORT_VALUE && <button onClick={() => setShowFullDescription(!showFullDescription)}>{showFullDescription ? 'Свернуть' : 'Подробнее'}</button>}
                            </div>
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
                                <div className='service-details-row'>
                                    <span>Бесплатная версия</span>
                                    <span className='service-details-dashed-line' />
                                    <span className='service-details-data'>{currentService.description.isFree ? 'Да' : 'Нет'}</span>
                                </div>
                                <div className='service-details-row'>
                                    <span>Пробный период</span>
                                    <span className='service-details-dashed-line' />
                                    <span className='service-details-data'>{currentService.description.hasTrial ? 'Да' : 'Нет'}</span>
                                </div>
                                <div className='service-details-row'>
                                    <span>Стоимость</span>
                                    <span className='service-details-dashed-line' />
                                    <span className='service-details-data'>{currentService.description.price ? currentService.description.price : '–'}</span>
                                </div>
                                <div className='service-details-row'>
                                    <span>Способ оплаты</span>
                                    <span className='service-details-dashed-line' />
                                    <span className='service-details-data'>{currentService.description.paymentMethod ? currentService.description.paymentMethod : '–'}</span>
                                </div>
                                <div className='service-details-row'>
                                    <span>Дислокация</span>
                                    <span className='service-details-dashed-line' />
                                    <span className='service-details-data'>{currentService.description.locations?.length > 0 ? currentService.description.locations?.map(i => i.name).join(', ') : '–'}</span>
                                </div>
                                <div className='service-details-row'>
                                    <span>Платформа</span>
                                    <span className='service-details-dashed-line' />
                                    <span className='service-details-data' itemProp='operatingSystem'>{currentService.description.platforms?.length > 0 ? currentService.description.platforms?.map(i => i.name).join(', ') : '–'}</span>
                                </div>
                                <div className='service-details-row'>
                                    <span>Партнерская программа</span>
                                    <span className='service-details-dashed-line' />
                                    <span className='service-details-data'>{currentService.description.hasPartnership ? 'Да' : 'Нет'}</span>
                                </div>
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
                                                <div className='service-image-wrapper' onClick={() => setSelectedImageSource(getImage(i.link))} key={i.id}>
                                                    <img src={getImage(i.link)} alt={'Скриншот сервиса ' + currentService.name} itemProp='screenshot' />
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
                                                <div className='service-promocode'>
                                                    <p>Скидка:</p>
                                                </div>
                                                <p>{d.description}</p>
                                            </div>
                                        }
                                    })}
                                </div>}
                            </div>}
                            <div className='service-dropdown-container'>
                                <div className='service-dropdown-header' onClick={() => setOpenCategories(!openCategories)}>
                                    <p>Категории</p>
                                    <i className={openCategories ? 'fas fa-arrow-down' : 'fas fa-arrow-right'} />
                                </div>
                                {openCategories && <div className='service-dropdown-content'>
                                    <div className='service-page-categories'>
                                        <ul className='categories-list'>
                                            {currentService.categories_3?.map(i => {

                                                // const categoriesQty = serviceState.services.filter(service => service.categories_3?.find(category => category.id === i.id)).length

                                                return <CategoryTag name={i.name} qty={i.service_count} onClick={() => navigate('/services?categories=' + i.id)} hideServiceCount key={i.id} />
                                            })}
                                        </ul>
                                    </div>
                                </div>}
                            </div>
                            {/* <div className='service-dropdown-container'>
                            <div className='service-dropdown-header' onClick={() => setOpenSimilarServices(!openSimilarServices)}>
                                <p>Похожие сервисы</p>
                                <i className={openSimilarServices ? 'fas fa-arrow-down' : 'fas fa-arrow-right'} />
                            </div>
                            {openSimilarServices && <div className='service-dropdown-content'>
                                <div className='service-dropdown-similar-services'>
                                    {serviceState.services.filter(s => s.id !== currentService.id).filter(s => s.categories_3.some(c => currentService.categories_3.map(l_c => l_c.id).includes(c.id))).map(s => {
                                        return <Link to={'/service/' + s.id} className='service-dropdown-similar-service-link' title={s.name} key={s.id}>
                                            <div className='service-dropdown-similar-service-card'>
                                                <div className='service-dropdown-similar-service-card-logo'>
                                                    <img src={s.images.logo} alt={s.name} />
                                                </div>
                                                <p>{s.name}</p>
                                            </div>
                                        </Link>
                                    })}
                                </div>
                            </div>}
                        </div> */}
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
                        {screenWidth > 576 && <a href={currentService.link} target='_blank' rel='noopener noreferrer' className='arrow-right-link' itemProp='url'>
                            <span>Перейти в сервис</span>
                            <i className='fas fa-long-arrow-alt-right' />
                        </a>}
                    </div>

                    {screenWidth > 576 && <div>
                        <div className='service-images'>
                            {currentService.images.screenshots.length > 0 && currentService.images.screenshots.slice(0, 4).map(i => {
                                return <>
                                    <div className='service-image-wrapper' onClick={() => setSelectedImageSource(getImage(i.link))} key={i.id}>
                                        <img src={getImage(i.link)} alt={'Скриншот сервиса ' + currentService.name} itemProp='screenshot' />
                                    </div>
                                </>
                            })}
                            {currentService.images.screenshots.length === 0 && <div className='service-image-wrapper empty'>
                                <i className='fas fa-image' />
                            </div>}
                        </div>
                    </div>}

                    {screenWidth <= 576 && <a href={currentService.link} target='_blank' rel='noopener noreferrer' className='arrow-right-link' itemProp='url'>
                        <span>Перейти в сервис</span>
                        <i className='fas fa-long-arrow-alt-right' />
                    </a>}
                </div>
                <section>
                    {/* <div className='service-section-header-options'>
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
                </div> */}

                    <div className='section-header-container'>
                        <h2 className='section-main-title'>Специалисты по {currentService.name}</h2>
                        <button className='service-specialists-login-button' onClick={() => !authState ? dispatch(userShowLoginPopup()) : null}>
                            <i className='fas fa-sign-in-alt' />
                            <span>Стать специалистом</span>
                        </button>
                    </div>
                    {screenWidth > 576 && currentService.specialists?.length > 0 && <div className='service-specialists-cards'>
                        {currentService.specialists?.map(specialist => {
                            return <SpecialistCardComponent specialist={specialist} key={specialist.id} />
                        })}
                    </div>}
                    {screenWidth <= 576 && currentService.specialists?.length > 0 && <div className='service-specialists-cards'>
                        {currentService.specialists?.slice(currentSpecialist, currentSpecialist + 1).map(specialist => {
                            const dataLength = currentService.specialists?.length
                            return <>
                                <SpecialistCardComponent specialist={specialist} key={specialist.id} onTouchStart={handleTouchStart} onTouchMove={e => handleTouchMove(e, currentSpecialist, setCurrentSpecialist, dataLength - 1)} />
                                <div className='cards-mobile-swipe-bar'>
                                    {[...new Array(dataLength)].map((_, idx) => {
                                        return <button className={specialist.id === idx + 1 ? 'cards-mobile-swipe-point active' : 'cards-mobile-swipe-point'} onClick={() => setCurrentCard(idx)} key={idx}></button>
                                    })}
                                </div>
                            </>
                        })}
                    </div>}
                    {currentService.specialists?.length === 0 && <div className='service-specialists-no-specialists'>
                        <p>Пока никого нет. Станьте первым!</p>
                    </div>}

                    <div className='section-header-container' ref={feedbacksRef}>
                        <h2 className='section-main-title'>Отзывы</h2>
                        <button className='feedback-button' onClick={() => authState ? setShowFeedbackPopup(true) : dispatch(userShowLoginPopup())}>
                            <i className='far fa-edit' />
                            <span>Оставить отзыв</span>
                        </button>
                    </div>
                    {screenWidth > 576 && currentService.feedbacks?.length > 0 && <div className='feedback-cards'>
                        {currentService.feedbacks?.map(i => {
                            return <FeedbackCardComponent comment={i} key={i.id} />
                        })}
                    </div>}
                    {screenWidth <= 576 && currentService.feedbacks?.length > 0 && <div className='feedback-cards'>
                        {currentService.feedbacks?.slice(currentCard, currentCard + 1).map(i => {
                            const dataLength = currentService.feedbacks.length
                            return <>
                                <FeedbackCardComponent comment={i} key={i.id} onTouchStart={handleTouchStart} onTouchMove={e => handleTouchMove(e, currentCard, setCurrentCard, dataLength - 1)} />
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
                </section>
                <HomeServicesComponent title='Похожие сервисы' data={currentService.similar_services} qty={5} />
                <HomeArticlesComponent data={articleState} />
            </div>
        </>}
    </>;
};

export default ServicePage;
