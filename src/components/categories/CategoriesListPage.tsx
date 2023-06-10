import * as React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootStore } from '../../store';
import CategoryTag from './CategoryTag';
// import { mockMainCategories } from '../../actions/categories/categories';
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
            <form action='/search'>
                <input type='text' placeholder='Введите название сервиса' name='search' value={search} onChange={e => setSearch(e.target.value)} />
                <i className='fas fa-search color-blue' />
            </form>
        </div>
        <div className='services-list-categories-container categories-section'>
            <p>Популярные категории:</p>
            <ul className='categories-list'>
                {rootState.categories.categories.map(category => {
                    return {
                        ...category,
                        servicesInCategory: rootState.services.services.filter(service => service.categories_3.find(servicesCategory => servicesCategory.id === category.id)).length
                    }
                }).sort((a, b) => b.servicesInCategory - a.servicesInCategory).slice(0, 16).map(popularCategory => {
                    return <CategoryTag name={popularCategory.name} qty={popularCategory.servicesInCategory} key={popularCategory.id} />
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
                        <h3>{category.name.slice(0, category.name.indexOf('('))}</h3>
                        {/* <span>{category.subcategories.length}</span> */}
                    </div>
                    <div>
                        <ul className='categories-list'>
                            {/* {category.subcategories.map(sub_c => {
                                return <CategoryTag name={sub_c.name} qty={sub_c.id} key={sub_c.id} />
                            })} */}
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
                        {/* {category.subcategories.map(sub_c => {
                                return <CategoryTag name={sub_c.name} qty={sub_c.id} key={sub_c.id} />
                            })} */}
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
                        {/* {category.subcategories.map(sub_c => {
                                return <CategoryTag name={sub_c.name} qty={sub_c.id} key={sub_c.id} />
                            })} */}
                    </ul>
                </div>
            </div>
        </>}
    </>;
};

export default CategoriesListPage;
