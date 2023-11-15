import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootStore } from '../../store';
import { useEffect, useState } from 'react';
// import CategoryTag from '../categories/CategoryTag';
import HomeServicesComponent from './HomeServicesComponent';
import HomeArticlesComponent from './HomeArticlesComponent';
import FeedbackCardComponent from '../feedback/FeedbackCardComponent';
import Header from '../global/Header';
import Footer from '../global/Footer';
import AddServicePopup from './AddServicePopup';

import '../../static/css/home.css';
import Welcome from '../../static/images/welcome.webp';
import Giftbox from '../../static/images/giftbox.webp';
import Taskboard from '../../static/images/taskboard.webp';
import Subscribe from '../../static/images/subscribe.webp';
import Wave from '../../static/images/wave.svg';
import Service from '../../static/images/service_banner.webp';
import { useDispatch } from 'react-redux';
import { getMainPage } from '../../actions/services/services';

interface IHomeProps {
}

const Home: React.FunctionComponent<IHomeProps> = (props) => {

    const serviceState = useSelector((state: RootStore) => state.services)
    const articleState = useSelector((state: RootStore) => state.articles.articles)
    // const categoriesState = useSelector((state: RootStore) => state.categories.categories)
    // const authState = useSelector((state: RootStore) => state.auth.user)

    const dispatch = useDispatch()

    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getMainPage())
    }, [])

    const [showAddServicePopup, setShowAddServicePopup] = useState(false)

    // const [search, setSearch] = useState('')

    const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth)
    const [servicesQty, setServicesQty] = useState<number>(8)
    const [servicesQtyExtended, setServicesQtyExtended] = useState<number>(10)
    const [currentComment, setCurrentComment] = useState<number>(0)

    useEffect(() => {
        setScreenWidth(window.innerWidth)

        if (screenWidth <= 576) {
            setServicesQty(3)
            setServicesQtyExtended(3)
        } else {
            setServicesQty(8)
            setServicesQtyExtended(10)
        }

        const updateServicesQty = () => {
            setScreenWidth(window.innerWidth)

            if (screenWidth <= 576) {
                setServicesQty(3)
                setServicesQtyExtended(3)
            } else {
                setServicesQty(8)
                setServicesQtyExtended(10)
            }
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

    const handleTouchMove = (e: React.TouchEvent) => {
        const touchDown = touchPosition

        if (touchDown === null) {
            return
        }

        const currentTouch = e.touches[0].clientX
        const diff = touchDown - currentTouch

        if (diff > 5) {
            if (currentComment + 1 > 3) {
                return setCurrentComment(0)
            }
            return setCurrentComment(currentComment + 1)
        }

        if (diff < -5) {
            if (currentComment - 1 < 0) {
                return setCurrentComment(3)
            }
            return setCurrentComment(currentComment - 1)
        }

        setTouchPosition(null)
    }

    return <>

        {showAddServicePopup && <AddServicePopup onClose={() => setShowAddServicePopup(false)} />}

        <Header root />

        <div className='home-wave-backdrop' style={{ backgroundImage: `url(${Wave})` }} />
        <main className='home-main-container'>
            <div className='home-welcome-container'>
                <div className='home-welcome-left-block'>
                    <h1>Агрегатор сервисов <br /> для <span>вашей продуктивности</span></h1>
                    <p>Рейтинги, обзоры, отзывы, минусы и плюсы сервисов для бизнеса в одном месте. Сравнивайте и внедряйте. И конечно, используйте промокоды на скидку.</p>
                </div>
                <div className='home-welcome-right-block'>
                    <img src={Welcome} alt='' />
                </div>
                <div className='home-welcome-buttons'>
                    <button className='blue-shadow-button home-search-button' onClick={() => navigate('/services')}>
                        <span>Найти сервис</span>
                        <i className='fas fa-long-arrow-alt-right' />
                    </button>
                    <button className='round-item-button' onClick={() => setShowAddServicePopup(true)}>
                        <div>
                            <i className='fas fa-plus' />
                        </div>
                        <span>Добавить сервис</span>
                    </button>
                </div>
            </div>

            {/* <div className='home-categories-container'>
                <p>Выберите категории:</p>
                <div>
                    <div className='home-categories-left-block'>
                        <ul className='categories-list'>
                            {categoriesState.length > 0 && categoriesState.slice(0, 5).map(i => {

                                // const categoryObj = categoriesState?.find(category => category.id === i)
                                const servicesInCategory = serviceState.services?.filter(service => service.categories_3.find(category => category.id === i.id)).length

                                return <CategoryTag name={i.name} qty={servicesInCategory} onClick={() => window.location.replace('/results?categories=' + i.id)} key={i.id} />
                            })}
                        </ul>
                    </div>
                    <div className='home-categories-right-block'>
                        <form action='/results'>
                            <div className='home-categories-search-field'>
                                <input type='text' className={search.length > 0 ? 'home-categories-search-input active' : 'home-categories-search-input'} name='search' placeholder='Поиск' value={search} onChange={e => setSearch(e.target.value)} autoComplete='off' />
                                {search.length > 0 ? <button type='submit'>Найти</button> : <i className='fas fa-search' />}
                            </div>
                        </form>
                    </div>
                </div>
            </div> */}

            <HomeServicesComponent title='Новые сервисы' data={serviceState.main_page.new_services} qty={servicesQty} sortModeLink='new' />

            <div className='home-banners-wrapper'>
                <div className='home-giftbox-container'>
                    <div className='home-banner-text-block'>
                        <p>Получите чек-лист по правильному подбору сервисов для работы</p>
                        <button className='arrow-right-button'>
                            <span>Получить подарок</span>
                            <i className='fas fa-long-arrow-alt-right' />
                        </button>
                    </div>
                    <div>
                        <div className='home-giftbox-image'>
                            <img src={Giftbox} alt="" />
                        </div>
                        <div className='home-taskboard-image'>
                            <img src={Taskboard} alt="" />
                        </div>
                    </div>
                </div>
                <div className='home-specialist-banner-container'>
                    <div className='home-banner-text-block'>
                        <p>Специалист в каком-либо сервисе?</p>
                        <button className='arrow-right-button'>
                            <span>Подробнее</span>
                            <i className='fas fa-long-arrow-alt-right' />
                        </button>
                    </div>
                    <div>
                        <img src={Service} alt="" />
                    </div>
                </div>
            </div>

            <HomeServicesComponent title='Бесплатные сервисы' data={serviceState.main_page.free_services} qty={servicesQty} sortModeLink='free' />

            <div className='home-feedback-container'>
                <div className='home-feedback-header'>
                    <h2>Отзывы клиентов</h2>
                    <Link to='/feedback' className='arrow-right-link'>
                        <span>Смотреть все</span>
                        <i className='fas fa-long-arrow-alt-right' />
                    </Link>
                </div>
                {screenWidth > 576 && <div className='home-feedback-cards'>
                    {serviceState.main_page.feedbacks_data.slice(0, 4).map(i => {
                        return <FeedbackCardComponent comment={i} key={i.id} />
                    })}
                </div>}
                {screenWidth <= 576 && <div className='home-feedback-cards'>
                    {serviceState.main_page.feedbacks_data.slice(currentComment, currentComment + 1).map(i => {
                        return <>
                            <FeedbackCardComponent comment={i} key={i.id} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} />
                            <div className='home-feedback-swipe-bar'>
                                {[...new Array(4)].map((_, idx) => {
                                    return <button className={currentComment === idx ? 'home-feedback-swipe-point active' : 'home-feedback-swipe-point'} onClick={() => setCurrentComment(idx)} key={idx}></button>
                                })}
                            </div>
                        </>
                    })}
                </div>}
            </div>

            <HomeServicesComponent title='Топ-сервисов' data={serviceState.main_page.top_services} qty={servicesQty} sortModeLink='top' />

            <HomeArticlesComponent data={articleState} />

            <HomeServicesComponent title='Все сервисы' data={serviceState.main_page.all_services} qty={servicesQtyExtended} extended />

            <div className='home-subscription-wrapper'>
                <div className='home-subscription-container'>
                    <h2>Только полезная информация и не чаще чем раз в неделю</h2>
                    {/* <p>Подписывайтесь на нашу рассылку</p> */}
                    <div>
                        <img src={Subscribe} alt="" />
                    </div>
                    <div className='home-subscription-buttons'>
                        <button id='vk'><i className='fab fa-vk' /><span>Вконтакте</span></button>
                        <button id='email'><i className='fas fa-envelope' /><span>Email</span></button>
                    </div>
                </div>
            </div>
        </main>

        <Footer />
    </>;
};

export default Home;
