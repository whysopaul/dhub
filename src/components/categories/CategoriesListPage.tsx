import * as React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootStore } from '../../store';
import CategoryTag from './CategoryTag';
import { mockMainCategories } from '../../actions/categories/categories';
import '../../static/css/categories.less';

interface ICategoriesListPageProps {
}

const CategoriesListPage: React.FunctionComponent<ICategoriesListPageProps> = (props) => {

    const rootState = useSelector((state: RootStore) => state)

    const [search, setSearch] = useState('')
    const [mode, setMode] = useState(1)

    return <>
        <div className='wide-search-container'>
            <h2 className='section-main-title mb-32'>Сервисы</h2>
            <input type='text' placeholder='Введите название сервиса' value={search} onChange={e => setSearch(e.target.value)} />
            <i className='fas fa-search color-blue' />
        </div>
        <div className='services-list-categories-container categories-section'>
            <p>Популярные категории:</p>
            <ul className='categories-list'>
                {rootState.categories.categories.map(category => {
                    return {
                        ...category,
                        servicesInCategory: rootState.services.services.filter(service => service.categories.find(servicesCategory => servicesCategory.id === category.id)).length
                    }
                }).sort((a, b) => b.servicesInCategory - a.servicesInCategory).slice(0, 16).map(popularCategory => {
                    return <CategoryTag name={popularCategory.name} qty={popularCategory.servicesInCategory} key={popularCategory.id} />
                })}
            </ul>
        </div>
        <div className='categories-list-modes'>
            <label><input type='radio' name='category-type' checked={mode === 1} onChange={() => setMode(1)} />Все категории</label>
            <label><input type='radio' name='category-type' checked={mode === 2} onChange={() => setMode(2)} />По профессиям</label>
            <label><input type='radio' name='category-type' checked={mode === 3} onChange={() => setMode(3)} />По сферам</label>
        </div>
        {mode === 1 && mockMainCategories.map(category => {
            return <>
                <div className='categories-list-main-category'>
                    <div className='categories-list-main-category-header'>
                        <h3>{category.name}</h3>
                        <span>{category.subcategories.length}</span>
                    </div>
                    <div>
                        <ul className='categories-list'>
                            {category.subcategories.map(sub_c => {
                                return <CategoryTag name={sub_c.name} qty={sub_c.id} />
                            })}
                        </ul>
                    </div>
                    <hr />
                </div>
            </>
        })}
    </>;
};

export default CategoriesListPage;
