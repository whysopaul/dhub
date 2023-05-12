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
import Stars from '../../static/images/stars.webp';
import Subscribe from '../../static/images/subscribe.webp';
import Wave from '../../static/images/wave.svg';
import { mockartdata } from '../../actions/articles/articles';
import { mockFeedbackData } from '../../actions/feedback/feedback';
import { getAllCategories, mockCatData } from '../../actions/categories/categories';
import Login from '../global/Login';
import AddServicePopup from './AddServicePopup';

interface IHomeProps {
}

const Home: React.FunctionComponent<IHomeProps> = (props) => {

    const dispatch = useDispatch()
    const serviceState = useSelector((state: RootStore) => state.services.services)

    useEffect(() => {
        dispatch(getServicesData())
        dispatch(getAllCategories())
    }, [])

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
                            {mockCatData.map(i => {
                                return <CategoryTag name={i.name} qty={i.qty} />
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

            <HomeServicesComponent title='Топ-сервисов' data={serviceState} qty={8} />

            <div className='home-banners-wrapper'>
                <div className='home-giftbox-container'>
                    <div className='home-giftbox-text-block'>
                        <p>Получите чек-лист <br /> по правильному подбору <br /> сервисов для работы</p>
                        <button>
                            <span>Получить подарок</span>
                            <i className='fas fa-long-arrow-alt-right' />
                        </button>
                    </div>
                    <div className='home-giftbox-image'>
                        <img src={Giftbox} alt="" />
                    </div>
                    <div className='home-taskboard-image'>
                        <img src={Taskboard} alt="" />
                    </div>
                </div>
                <div>
                    <div>
                        <p>Специалист в каком-либо сервисе?</p>
                        <button>
                            <span>Регистрируйся</span>
                            <i className='fas fa-long-arrow-alt-right' />
                        </button>
                    </div>
                    <div>

                    </div>
                </div>
            </div>

            <HomeServicesComponent title='Бесплатные сервисы' data={serviceState} qty={8} />

            <div className='home-feedback-container'>
                <div className='home-feedback-header'>
                    <div>
                        <h2>Отзывы клиентов</h2>
                        <Link to='/'>
                            <span>Смотреть все</span>
                            <i className='fas fa-long-arrow-alt-right' />
                        </Link>
                    </div>
                    <img src={Stars} alt="" />
                </div>
                <div className='home-feedback-cards'>
                    {mockFeedbackData.map(i => {
                        return <FeedbackCardComponent comment={i} />
                    })}
                </div>
            </div>

            <HomeServicesComponent title='Новые сервисы' data={serviceState} qty={8} />

            {/* <HomeArticlesComponent data={mockartdata} /> */}

            <HomeServicesComponent title='Все сервисы' data={serviceState} qty={10} extended />

            <div className='home-subscription-wrapper'>
                <div className='home-subscription-container'>
                    <div>
                        <h2>Только полезная информация и не чаще чем раз в неделю</h2>
                        <p>Подписывайтесь на нашу рассылку</p>
                        <div className='home-subscription-buttons'>
                            <button id='vk'><i className='fab fa-vk' /><span>Вконтакте</span></button>
                            <button id='email'><i className='fas fa-envelope' /><span>Email</span></button>
                        </div>
                    </div>
                    <div>
                        <img src={Subscribe} alt="" />
                    </div>
                </div>
            </div>
        </div>

        <Footer />
    </>;
};

export default Home;
