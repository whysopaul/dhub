import * as React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootStore } from '../../store';
import { useEffect } from 'react';
import { getServicesData } from '../../actions/services/services';
import CategoryTag from '../categories/CategoryTag';
import HomeServicesComponent from './HomeServicesComponent';
import HomeArticlesComponent from './HomeArticlesComponent';
import FeedbackCardComponent from '../feedback/FeedbackCardComponent';
import Footer from '../global/Footer';
import Navigation from '../global/Navigation';

import '../../static/css/home.css';
import Logo from '../../static/images/logo.svg';
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
import Login from '../global/Login';
import AddServicePopup from './AddServicePopup';

interface IHomeProps {
}

const Home: React.FunctionComponent<IHomeProps> = (props) => {

    const dispatch = useDispatch()
    const serviceState = useSelector((state: RootStore) => state.services.services)
    const categoriesState = useSelector((state: RootStore) => state.categories.categories)

    useEffect(() => {
        dispatch(getServicesData())
        dispatch(getAllCategories())
    }, [])

    const randomCategories = (qty: number): number[] => {
        let resultArr: number[] = []
        for (let i = 0; i < qty; i++) {
            resultArr.push(Math.round(Math.random() * categoriesState.length))
        }
        return resultArr
    }

    return <>
        <div className='home-main-container'>
            <div className='home-wave-backdrop'>
                <img src={Wave} alt="" />
            </div>
            <div className='home-header'>
                <img src={Logo} alt='digital.hub' />
                <div className='home-header-navigation'>
                    <Navigation />
                </div>
                <Login />
            </div>

            <div className='home-welcome-container'>
                <div className='home-welcome-left-block'>
                    <h1>Агрегатор сервисов <br /> для <span>вашей продуктивности</span></h1>
                    <p>Рейтинги, обзоры, отзывы, минусы и плюсы сервисов для бизнеса в одном месте. Сравнивайте и внедряйте. И конечно, используйте промокоды на скидку.</p>
                    <div>
                        <button className='filled-blue-bg'>
                            <span>Подобрать сервис</span>
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
                        <ul>
                            {randomCategories(6).map(i => {

                                const categoryObj = categoriesState.find(category => category.id === i)
                                const servicesInCategory = serviceState.filter(service => service.categories.find(category => category.id === i)).length

                                return <CategoryTag name={categoryObj.name} qty={servicesInCategory} />
                            })}
                        </ul>
                    </div>
                    <div className='home-categories-right-block'>
                        <form>
                            <div className='home-categories-search-field'>
                                <input type='text' placeholder='Поиск' />
                                <i className='fas fa-search' />
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <HomeServicesComponent title='Новые сервисы' data={serviceState} qty={8} />

            <div className='home-banners-wrapper'>
                <div className='home-giftbox-container'>
                    <div className='home-banner-text-block'>
                        <p>Получите чек-лист по правильному подбору сервисов для работы</p>
                        <button className='banner-button'>
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
                        <button className='banner-button'>
                            <span>Регистрируйся</span>
                            <i className='fas fa-long-arrow-alt-right' />
                        </button>
                    </div>
                    <div>
                        <img src={Service} alt="" />
                    </div>
                </div>
            </div>

            <HomeServicesComponent title='Бесплатные сервисы' data={serviceState} qty={8} />

            <div className='home-feedback-container'>
                <div className='home-feedback-header'>
                    <h2>Отзывы клиентов</h2>
                    <Link to='/'>
                        <span>Смотреть все</span>
                        <i className='fas fa-long-arrow-alt-right' />
                    </Link>
                </div>
                <div className='home-feedback-cards'>
                    {mockFeedbackData.map(i => {
                        return <FeedbackCardComponent comment={i} />
                    })}
                </div>
            </div>

            <HomeServicesComponent title='Топ-сервисов' data={serviceState} qty={8} />

            <HomeArticlesComponent data={mockArtData} />

            <HomeServicesComponent title='Все сервисы' data={serviceState} qty={10} extended />

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
