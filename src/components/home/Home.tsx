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

import '../../static/css/home.css';
import Logo from '../../static/images/logo.svg';
import Welcome from '../../static/images/welcome.webp';
import Giftbox from '../../static/images/giftbox.webp';
import Taskboard from '../../static/images/taskboard.webp';
import Stars from '../../static/images/stars.webp'
import { mockartdata } from '../../actions/articles/articles';
import { mockFeedbackData } from '../../actions/feedback/feedback';
import { mockCatData } from '../../actions/categories/categories';
import Navigation from '../global/Navigation';

interface IHomeProps {
}

const Home: React.FunctionComponent<IHomeProps> = (props) => {

    const dispatch = useDispatch()
    const serviceState = useSelector((state: RootStore) => state.services.services)

    useEffect(() => {
        dispatch(getServicesData())
    }, [])

    return <>
        <div className='home-main-container'>
            <div className='home-header'>
                <img src={Logo} alt='digital.hub' />
                <div className='home-header-navigation'>
                    <Navigation />
                </div>
                <button>Войти в аккаунт</button>
            </div>
            <div className='home-welcome-container'>
                <div className='home-welcome-left-block'>
                    <h1>Агрегатор сервисов <br /> для <span>вашей продуктивности</span></h1>
                    <p>Рейтинги, обзоры, отзывы, минусы и плюсы <br /> сервисов для бизнеса в одном месте. <br /> Сравнивайте и внедряйте. И конечно, <br /> используйте промокоды на скидку.</p>
                    <button>
                        <span>Подобрать сервис</span>
                        <i className='fas fa-long-arrow-alt-right' />
                    </button>
                    <button>
                        <i className='fas fa-plus' />
                        <span>Добавить сервис</span>
                    </button>
                </div>
                <div className='home-welcome-right-block'>
                    <img src={Welcome} alt='' />
                </div>
            </div>
            <div className='home-categories-container'>
                <div className='home-categories-left-block'>
                    <p>Выберите категории:</p>
                    <ul>
                        {mockCatData.map(i => {
                            return <CategoryTag name={i.name} qty={i.qty} />
                        })}
                    </ul>
                </div>
                <div className='home-categories-right-block'>
                    <div className='home-categories-search-field'>
                        <input type='text' placeholder='Поиск' />
                        <i className='fas fa-search' />
                    </div>
                </div>
            </div>

            <HomeServicesComponent title='Новые сервисы' data={serviceState} qty={5} />

            <div className='home-giftbox-container'>
                <div className='home-giftbox-text-block'>
                    <p>Получите чек-лист по правильному подбору сервисов для работы</p>
                    <button>Получить подарок</button>
                </div>
                <div className='home-giftbox-image'>
                    <img src={Giftbox} alt="" />
                </div>
                <div className='home-taskboard-image'>
                    <img src={Taskboard} alt="" />
                </div>
            </div>

            <HomeServicesComponent title='Бесплатные сервисы' data={serviceState} qty={5} />

            <div className='home-feedback-container'>
                <div className='home-feedback-header'>
                    <div>
                        <h2>Отзывы клиентов</h2>
                        <Link to='/'>
                            <span>Все отзывы</span>
                            <i className='fas fa-long-arrow-alt-right' />
                        </Link>
                    </div>
                    <div>
                        <img src={Stars} alt="" />
                    </div>
                </div>
                <div className='home-feedback-cards'>
                    {mockFeedbackData.map(i => {
                        return <FeedbackCardComponent comment={i} />
                    })}
                </div>
            </div>

            <HomeServicesComponent title='Топ-сервисов' data={serviceState} qty={5} />

            <hr />

            <HomeArticlesComponent data={mockartdata} />

            <hr />

            <HomeServicesComponent title='Все сервисы' data={serviceState} qty={8} extended />

            <div>
                <div>
                    <h2>Только полезная информация и не чаще чем раз в неделю</h2>
                    <p>Подписывайтесь на нашу рассылку</p>
                    <button><i className='fab fa-vk' /><span>Вконтакте</span></button>
                    <button><i className='fas fa-envelope' /><span>Email</span></button>
                </div>
                <div>

                </div>
            </div>

            <Footer />
        </div>
    </>;
};

export default Home;
