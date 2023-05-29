import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootStore } from '../../store';
import CategoryTag from '../categories/CategoryTag';
import ServiceCardComponent from './ServiceCardComponent';
import { useEffect, useState } from 'react';
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
    const [paymentMethod, setPaymentMethod] = useState<number>(null)
    const [searchCategories, setSearchCategories] = useState<string>(null)

    const paymentMethodOne = ['по подписке', 'ежемесячно', 'ежегодно', 'посуточно', 'ежеквартально', 'месяц', 'ежедневно', 'еженедельно', 'поквартально', 'подписка', 'ежечасно', 'покупка баллов']
    const paymentMethodTwo = ['за действие', 'за время', 'комиссия', 'нефиксированная', 'нефиксированный', 'за услугу', 'за число кликов']
    const paymentMethodThree = ['разовая', 'покупка лицензии', 'за пакет', 'фиксированный']

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
        &&
        (
            paymentMethod === 1 ? paymentMethodOne.some(p_m => service.description.paymentMethod.includes(p_m))
                :
                paymentMethod === 2 ? paymentMethodTwo.some(p_m => service.description.paymentMethod.includes(p_m))
                    :
                    paymentMethod === 3 ? paymentMethodThree.some(p_m => service.description.paymentMethod.includes(p_m))
                        : true
        )
    )

    // console.log([...new Set(rootState.services.services.map(s => s.description.paymentMethod))])

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
        if (urlParams.has('paymentMethod')) {
            setPaymentMethod(Number(urlParams.get('paymentMethod')))
        }
    }, [])

    const [showServiceSelection, setShowServiceSelection] = useState(false)

    return <>

        {showServiceSelection && <ServiceSelection onClose={() => closePopup(setShowServiceSelection)} />}

        <div className='wide-search-container'>
            <h2 className='section-main-title mb-32'>Сервисы</h2>
            <input type='text' placeholder='Введите название сервиса' value={search} onChange={e => setSearch(e.target.value)} />
            <i className='fas fa-search color-blue' />
        </div>
        {searchCondition.length > 0 && <>
            <div className='services-list-categories-container categories-section'>
                <p>Популярные категории:</p>
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
        </>}

        {searchCondition.length === 0 && <div className='services-list-not-found'><i className='fas fa-times' /><p>По запросу ничего не найдено</p></div>}
    </>;
};

export default ServicesListPage;
