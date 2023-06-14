import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootStore } from '../../store';
import CategoryTag from '../categories/CategoryTag';
import ServiceCardComponent from './ServiceCardComponent';
import { useEffect, useState } from 'react';
import { TServicesData } from '../../actions/services/types';

interface IServicesSearchListProps {
}

const ServicesSearchList: React.FunctionComponent<IServicesSearchListProps> = (props) => {

    const rootState = useSelector((state: RootStore) => state)

    const [search, setSearch] = useState('')
    const [isNotFree, setIsNotFree] = useState<boolean>(null)
    const [hasNoTrial, setHasNoTrial] = useState<boolean>(null)
    const [hasNoPartnership, setHasNoPartnership] = useState<boolean>(null)
    const [paymentMethod, setPaymentMethod] = useState<number>(null)
    const [searchCategories, setSearchCategories] = useState<string>(null)

    const paymentMethodOne = ['по подписке', 'ежемесячно', 'ежегодно', 'посуточно', 'ежеквартально', 'месяц', 'ежедневно', 'еженедельно', 'поквартально', 'подписка', 'ежечасно', 'покупка баллов']
    const paymentMethodTwo = ['за действие', 'за время', 'комиссия', 'нефиксированная', 'нефикс', 'за услугу', 'за число кликов']
    const paymentMethodThree = ['разовая', 'покупка лицензии', 'за пакет', 'фиксированный']

    const searchCondition: TServicesData[] = rootState.services.services.map(service => {
        return {
            ...service,
            description: {
                ...service.description,
                paymentMethod: service.description.paymentMethod.includes('нефиксированный') ? 'нефикс' : service.description.paymentMethod
            }
        }
    }).filter(service =>
        service.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        &&
        service.description.isFree !== isNotFree
        &&
        service.description.hasTrial !== hasNoTrial
        &&
        service.description.hasPartnership !== hasNoPartnership
        &&
        (searchCategories ? service.categories_3.find(category => searchCategories?.split(',').map(c => Number(c)).indexOf(category.id) !== -1) : true)
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

    return <>
        <div className='section-header-container'>
            <div className='services-list-search-title'>
                <h3 className='section-main-title'>Найденные сервисы:</h3>
                <span className='services-list-services-number'>{searchCondition.length}</span>
            </div>
            <button className='services-list-reset-button' onClick={() => window.location.replace('/results')}>
                <span>Сбросить все фильтры</span>
                <i className='fas fa-times' />
            </button>
            {/* {searchCondition.length > 0 && <div className='sort-selection'>
                <span>Сортировать:</span>
                <select className='color-blue'>
                    <option value="">по умолчанию</option>
                </select>
            </div>} */}
        </div>
        <div className='wide-search-container'>
            <input type='text' placeholder='Введите название сервиса' name='search' value={search} onChange={e => setSearch(e.target.value)} autoComplete='off' />
            <i className='fas fa-search color-blue' />
        </div>
        <div className='service-selection-advanced-inputs'>
            <div>
                <p>Функциональные особенности:</p>
                <label><input type='checkbox' onChange={() => setIsNotFree(isNotFree === false ? null : false)} checked={isNotFree === false} />Бесплатная версия</label>
                <label><input type='checkbox' onChange={() => setHasNoTrial(hasNoTrial === false ? null : false)} checked={hasNoTrial === false} />Пробный период</label>
                <label><input type='checkbox' onChange={() => setHasNoPartnership(hasNoPartnership === false ? null : false)} checked={hasNoPartnership === false} />Партнёрская программа</label>
            </div>
            <div>
                <p>Способ оплаты:</p>
                <label><input type='radio' onChange={() => setPaymentMethod(1)} checked={paymentMethod === 1} />По подписке</label>
                <label><input type='radio' onChange={() => setPaymentMethod(2)} checked={paymentMethod === 2} />За действие</label>
                <label><input type='radio' onChange={() => setPaymentMethod(3)} checked={paymentMethod === 3} />Разовая</label>
            </div>
            {searchCategories && <div>
                <p>Выбранные категории:</p>
                <ul className='categories-list'>
                    {rootState.categories.categories.filter(category => searchCategories.split(',').map(cat => Number(cat)).indexOf(category.id) !== -1).map(category => {
                        return <li>
                            <button className='category-tag' onClick={() => setSearchCategories(searchCategories.split(',').map(cat => Number(cat)).filter(cat => cat !== category.id).map(cat => cat.toString()).join(','))}>{category.name}<i className='fas fa-times' /></button>
                        </li>
                    })}
                </ul>
            </div>}
            <button className='services-list-reset-button mobile' onClick={() => window.location.replace('/results')}>
                <span>Сбросить все фильтры</span>
                <i className='fas fa-times' />
            </button>
        </div>
        {searchCondition.length > 0 && <>
            {/* <div className='services-list-categories-container categories-section'>
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
                    {searchCondition.flatMap(service => service.categories).filter((categoryObject, idx, array) => idx === array.findIndex(i => i.id === categoryObject.id)).slice(0, 16).map(category => {
                        return <CategoryTag name={category.name} qty={rootState.services.services.filter(service => service.categories.find(servicesCategory => servicesCategory.id === category.id)).length} key={category.id} />
                    })}
                </ul>
            </div> */}
            {numberOfPages.length > 1 && <div className='services-list-pagination'>
                {numberOfPages.map(number => {
                    return <button className={currentPage === number ? 'page-number-button active' : 'page-number-button'} onClick={() => setCurrentPage(number)} key={number}>{number}</button>
                })}
            </div>}
            <div className='services-list-cards-container'>
                {searchCondition.slice(currentPage === 1 ? 0 : (currentPage - 1) * numberOfServices, currentPage * numberOfServices).map(service => {
                    return <ServiceCardComponent service={service} key={service.id} />
                })}
            </div>
        </>}

        {searchCondition.length === 0 && <div className='services-list-not-found'><i className='fas fa-times' /><p>По запросу ничего не найдено</p></div>}
    </>;
};

export default ServicesSearchList;
