import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootStore } from '../../../store';
import { useEffect, useMemo, useState } from 'react';
import Loading from '../../global/Loading';
import { useDispatch } from 'react-redux';
import { deleteService, getSearch, serviceDataUpdate, serviceToggleHiddenStatus } from '../../../actions/services/services';
import { Link } from 'react-router-dom';
import { TServicesData } from '../../../actions/services/types';

interface IAdminWorkspaceServicesProps {
    onEdit: (_: TServicesData) => void,
    onCreate: () => void
}

const AdminWorkspaceServices: React.FunctionComponent<IAdminWorkspaceServicesProps> = (props) => {

    const userState = useSelector((state: RootStore) => state.auth.user)
    const serviceState = useSelector((state: RootStore) => state.services)

    const [search, setSearch] = useState('')
    const [sortMode, setSortMode] = useState<string>('')
    const [sortType, setSortType] = useState<'new' | 'rating' | 'alphabet'>(null)
    const [sortDirection, setSortDirection] = useState<1 | -1>(1)

    const [currentPage, setCurrentPage] = useState(1)
    const [numberOfElements, setNumberOfElements] = useState(20)

    useEffect(() => {
        dispatch(getSearch({ search_string: search, include_name: true, include_description: null, is_free: null, has_trial: null, has_partnership: null, country: '', categories_ids: [], collection_id: null, sort_type: sortType, sort_direction: sortDirection }, currentPage, numberOfElements))
    }, [, search, sortType, sortDirection, currentPage, numberOfElements])

    useEffect(() => {
        setCurrentPage(1)
    }, [, search, sortMode, numberOfElements])

    // const searchQuery = useMemo(() => {
    //     return serviceState.services?.concat(serviceState.services_hidden).filter(service => service.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())).sort((a, b) => {
    //         if (sortMode === 'new') {
    //             return b.id - a.id
    //         }
    //         if (sortMode === 'top') {
    //             return b.rating - a.rating
    //         }
    //         if (sortMode === 'a-z') {
    //             if (a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()) return -1
    //             if (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) return 1
    //             return 0
    //         }
    //         if (sortMode === 'z-a') {
    //             if (a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()) return 1
    //             if (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) return -1
    //             return 0
    //         }
    //         return a.id - b.id
    //     })
    // }, [, search, serviceState.services, serviceState.services_hidden, sortMode])

    const searchQuery = serviceState.search

    const dispatch = useDispatch()

    const changeSortMode = (sort_type: string) => {
        switch (sort_type) {
            case 'new':
                setSortMode('new')
                setSortType('new')
                setSortDirection(-1)
                break
            case 'rating':
                setSortMode('rating')
                setSortType('rating')
                setSortDirection(-1)
                break
            case 'rating_low':
                setSortMode('rating')
                setSortType('rating')
                setSortDirection(1)
                break
            case 'alphabet':
                setSortMode('alphabet')
                setSortType('alphabet')
                setSortDirection(1)
                break
            case 'alphabet_reverse':
                setSortMode('alphabet_reverse')
                setSortType('alphabet')
                setSortDirection(-1)
                break
            default:
                setSortMode('')
                setSortType(null)
                setSortDirection(1)
        }
    }

    return <>
        <div className='user-admin-panel-table'>
            <div className='user-admin-panel-table-header'>
                <div className='wide-search-container'>
                    <input type='text' placeholder='Поиск по названию' value={search} onChange={e => setSearch(e.target.value)} />
                    <i className='fas fa-search' />
                </div>
                <div className='user-admin-panel-search-length'>
                    <p>Найдено: <span>{searchQuery.total_count}</span></p>
                    <p>Показывать по:</p>
                    <select value={numberOfElements} onChange={e => setNumberOfElements(parseInt(e.target.value))}>
                        <option value={20}>20</option>
                        <option value={40}>40</option>
                        <option value={60}>60</option>
                        <option value={80}>80</option>
                        <option value={100}>100</option>
                    </select>
                    <p>Страница {currentPage} из {searchQuery.total_count ? Math.ceil(searchQuery.total_count / numberOfElements) : 1}</p>
                    <div className='user-admin-panel-change-page'>
                        <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                            <i className='fas fa-chevron-left' />
                        </button>
                        <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === Math.ceil(searchQuery.total_count / numberOfElements) || searchQuery.total_count === 0}>
                            <i className='fas fa-chevron-right' />
                        </button>
                    </div>
                </div>
                <div className='sort-selection'>
                    <span>Сортировать:</span>
                    <select className='color-blue' value={sortMode} onChange={e => changeSortMode(e.target.value)}>
                        <option value=''>по умолчанию</option>
                        <option value='new'>по новизне</option>
                        <option value='rating'>по рейтингу</option>
                        <option value='alphabet'>по алфавиту: А-Я</option>
                        <option value='alphabet_reverse'>по алфавиту: Я-А</option>
                    </select>
                </div>
            </div>
            <div>
                <div className='user-admin-panel-table-row-head' id='services'>
                    <span>ID</span>
                    <span>Название</span>
                    {/* <span>Описание</span> */}
                    <span>Рейтинг</span>
                    <span>Заметки</span>
                    <div>
                        <i className='fas fa-eye-slash' />
                    </div>
                    <span>Редактирование</span>
                    <div>
                        <i className='fas fa-trash-alt' />
                    </div>
                </div>
                <div className='user-admin-panel-table-content'>
                    {serviceState.is_loading ? <Loading height={505} /> : searchQuery.data?.map(service => {
                        return <div className='user-admin-panel-table-row' id='services' key={service.id}>
                            <span>{service.id}</span>
                            <div id='service-name'>
                                <Link to={'/service/' + service.id} target='_blank' rel='noopener noreferrer'>
                                    <span>{service.name}</span>
                                    <i className='fas fa-external-link-alt' />
                                </Link>
                            </div>
                            {/* <span>{service.description.text}</span> */}
                            <span>{service.rating}</span>
                            <span>{service.admin_notes}</span>
                            <div>
                                <input
                                    type='checkbox'
                                    onChange={() => dispatch(serviceToggleHiddenStatus(userState.d_token, service.id, !service.is_hidden))}
                                    checked={service.is_hidden}
                                />
                            </div>
                            <div>
                                <button className='user-admin-panel-table-edit-button' onClick={() => props.onEdit(service)}>Редактировать</button>
                            </div>
                            <div>
                                <button className='cursor-pointer' onClick={() => {
                                    if (confirm('Подтвердите удаление сервиса')) dispatch(deleteService(service.id, userState?.d_token))
                                }}><i className='fas fa-times' /></button>
                            </div>
                        </div>
                    })}
                </div>
            </div>
            <button className='user-admin-panel-button' onClick={() => props.onCreate()}>
                <i className='fas fa-plus' />
                <span>Добавить сервис</span>
            </button>
        </div>
    </>;
};

export default AdminWorkspaceServices;
