import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootStore } from '../../store';
import CategoryTag from '../categories/CategoryTag';
import ServiceCardComponent from './ServiceCardComponent';
import Footer from '../global/Footer';
import styles from '../../static/css/Header.module.css';
import Navigation from '../global/Navigation';
import Login from '../global/Login';
import Logo from '../../static/images/logo_transparent.svg';
import { useState } from 'react';
import UserHeader from '../global/UserHeader';



interface IServicesListPageProps {
}

const ServicesListPage: React.FunctionComponent<IServicesListPageProps> = (props) => {

    const rootState = useSelector((state: RootStore) => state)

    const [search, setSearch] = useState('')

    return <>
        <header style={styles}>
            <div className={styles.wrapper}>
                <div className={styles.navbar}>
                    <img src={Logo} alt="" />
                    <div className={styles.navigation}>
                        <Navigation />
                    </div>
                    {!rootState.auth.user && <Login />}
                    {rootState.auth.user && <UserHeader />}
                </div>
                <div className='services-header-search-container'>
                    <input type='text' placeholder='Введите название сервиса' value={search} onChange={(e) => setSearch(e.target.value)} />
                    <i className='fas fa-search color-white' />
                </div>
            </div>
        </header>
        <div className='page-main-container'>
            <div className='services-list-categories-container'>
                <p>Популярные категории:</p>
                <ul className='categories-list'>
                    {rootState.categories.categories.map(category => {
                        return {
                            ...category,
                            servicesInCategory: rootState.services.services.filter(service => service.categories.find(servicesCategory => servicesCategory.id === category.id)).length
                        }
                    }).sort((a, b) => b.servicesInCategory - a.servicesInCategory).slice(0, 16).map(popularCategory => {
                        return <CategoryTag name={popularCategory.name} qty={popularCategory.servicesInCategory} />
                    })}
                </ul>
            </div>
            <div className='services-list-main-container'>
                <div className='services-list-header'>
                    <h2>Все сервисы</h2>
                    <div className='sort-selection'>
                        <span>Сортировать:</span>
                        <select className='color-blue'>
                            <option value="">по умолчанию</option>
                        </select>
                    </div>
                </div>
                <div className='services-list-cards-container'>
                    {rootState.services.services.filter(service => service.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())).map(service => {
                        return <ServiceCardComponent service={service} />
                    })}
                </div>
            </div>
        </div>
        <Footer />
    </>;
};

export default ServicesListPage;
