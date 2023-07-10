import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootStore } from '../../../store';
import { useMemo, useState } from 'react';
import Loading from '../../global/Loading';
import { useDispatch } from 'react-redux';
import { deleteService, serviceDataUpdate } from '../../../actions/services/services';
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
    const [sortMode, setSortMode] = useState<string>('default')

    const searchQuery = useMemo(() => {
        return serviceState.services?.concat(serviceState.services_hidden).filter(service => service.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())).sort((a, b) => {
            if (sortMode === 'new') {
                return b.id - a.id
            }
            if (sortMode === 'top') {
                return b.rating - a.rating
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
    }, [, search, serviceState.services, serviceState.services_hidden, sortMode])

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
                        <option value='new'>по новизне</option>
                        <option value='top'>по рейтингу</option>
                        <option value='a-z'>по алфавиту: А-Я</option>
                        <option value='z-a'>по алфавиту: Я-А</option>
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
                    {serviceState.is_loading ? <Loading height={505} /> : searchQuery.map(service => {
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
                                <input type='checkbox' onChange={() => dispatch(serviceDataUpdate({
                                    ...service,
                                    is_hidden: !service.is_hidden
                                }))} checked={service.is_hidden} />
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
