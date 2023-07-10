import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootStore } from '../../../store';
import { useMemo, useState } from 'react';
import Loading from '../../global/Loading';
import { deleteCategory } from '../../../actions/categories/categories';

interface IAdminWorkspaceCategoriesProps {
    onCreate: () => void,
    onCreateRelations: () => void
}

const AdminWorkspaceCategories: React.FunctionComponent<IAdminWorkspaceCategoriesProps> = (props) => {

    const rootState = useSelector((state: RootStore) => state)

    const [search, setSearch] = useState('')
    const [sortMode, setSortMode] = useState<string>('default')

    const searchQuery = useMemo(() => {
        return rootState.categories.categories.filter(category => category.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())).sort((a, b) => {
            if (sortMode === 'new') {
                return b.id - a.id
            }
            if (sortMode === 'a-z') {
                if (a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()) return -1
                if (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) return 1
                return 0
            }
            if (sortMode === 'z-a') {
                if (a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()) return 1
                if (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) return -1
                return 0
            }
            return a.id - b.id
        })
    }, [, search, rootState.categories.categories, sortMode])

    const dispatch = useDispatch()

    return <>
        <div className='user-admin-panel-table'>
            <div className='user-admin-panel-table-header'>
                <div className='wide-search-container'>
                    <input type='text' placeholder='Поиск по названию' value={search} onChange={e => setSearch(e.target.value)} />
                    <i className='fas fa-search' />
                </div>
                <div className='user-admin-panel-search-length'>
                    <p>Найдено: <span>{searchQuery.length}</span></p>
                </div>
                <div className='sort-selection'>
                    <span>Сортировать:</span>
                    <select className='color-blue' value={sortMode} onChange={e => setSortMode(e.target.value)}>
                        <option value='default'>по умолчанию</option>
                        {/* <option value='new'>по новизне</option> */}
                        <option value='a-z'>по алфавиту: А-Я</option>
                        <option value='z-a'>по алфавиту: Я-А</option>
                    </select>
                </div>
            </div>
            <div>
                <div className='user-admin-panel-table-row-head' id='categories'>
                    <span>ID</span>
                    <span>Название</span>
                    <span>Индекс</span>
                    <span>Принадлежность</span>
                    <div>
                        <i className='fas fa-trash-alt' />
                    </div>
                </div>
                <div className='user-admin-panel-table-content'>
                    {rootState.services.is_loading ? <Loading height={505} /> : searchQuery.map(category => {
                        return <div className='user-admin-panel-table-row' id='categories' key={category.id}>
                            <span>{category.id}</span>
                            <span>{category.name}</span>
                            <span>{category.index}</span>
                            <span>{category.parent ? category.parent : '-'}</span>
                            <div>
                                <button className='cursor-pointer' onClick={() => {
                                    if (confirm('Подтвердите удаление категории')) dispatch(deleteCategory(category.id, rootState.auth.user?.d_token))
                                }}><i className='fas fa-times' /></button>
                            </div>
                        </div>
                    })}
                </div>
            </div>
            <div className='user-admin-panel-add-buttons'>
                <button className='user-admin-panel-button' onClick={() => props.onCreate()}>
                    <i className='fas fa-plus' />
                    <span>Добавить категорию</span>
                </button>
                <button className='user-admin-panel-button' onClick={() => props.onCreateRelations()}>
                    <i className='fas fa-link' />
                    <span>Привязать категорию</span>
                </button>
            </div>
        </div>
    </>;
};

export default AdminWorkspaceCategories;
