import * as React from 'react';
import { Link } from 'react-router-dom';
import CategoryTag from '../categories/CategoryTag';
import HomeSectionComponent from './HomeSectionComponent';
import { useDispatch, useSelector } from 'react-redux';
import { RootStore } from '../../store';
import { useEffect } from 'react';
import { getServicesData } from '../../actions/services/services';

import Logo from '../../static/images/logo.svg';
import Welcome from '../../static/images/welcome.webp';
import Giftbox from '../../static/images/c0e0b231072cd62fc15e0b39bed8cdfa.webp';
import Taskboard from '../../static/images/1e6dc89870c0d6dd10b08d4db931cb5c.webp';
import Stars from '../../static/images/5afe3ba186f624a3212d20ed15861221.webp'
import '../../static/css/home.css';
import { mockartdata } from '../../actions/articles/articles';

interface IHomeProps {
}

const Home: React.FunctionComponent<IHomeProps> = (props) => {

    const dispatch = useDispatch()
    const serviceState = useSelector((state: RootStore) => state.services.services)

    useEffect(() => {
        dispatch(getServicesData())
    }, [])

    const mockcatdata: { name: string, qty: number }[] = [
        { name: 'CRM-СИСТЕМЫ', qty: 43 },
        { name: 'ОНЛАЙН-ЗАПИСЬ', qty: 2 },
        { name: 'ВИРТУАЛЬНАЯ АТС', qty: 13 },
        { name: 'ТЕНДЕРЫ', qty: 30 },
        { name: 'ИНТЕРНЕТ-ЭКВАЙРИНГ', qty: 30 },
        { name: 'МОНИТОРИНГ ЦЕН', qty: 30 },
    ]

    return <>
        <div className='home-main-container'>
            <div className='home-header'>
                <img src={Logo} alt='digital.hub' />
                <div className='home-header-navigation'>
                    <Link to='/'>Сервисы</Link>
                    <Link to='/'>Отзывы</Link>
                    <Link to='/'>Статьи и обзоры</Link>
                </div>
                <button>Войти в аккаунт</button>
            </div>
            <div className='home-welcome-container'>
                <div className='home-welcome-left-block'>
                    <h1>Агрегатор сервисов <br /> для <span>вашей продуктивности</span></h1>
                    <p>Рейтинги, обзоры, отзывы, минусы и плюсы <br /> сервисов для бизнеса в одном месте. <br /> Сравнивайте и внедряйте. И конечно, <br /> используйте промокоды на скидку.</p>
                    <button>Подобрать сервис</button>
                    <button>Добавить сервис</button>
                </div>
                <div className='home-welcome-right-block'>
                    <img src={Welcome} alt='' />
                </div>
            </div>
            <div className='home-categories-container'>
                <div className='home-categories-left-block'>
                    <p>Выберите категории:</p>
                    <ul>
                        {mockcatdata.map(i => {
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

            <HomeSectionComponent title='Новые сервисы' data={serviceState} qty={5} type='Services' />

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

            <HomeSectionComponent title='Бесплатные сервисы' data={serviceState} qty={5} type='Services' />

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

                </div>
            </div>

            <HomeSectionComponent title='Топ-сервисов' data={serviceState} qty={5} type='Services' />

            <hr />

            <HomeSectionComponent title='Статьи и обзоры' data={mockartdata} qty={5} type='Articles' />
        </div>
    </>;
};

export default Home;
