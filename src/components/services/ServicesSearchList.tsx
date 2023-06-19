import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootStore } from '../../store';
import CategoryTag from '../categories/CategoryTag';
import ServiceCardComponent from './ServiceCardComponent';
import { useEffect, useRef, useState } from 'react';
import { TServicesData } from '../../actions/services/types';
import { TCategory } from '../../actions/categories/types';
import { useOnClickOutside } from '../utils/HandleClickOutside';

interface IServicesSearchListProps {
}

const ServicesSearchList: React.FunctionComponent<IServicesSearchListProps> = (props) => {

    const rootState = useSelector((state: RootStore) => state)

    const [search, setSearch] = useState('')
    const [isNotFree, setIsNotFree] = useState<boolean>(null)
    const [hasNoTrial, setHasNoTrial] = useState<boolean>(null)
    const [hasNoPartnership, setHasNoPartnership] = useState<boolean>(null)
    const [paymentMethod, setPaymentMethod] = useState<number>(null)
    const [searchCategories, setSearchCategories] = useState('')
    const [selectedCategories, setSelectedCategories] = useState<TCategory[]>([])
    const [showDropdown, setShowDropdown] = useState(false)
    const dropdownRef = useRef(null)

    useOnClickOutside(dropdownRef, () => setShowDropdown(false))

    const paymentMethodOne = ['по подписке', 'ежемесячно', 'ежегодно', 'посуточно', 'ежеквартально', 'месяц', 'ежедневно', 'еженедельно', 'поквартально', 'подписка', 'ежечасно', 'покупка баллов']
    const paymentMethodTwo = ['за действие', 'за время', 'комиссия', 'нефиксированная', 'нефикс', 'за услугу', 'за число кликов']
    const paymentMethodThree = ['разовая', 'покупка лицензии', 'за пакет', 'фиксированный']

    const [sortMode, setSortMode] = useState<string>(null)

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
        (selectedCategories.length > 0 ? service.categories_2.find(category => selectedCategories.map(cat => cat.id).includes(category.id)) || service.categories_3.find(category => selectedCategories.map(cat => cat.id).includes(category.id)) : true)
        &&
        (
            paymentMethod === 1 ? paymentMethodOne.some(p_m => service.description.paymentMethod.includes(p_m))
                :
                paymentMethod === 2 ? paymentMethodTwo.some(p_m => service.description.paymentMethod.includes(p_m))
                    :
                    paymentMethod === 3 ? paymentMethodThree.some(p_m => service.description.paymentMethod.includes(p_m))
                        : true
        )
    ).sort((a, b) => {
        if (sortMode === 'new') {
            return b.id - a.id
        }
        if (sortMode === 'top') {
            return b.rating - a.rating
        }
        return
    })

    const searchCategoriesCondition = rootState.categories.categories.filter(category => category.index === 3).filter(category => category.name.toLocaleLowerCase().includes(searchCategories.toLocaleLowerCase()))

    const toggleCategory = (category: TCategory) => {
        selectedCategories.map(cat => cat.id).includes(category.id)
            ? setSelectedCategories(selectedCategories.filter(cat => cat.id !== category.id))
            : setSelectedCategories([...selectedCategories, category])
    }

    // console.log([...new Set(rootState.services.services.map(s => s.description.paymentMethod))])

    const [numberOfServices] = useState(20)
    const [currentPage, setCurrentPage] = useState(1)
    const numberOfPages = new Array(Math.ceil(searchCondition.length / numberOfServices)).fill('').map((_, idx) => idx + 1)

    useEffect(() => {
        setSortMode('default')

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
            setSelectedCategories(urlParams.get('categories').split(',').map(category => Number(category)).map(category => rootState.categories.categories.find(cat => cat.id === category)))
        }
        if (urlParams.has('paymentMethod')) {
            setPaymentMethod(Number(urlParams.get('paymentMethod')))
        }
        if (urlParams.has('recent')) {
            setSortMode('new')
        }
        if (urlParams.has('rating') && urlParams.get('rating') === 'top') {
            setSortMode('top')
        }
    }, [])

    return <>
        <div className='services-list-header-container'>
            <div className='services-list-search-title'>
                <h3 className='section-main-title'>Найденные сервисы:</h3>
                <span className='services-list-services-number'>{searchCondition.length}</span>
            </div>
            {searchCondition.length > 0 && <div className='sort-selection'>
                <span>Сортировать:</span>
                <select className='color-blue' value={sortMode} onChange={e => setSortMode(e.target.value)}>
                    <option value='default'>по умолчанию</option>
                    <option value='new'>по новизне</option>
                    <option value='top'>по рейтингу</option>
                </select>
            </div>}
        </div>
        <div className='services-list-main-container'>
            <div className='services-list-filters-container'>
                <div className='wide-search-container'>
                    <p>Поиск по названию:</p>
                    <input type='text' placeholder='Введите название сервиса' value={search} onChange={e => setSearch(e.target.value)} autoComplete='off' />
                    <i className='fas fa-search color-blue' />
                </div>
                <div className='wide-search-container'>
                    <p>Поиск по категориям:</p>
                    <input type='text' placeholder='Введите название категории' value={searchCategories} onChange={e => setSearchCategories(e.target.value)} autoComplete='off' onFocus={() => setShowDropdown(true)} />
                    <i className='fas fa-plus color-blue' />
                    {showDropdown && <div className='services-list-dropdown-container' ref={dropdownRef}>
                        {searchCategories.length === 0 && <p>Популярные категории:</p>}
                        <ul className='services-list-dropdown-list'>
                            {searchCategories.length > 0 && searchCategoriesCondition.length > 0 && searchCategoriesCondition.map(category => {
                                return <CategoryTag name={category.name} qty={rootState.services.services.filter(service => service.categories_3.find(servicesCategory => servicesCategory.id === category.id)).length} onClick={() => toggleCategory(category)} checked={selectedCategories.map(cat => cat.id).includes(category.id)} key={category.id} />
                            })}
                            {searchCategories.length > 0 && searchCategoriesCondition.length === 0 && <li className='services-list-dropdown-no-match'>Не найдено</li>}
                            {searchCategories.length === 0 && <>
                                {rootState.categories.categories.map(category => {
                                    return {
                                        ...category,
                                        servicesInCategory: rootState.services.services.filter(service => service.categories_3.find(servicesCategory => servicesCategory.id === category.id)).length
                                    }
                                }).sort((a, b) => b.servicesInCategory - a.servicesInCategory).slice(0, 15).map(popularCategory => {
                                    return <CategoryTag name={popularCategory.name} qty={popularCategory.servicesInCategory} onClick={() => toggleCategory(popularCategory)} checked={selectedCategories.map(cat => cat.id).includes(popularCategory.id)} key={popularCategory.id} />
                                })}
                            </>}
                        </ul>
                    </div>}
                </div>
                {selectedCategories.length > 0 && <div className='services-list-selected-categories'>
                    {/* <p>Выбранные категории:</p> */}
                    <ul className='categories-list'>
                        {rootState.categories.categories.filter(category => selectedCategories.map(cat => cat.id).includes(category.id)).map(category => {
                            return <li>
                                <button className='category-tag' onClick={() => setSelectedCategories(selectedCategories.filter(cat => cat.id !== category.id))}>{category.name}<i className='fas fa-times' /></button>
                            </li>
                        })}
                    </ul>
                </div>}
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
                </div>
                <div className='services-list-options'>
                    <button className='services-list-reset-button' onClick={() => window.location.replace('/services')}>
                        <span>Сбросить все фильтры</span>
                        <i className='fas fa-times' />
                    </button>
                </div>
            </div>
            {searchCondition.length > 0 && <div className='services-list-cards-container'>
                {searchCondition.slice(currentPage === 1 ? 0 : (currentPage - 1) * numberOfServices, currentPage * numberOfServices).map(service => {
                    return <ServiceCardComponent service={service} key={service.id} />
                })}
            </div>}
            {searchCondition.length === 0 && <div className='services-list-not-found'><i className='fas fa-times' /><p>По запросу ничего не найдено</p></div>}
        </div>
        {searchCondition.length > 0 && numberOfPages.length > 1 && <div className='services-list-pagination'>
            {numberOfPages.map(number => {
                return <button className={currentPage === number ? 'page-number-button active' : 'page-number-button'} onClick={() => setCurrentPage(number)} key={number}>{number}</button>
            })}
        </div>}
    </>;
};

export default ServicesSearchList;
