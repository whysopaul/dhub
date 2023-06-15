import * as React from 'react';
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootStore } from '../../store';
import CategoryTag from './CategoryTag';
// import { mockMainCategories } from '../../actions/categories/categories';
import '../../static/css/categories.less';
import { useNavigate } from 'react-router-dom';
import { createServiceLink } from '../utils';
import { useOnClickOutside } from '../utils/HandleClickOutside';

interface ICategoriesListPageProps {
}

const CategoriesListPage: React.FunctionComponent<ICategoriesListPageProps> = (props) => {

    const rootState = useSelector((state: RootStore) => state)

    const navigate = useNavigate()

    const [search, setSearch] = useState('')
    const [mode, setMode] = useState(1)
    const [showDropdown, setShowDropdown] = useState(false)
    const dropdownRef = useRef(null)

    useOnClickOutside(dropdownRef, () => setShowDropdown(false))

    const searchCondition = rootState.services.services.filter(service => service.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()))

    return <>
        <div className='wide-search-container'>
            <h2 className='section-main-title mb-32'>Сервисы</h2>
            <form action='/results'>
                <input type='text' placeholder='Введите название сервиса' name='search' value={search} onChange={e => setSearch(e.target.value)} autoComplete='off' onFocus={() => setShowDropdown(true)} />
                <button type={search.trim().length > 0 ? 'submit' : 'button'} className='search-submit-button'><i className='fas fa-search color-blue' /></button>
            </form>
        </div>
        {search.length > 0 && showDropdown && <div className='services-list-dropdown-container' ref={dropdownRef}>
            <ul className='services-list-dropdown-list'>
                {searchCondition.length > 0 && searchCondition.map(service => {
                    return <li>
                        <button className='category-tag' onClick={() => navigate('/service/' + createServiceLink(service.name))}>{service.name}</button>
                    </li>
                })}
                {searchCondition.length === 0 && <li className='services-list-dropdown-no-match'>Не найдено</li>}
            </ul>
        </div>}
        <div className='services-list-categories-container categories-section'>
            <p>Популярные категории:</p>
            <ul className='categories-list'>
                {rootState.categories.categories.map(category => {
                    return {
                        ...category,
                        servicesInCategory: rootState.services.services.filter(service => service.categories_3.find(servicesCategory => servicesCategory.id === category.id)).length
                    }
                }).sort((a, b) => b.servicesInCategory - a.servicesInCategory).slice(0, 16).map(popularCategory => {
                    return <CategoryTag name={popularCategory.name} qty={popularCategory.servicesInCategory} onClick={() => navigate('/results?categories=' + popularCategory.id)} key={popularCategory.id} />
                })}
            </ul>
        </div>
        <div className='categories-list-modes'>
            <label>
                <input type='radio' name='category-type' checked={mode === 1} onChange={() => setMode(1)} />
                <span>Все категории</span>
            </label>
            <label>
                <input type='radio' name='category-type' checked={mode === 2} onChange={() => setMode(2)} />
                <span>По профессиям</span>
            </label>
            <label>
                <input type='radio' name='category-type' checked={mode === 3} onChange={() => setMode(3)} />
                <span>По сферам</span>
            </label>
        </div>
        {mode === 1 && rootState.categories.categories.filter(category => category.index === 1 && !category.name.includes('\t')).map(category => {
            return <>
                <div className='categories-list-main-category'>
                    <div className='categories-list-main-category-header'>
                        <h3>{category.name}</h3>
                        {/* <span>{category.subcategories.length}</span> */}
                    </div>
                    <div>
                        <ul className='categories-list'>
                            {rootState.categories.categories.filter(sub_category => sub_category.index === 2 && sub_category.parent.id === category.id).map(sub_category => {
                                const qty = rootState.services.services.filter(service => service.categories_2.reduce((acc, value) => [...acc, value.id], []).includes(sub_category.id)).length
                                return <CategoryTag name={sub_category.name} qty={qty} onClick={() => navigate('/results?categories=' + rootState.categories.categories.filter(cat => cat.index === 3).find(cat => cat.name.includes(sub_category.name)).id)} key={sub_category.id} />
                            })}
                        </ul>
                    </div>
                    <hr />
                </div>
            </>
        })}
        {mode === 2 && <>
            <div className='categories-list-main-category'>
                <div className='categories-list-main-category-header'>
                    <h3>Профессии</h3>
                    {/* <span>{category.subcategories.length}</span> */}
                </div>
                <div>
                    <ul className='categories-list'>
                        {rootState.categories.categories.filter(sub_category => sub_category.index === 2 && sub_category.parent.id === rootState.categories.categories.find(category => category.name.includes('Профессии')).id).map(sub_category => {
                            const qty = rootState.services.services.filter(service => service.categories_2.reduce((acc, value) => [...acc, value.id], []).includes(sub_category.id)).length
                            return <CategoryTag name={sub_category.name} qty={qty} />
                        })}
                    </ul>
                </div>
            </div>
        </>}
        {mode === 3 && <>
            <div className='categories-list-main-category'>
                <div className='categories-list-main-category-header'>
                    <h3>Сферы</h3>
                    {/* <span>{category.subcategories.length}</span> */}
                </div>
                <div>
                    <ul className='categories-list'>
                        {rootState.categories.categories.filter(sub_category => sub_category.index === 2 && sub_category.parent.id === rootState.categories.categories.find(category => category.name.includes('Сферы')).id).map(sub_category => {
                            const qty = rootState.services.services.filter(service => service.categories_2.reduce((acc, value) => [...acc, value.id], []).includes(sub_category.id)).length
                            return <CategoryTag name={sub_category.name} qty={qty} />
                        })}
                    </ul>
                </div>
            </div>
        </>}
    </>;
};

export default CategoriesListPage;
