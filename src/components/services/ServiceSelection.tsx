import * as React from 'react';
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootStore } from '../../store';
import CategoryTag from '../categories/CategoryTag';
import CategoryTagInput from '../categories/CategoryTagInput';
import { TCategory } from '../../actions/categories/types';
import { useOnClickOutside } from '../utils/HandleClickOutside';

interface IServiceSelectionProps {
}

const ServiceSelection: React.FunctionComponent<IServiceSelectionProps> = (props) => {

    const rootState = useSelector((state: RootStore) => state)

    // const [showCategories, setShowCategories] = useState(16)

    const [search, setSearch] = useState('')
    const isFreeRef = useRef<HTMLInputElement>(null)
    const hasTrialRef = useRef<HTMLInputElement>(null)
    const hasPartnershipRef = useRef<HTMLInputElement>(null)
    // 1 - по подписке; 2 - за действие; 3 - разовая
    const [paymentMethod, setPaymentMethod] = useState<number>(null)
    const [searchCategories, setSearchCategories] = useState('')
    const [selectedCategories, setSelectedCategories] = useState<TCategory[]>([])
    const [showDropdown, setShowDropdown] = useState(false)
    const dropdownRef = useRef(null)

    useOnClickOutside(dropdownRef, () => setShowDropdown(false))

    const searchCategoriesCondition = rootState.categories.categories.filter(category => category.index === 3).filter(category => category.name.toLocaleLowerCase().includes(searchCategories.toLocaleLowerCase()))

    const toggleCategory = (category: TCategory) => {
        selectedCategories.map(cat => cat.id).includes(category.id)
            ? setSelectedCategories(selectedCategories.filter(cat => cat.id !== category.id))
            : setSelectedCategories([...selectedCategories, category])
    }

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        const urlParams = new URLSearchParams()

        if (search) {
            urlParams.append('search', search.trim())
        }

        if (isFreeRef.current.checked) {
            urlParams.append('isFree', 'true')
        }
        if (hasTrialRef.current.checked) {
            urlParams.append('hasTrial', 'true')
        }
        if (hasPartnershipRef.current.checked) {
            urlParams.append('hasPartnership', 'true')
        }

        if (paymentMethod) {
            urlParams.append('paymentMethod', paymentMethod.toString())
        }

        // let checkedCategories = document.querySelectorAll('input[type="checkbox"][name="category"]:checked')
        // let categoriesValues = Array.from(checkedCategories, category => category.getAttribute('value')).join(',')
        // if (checkedCategories.length > 0) {
        //     urlParams.append('categories', categoriesValues)
        // }

        if (selectedCategories.length > 0) {
            urlParams.append('categories', selectedCategories.map(cat => cat.id).join(','))
        }

        return window.location.replace('/results?' + urlParams)
    }

    return <>
        <div className='service-selection-container'>
            <form onSubmit={onSubmit}>
                <div className='service-selection-header'>
                    <h2 className='section-main-title'>Найти сервис</h2>
                    <p>Пожалуйста, заполните и выберете поля ниже. Это поможет нам найти для вас тот сервис, который вам нужен.</p>
                </div>
                <hr />
                <div className='categories-section wide-search-container'>
                    <p>Найти категорию:</p>
                    <input type='text' placeholder='Введите название категории' value={searchCategories} onChange={e => setSearchCategories(e.target.value)} autoComplete='off' onFocus={() => setShowDropdown(true)} />
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
                    <i className='fas fa-search color-blue' />
                    {selectedCategories.length > 0 && <>
                        <p>Выбранные категории:</p>
                        <ul className='categories-list'>
                            {selectedCategories.map(category => {
                                return <CategoryTag name={category.name} qty={rootState.services.services.filter(service => service.categories_3.find(servicesCategory => servicesCategory.id === category.id)).length} onClick={() => toggleCategory(category)} checked={true} key={category.id} />
                            })}
                        </ul>
                    </>}
                    {/* <div className='show-more-container'>
                        <button type='button' className='color-blue cursor-pointer' onClick={() => showCategories ? setShowCategories(undefined) : setShowCategories(16)}>
                            <span>{showCategories ? 'Показать все категории' : 'Скрыть все категории'}</span>
                            <i className={showCategories ? 'fas fa-chevron-down' : 'fas fa-chevron-up'} />
                        </button>
                    </div> */}
                </div>
                <hr />
                <div className='service-selection-advanced-inputs'>
                    <div>
                        <p>Функциональные особенности:</p>
                        <label><input type='checkbox' ref={isFreeRef} />Бесплатная версия</label>
                        <label><input type='checkbox' ref={hasTrialRef} />Пробный период</label>
                        <label><input type='checkbox' ref={hasPartnershipRef} />Партнёрская программа</label>
                    </div>
                    <div>
                        <p>Способ оплаты:</p>
                        <label><input type='radio' onChange={() => setPaymentMethod(1)} checked={paymentMethod === 1} />По подписке</label>
                        <label><input type='radio' onChange={() => setPaymentMethod(2)} checked={paymentMethod === 2} />За действие</label>
                        <label><input type='radio' onChange={() => setPaymentMethod(3)} checked={paymentMethod === 3} />Разовая</label>
                    </div>
                </div>
                <hr />
                <div className='wide-search-container'>
                    <p>Поиск по названию:</p>
                    <input type='text' name='search' placeholder='Введите название сервиса или его часть' value={search} onChange={e => setSearch(e.target.value)} autoComplete='off' />
                    <i className='fas fa-search color-blue' />
                </div>
                <div className='service-selection-buttons'>
                    <button type='submit' className='blue-shadow-button'>
                        <span>Найти сервис</span>
                        <i className='fas fa-long-arrow-alt-right' />
                    </button>
                    <button type='button' className='round-item-button'>
                        <div>
                            <i className='far fa-smile' />
                        </div>
                        <span>Обратиться за помощью</span>
                    </button>
                </div>
            </form>
        </div>
    </>;
};

export default ServiceSelection;
