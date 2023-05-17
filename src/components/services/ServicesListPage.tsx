import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootStore } from '../../store';
import CategoryTag from '../categories/CategoryTag';
import ServiceCardComponent from './ServiceCardComponent';
import Footer from '../global/Footer';
import { useState } from 'react';
import Header from '../global/Header';
import ServicesListHeader from './ServicesListHeader';

interface IServicesListPageProps {
}

const ServicesListPage: React.FunctionComponent<IServicesListPageProps> = (props) => {

    const rootState = useSelector((state: RootStore) => state)

    const [search, setSearch] = useState('')
    const searchCondition = rootState.services.services.filter(service => service.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()))

    const [numberOfServices] = useState(20)
    const [currentPage, setCurrentPage] = useState(1)
    const numberOfPages = new Array(Math.ceil(searchCondition.length / numberOfServices)).fill('').map((_, idx) => idx + 1)

    return <>
        <Header template={<ServicesListHeader value={search} setValue={setSearch} />} />
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
                <div className='services-list-pagination'>
                    {numberOfPages.map(number => {
                        return <button className={currentPage === number ? 'page-number-button active' : 'page-number-button'} onClick={() => setCurrentPage(number)}>{number}</button>
                    })}
                </div>
                <div className='services-list-cards-container'>
                    {searchCondition.slice(currentPage === 1 ? 0 : (currentPage - 1) * numberOfServices, currentPage * numberOfServices).map(service => {
                        return <ServiceCardComponent service={service} />
                    })}
                </div>
            </div>
        </div>
        <Footer />
    </>;
};

export default ServicesListPage;
