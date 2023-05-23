import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootStore } from '../../store';
import CategoryTag from '../categories/CategoryTag';
import ServiceCardComponent from './ServiceCardComponent';
import Footer from '../global/Footer';
import { useEffect, useState } from 'react';
import Header from '../global/Header';
import ServiceSelection from './ServiceSelection';
import { closePopup, openPopup } from '../utils';

interface IServicesListPageProps {
}

const ServicesListPage: React.FunctionComponent<IServicesListPageProps> = (props) => {

    const rootState = useSelector((state: RootStore) => state)

    const [search, setSearch] = useState('')
    const [isNotFree, setIsNotFree] = useState<boolean>(null)
    const [hasNoTrial, setHasNoTrial] = useState<boolean>(null)
    const [hasNoPartnership, setHasNoPartnership] = useState<boolean>(null)
    const [searchCategories, setSearchCategories] = useState<string>(null)

    const searchCondition = rootState.services.services.filter(service =>
        service.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        &&
        service.description.isFree !== isNotFree
        &&
        service.description.hasTrial !== hasNoTrial
        &&
        service.description.hasPartnership !== hasNoPartnership
        &&
        service.categories.find(category => searchCategories?.split(',').map(c => Number(c)).indexOf(category.id) !== -1)
    )

    const [numberOfServices] = useState(20)
    const [currentPage, setCurrentPage] = useState(1)
    const numberOfPages = new Array(Math.ceil(searchCondition.length / numberOfServices)).fill('').map((_, idx) => idx + 1)

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search)
        if (urlParams.has('search')) {
            setSearch(urlParams.get('search'))
        }
        if (urlParams.has('isFree')) {
            setIsNotFree(false)
        }
        if (urlParams.has('hasTrial')) {
            setHasNoTrial(false)
        }
        if (urlParams.has('hasPartnership')) {
            setHasNoPartnership(false)
        }
        if (urlParams.has('categories')) {
            setSearchCategories(urlParams.get('categories'))
        }
    }, [])

    const [showServiceSelection, setShowServiceSelection] = useState(false)

    return <>

        {showServiceSelection && <ServiceSelection onClose={() => closePopup(setShowServiceSelection)} />}

        <Header />
        <div className='page-main-container'>
            <div className='services-list-search-container'>
                <input type='text' placeholder='Введите название сервиса' value={search} onChange={e => setSearch(e.target.value)} />
                <div>
                    <i className='fas fa-search color-blue' />
                    <button className='services-list-search-settings' onClick={() => openPopup(setShowServiceSelection)}><i className='fas fa-sliders-h color-blue' /></button>
                </div>
            </div>
            <div className='services-list-categories-container'>
                <p>Категории:</p>
                <ul className='categories-list'>
                    {/* {rootState.categories.categories.map(category => {
                        return {
                            ...category,
                            servicesInCategory: rootState.services.services.filter(service => service.categories.find(servicesCategory => servicesCategory.id === category.id)).length
                        }
                    }).sort((a, b) => b.servicesInCategory - a.servicesInCategory).slice(0, 16).map(popularCategory => {
                        return <CategoryTag name={popularCategory.name} qty={popularCategory.servicesInCategory} />
                    })} */}
                    {searchCondition.flatMap(service => service.categories).filter((categoryObject, idx, array) => idx === array.findIndex(i => i.id === categoryObject.id)).slice(0, 16).map(category => {
                        return <CategoryTag name={category.name} qty={rootState.services.services.filter(service => service.categories.find(servicesCategory => servicesCategory.id === category.id)).length} />
                    })}
                </ul>
            </div>
            <div className='services-list-main-container'>
                <div className='services-list-title'>
                    <h2 className='section-main-title'>Все сервисы</h2>
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
