import * as React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootStore } from '../../store';
import { useEffect, useState } from 'react';
import { getServicesData } from '../../actions/services/services';
import CategoryTag from '../categories/CategoryTag';
import HomeServicesComponent from './HomeServicesComponent';
import HomeArticlesComponent from './HomeArticlesComponent';
import FeedbackCardComponent from '../feedback/FeedbackCardComponent';
import Footer from '../global/Footer';

import '../../static/css/home.css';
import Welcome from '../../static/images/welcome.webp';
import Giftbox from '../../static/images/giftbox.webp';
import Taskboard from '../../static/images/taskboard.webp';
// import Stars from '../../static/images/stars.webp';
import Subscribe from '../../static/images/subscribe.webp';
import Wave from '../../static/images/wave.svg';
import Service from '../../static/images/service_banner.webp';
import { mockArtData } from '../../actions/articles/articles';
import { mockFeedbackData } from '../../actions/feedback/feedback';
import { getAllCategories } from '../../actions/categories/categories';
import AddServicePopup from './AddServicePopup';
import ServiceSelection from '../services/ServiceSelection';
import { closePopup, openPopup } from '../utils';
import Header from '../global/Header';

interface IHomeProps {
}

const Home: React.FunctionComponent<IHomeProps> = (props) => {

    const dispatch = useDispatch()
    const serviceState = useSelector((state: RootStore) => state.services)
    const categoriesState = useSelector((state: RootStore) => state.categories.categories)
    const authState = useSelector((state: RootStore) => state.auth.user)

    useEffect(() => {
        if (serviceState.services.length === 0 || categoriesState.length === 0) {
            dispatch(getServicesData())
            dispatch(getAllCategories())
        }
    }, [])

    const [showServiceSelection, setShowServiceSelection] = useState(false)

    // const randomCategories = (qty: number): number[] => {
    //     let resultArr: number[] = []
    //     for (let i = 0; i < qty; i++) {
    //         resultArr.push(Math.round(Math.random() * categoriesState?.length))
    //     }
    //     return resultArr
    // }

    const [search, setSearch] = useState('')

    return <>

        {serviceState.is_loading && <>
            <div className='backdrop-no-blur'></div>
            <div className='loader'></div>
        </>}

        {showServiceSelection && <ServiceSelection onClose={() => closePopup(setShowServiceSelection)} />}

        <Header root />

        <div className='home-wave-backdrop' style={{ backgroundImage: `url(${Wave})` }} />
        <div className='home-main-container'>
            <div className='home-welcome-container'>
                <div className='home-welcome-left-block'>
                    <h1>Агрегатор сервисов <br /> для <span>вашей продуктивности</span></h1>
                    <p>Рейтинги, обзоры, отзывы, минусы и плюсы сервисов для бизнеса в одном месте. Сравнивайте и внедряйте. И конечно, используйте промокоды на скидку.</p>
                    <div>
                        <button className='blue-shadow-button' onClick={() => openPopup(setShowServiceSelection)}>
                            <span>Найти сервис</span>
                            <i className='fas fa-long-arrow-alt-right' />
                        </button>
                        <AddServicePopup />
                    </div>
                </div>
                <div className='home-welcome-right-block'>
                    <img src={Welcome} alt='' />
                </div>
            </div>

            <div className='home-categories-container'>
                <p>Выберите категории:</p>
                <div>
                    <div className='home-categories-left-block'>
                        <ul className='categories-list'>
                            {categoriesState.length > 0 && categoriesState.slice(0, 5).map(i => {

                                // const categoryObj = categoriesState?.find(category => category.id === i)
                                const servicesInCategory = serviceState.services?.filter(service => service.categories.find(category => category.id === i.id)).length

                                return <CategoryTag name={i.name} qty={servicesInCategory} key={i.id} />
                            })}
                        </ul>
                    </div>
                    <div className='home-categories-right-block'>
                        <form action='/services'>
                            <div className='home-categories-search-field'>
                                <input type='text' name='search' placeholder='Поиск' value={search} onChange={e => setSearch(e.target.value)} />
                                <i className='fas fa-search' />
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <HomeServicesComponent title='Новые сервисы' data={serviceState.services} qty={8} />

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

            <HomeServicesComponent title='Бесплатные сервисы' data={serviceState.services} qty={8} />

            <div className='home-feedback-container'>
                <div className='home-feedback-header'>
                    <h2>Отзывы клиентов</h2>
                    <Link to='/feedback' className='arrow-right-link'>
                        <span>Смотреть все</span>
                        <i className='fas fa-long-arrow-alt-right' />
                    </Link>
                </div>
                <div className='home-feedback-cards'>
                    {mockFeedbackData.map(i => {
                        return <FeedbackCardComponent comment={i} key={i.id} />
                    })}
                </div>
            </div>

            <HomeServicesComponent title='Топ-сервисов' data={serviceState.services} qty={8} />

            <HomeArticlesComponent data={mockArtData} />

            <HomeServicesComponent title='Все сервисы' data={serviceState.services} qty={10} extended />

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
        </div>

        <Footer />
    </>;
};

export default Home;
