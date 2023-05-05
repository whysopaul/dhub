import * as React from 'react';
import Logo from '../../static/images/logo.svg';
import Welcome from '../../static/images/welcome.webp'
import '../../static/css/home.css'
import { TServicesData } from '../../actions/services/types';
import ServicesHomeComponent from '../services/ServicesHomeComponent';
import { Link } from 'react-router-dom';

interface IHomeProps {
}

const Home: React.FunctionComponent<IHomeProps> = (props) => {

    // const mockdata: TServicesData[] = new Array(6).fill('').map((e, i) => { return { id: i, name: 'Boost Like ' + i + 1, description: { text: 'hehe' } } })

    const mockdata: TServicesData[] = [
        { id: 1, name: 'Boost Like', description: { text: 'hehe' } },
        { id: 2, name: 'Boost Like 2', description: { text: 'hehehe' } },
        { id: 3, name: 'Boost Like 3', description: { text: 'hehehehe' } },
        { id: 4, name: 'Boost Like 4', description: { text: 'hehehehe hehe' } },
        { id: 5, name: 'Boost Like 5', description: { text: 'hehehehe hehehe' } },
        { id: 6, name: 'Boost Like 6', description: { text: 'hehehehe hehehehe' } },
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
                    <h1>Агрегатор сервисов <br /> для вашей продуктивности</h1>
                    <p>Рейтинги, обзоры, отзывы, минусы и плюсы <br /> сервисов для бизнеса в одном месте. <br /> Сравнивайте и внедряйте. И конечно, <br /> используйте промокоды на скидку.</p>
                    <button>Подобрать сервис</button>
                    <button>Добавить сервис</button>
                </div>
                <div className='home-welcome-right-block'>
                    <img src={Welcome} alt='' />
                </div>
            </div>
            <div>
                <div>
                    <p>Выберите категории:</p>
                    <ul>
                        <li>CRM-СИСТЕМЫ</li>
                        <li>ОНЛАЙН-ЗАПИСЬ</li>
                        <li>ВИРТУАЛЬНАЯ АТС</li>
                        <li>ТЕНДЕРЫ</li>
                        <li>ИНТЕРНЕТ-ЭКВАЙРИНГ</li>
                        <li>МОНИТОРИНГ ЦЕН</li>
                    </ul>
                </div>
                <div>
                    <input type='text' placeholder='Поиск' />
                </div>
            </div>

            <ServicesHomeComponent title='Новые сервисы' data={mockdata} />

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

            <ServicesHomeComponent title='Бесплатные сервисы' data={mockdata} />
        </div>
    </>;
};

export default Home;
