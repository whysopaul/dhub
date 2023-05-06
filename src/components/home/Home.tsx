import * as React from 'react';
import Logo from '../../static/images/logo.svg';
import Welcome from '../../static/images/welcome.webp'
import '../../static/css/home.css';
import { Link } from 'react-router-dom';
import CategoryTag from '../categories/CategoryTag';
import HomeServicesComponent from './HomeServicesComponent';
import { useDispatch, useSelector } from 'react-redux';
import { RootStore } from '../../store';
import { useEffect } from 'react';
import { getServicesData } from '../../actions/services/services';

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

            <HomeServicesComponent title='Новые сервисы' data={serviceState} qty={5} />

            <div>
                <div>
                    <p>Получите чек-лист по правильному подбору сервисов для работы</p>
                    <button>Получить подарок</button>
                </div>
                <div>

                </div>
                <div>

                </div>
            </div>

            <HomeServicesComponent title='Бесплатные сервисы' data={serviceState} qty={5} />
        </div>
    </>;
};

export default Home;
