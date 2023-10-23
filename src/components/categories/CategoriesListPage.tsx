import * as React from 'react';
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootStore } from '../../store';
import CategoryTag from './CategoryTag';
// import { mockMainCategories } from '../../actions/categories/categories';
import '../../static/css/categories.less';
import { useNavigate } from 'react-router-dom';
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
    const [sortMode, setSortMode] = useState('alphabetic')

    useOnClickOutside(dropdownRef, () => setShowDropdown(false))

    const searchCondition = rootState.services.services_simple_list.filter(service => service.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()))

    return <>
        <div className='wide-search-container'>
            <h2 className='section-main-title mb-32'>Категории</h2>
            <form action='/services'>
                <input type='text' placeholder='Введите название сервиса' name='search' value={search} onChange={e => setSearch(e.target.value)} autoComplete='off' onFocus={() => setShowDropdown(true)} />
                <button type={search.trim().length > 0 ? 'submit' : 'button'} className='search-submit-button'><i className='fas fa-search color-blue' /></button>
            </form>
        </div>
        {search.length > 0 && showDropdown && <div className='services-list-dropdown-container' ref={dropdownRef}>
            <ul className='services-list-dropdown-list'>
                {searchCondition.length > 0 && searchCondition.map(service => {
                    return <li>
                        <button className='category-tag' onClick={() => navigate('/service/' + service.id)}>{service.name}</button>
                    </li>
                })}
                {searchCondition.length === 0 && <li className='services-list-dropdown-no-match'>Не найдено</li>}
            </ul>
        </div>}
        <div className='services-list-categories-container categories-section'>
            <p>Популярные категории:</p>
            <ul className='categories-list'>
                {rootState.categories.categories.filter(c => c.index === 2).sort((a, b) => b.service_count - a.service_count).slice(0, 16).map(popularCategory => {
                    return <CategoryTag name={popularCategory.name} qty={popularCategory.service_count} onClick={() => navigate('/services?categories=' + popularCategory.id)} key={popularCategory.id} />
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
            <div className='sort-selection'>
                <span>Сортировать:</span>
                <select className='color-blue' value={sortMode} onChange={e => setSortMode(e.target.value)}>
                    <option value='alphabetic'>по алфавиту</option>
                    <option value='popularity'>по популярности</option>
                </select>
            </div>
        </div>
        {mode === 1 && rootState.categories.categories.filter(category => category.index === 1 && !category.name.includes('\t')).sort((a, b) => {
            if (sortMode === 'alphabetic') {
                return a.name.localeCompare(b.name)
            }
            if (sortMode === 'popularity') {
                return rootState.categories.categories.filter(cat => cat.index === 2).filter(cat => cat.parent === b.id).length - rootState.categories.categories.filter(cat => cat.index === 2).filter(cat => cat.parent === a.id).length
            }
            return
        }).map(category => {
            return <>
                <div className='categories-list-main-category'>
                    <div className='categories-list-main-category-header'>
                        <h3>{category.name}</h3>
                        <span>{rootState.categories.categories.filter(cat => cat.index === 2).filter(cat => cat.parent === category.id).length}</span>
                    </div>
                    <div>
                        <ul className='categories-list'>
                            {rootState.categories.categories.filter(sub_category => sub_category.index === 2 && sub_category.parent === category.id).map(sub_category => {
                                // const qty = rootState.services.services.filter(service => service.categories_2.reduce((acc, value) => [...acc, value.id], []).includes(sub_category.id)).length
                                return <CategoryTag name={sub_category.name} qty={sub_category.service_count} onClick={() => navigate('/services?categories=' + sub_category.id)} key={sub_category.id} />
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
                        {rootState.categories.categories.filter(sub_category => sub_category.index === 2 && sub_category.parent === rootState.categories.categories.find(category => category.name.includes('Профессии')).id).map(sub_category => {
                            // const qty = rootState.services.services.filter(service => service.categories_2.reduce((acc, value) => [...acc, value.id], []).includes(sub_category.id)).length
                            return <CategoryTag name={sub_category.name} qty={sub_category.service_count} onClick={() => navigate('/services?categories=' + sub_category.id)} key={sub_category.id} />
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
                        {rootState.categories.categories.filter(sub_category => sub_category.index === 2 && sub_category.parent === rootState.categories.categories.find(category => category.name.includes('Сферы')).id).map(sub_category => {
                            // const qty = rootState.services.services.filter(service => service.categories_2.reduce((acc, value) => [...acc, value.id], []).includes(sub_category.id)).length
                            return <CategoryTag name={sub_category.name} qty={sub_category.service_count} onClick={() => navigate('/services?categories=' + sub_category.id)} key={sub_category.id} />
                        })}
                    </ul>
                </div>
            </div>
        </>}
    </>;
};

export default CategoriesListPage;
