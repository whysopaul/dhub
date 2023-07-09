import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootStore } from '../../../store';
import { useMemo, useState } from 'react';
import Loading from '../../global/Loading';
import { useDispatch } from 'react-redux';
import { serviceDataUpdate } from '../../../actions/services/services';

interface IAdminWorkspaceServicesProps {
    onEdit: (_) => void
}

const AdminWorkspaceServices: React.FunctionComponent<IAdminWorkspaceServicesProps> = (props) => {

    const serviceState = useSelector((state: RootStore) => state.services)

    const [search, setSearch] = useState('')
    const [sortMode, setSortMode] = useState<string>('default')

    const searchQuery = useMemo(() => {
        return serviceState.services?.concat(serviceState.services_hidden).filter(service => service.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
    }, [, search, serviceState.services, serviceState.services_hidden])

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
                    </select>
                </div>
            </div>
            <div>
                <div className='user-admin-panel-table-row-head'>
                    <span>ID</span>
                    <span>Название</span>
                    {/* <span>Описание</span> */}
                    <span>Рейтинг</span>
                    <span>Заметки</span>
                    <span>Скрытый</span>
                    <span>Редактирование</span>
                    <span>Удалить</span>
                </div>
                <div className='user-admin-panel-table-content'>
                    {serviceState.is_loading ? <Loading height={505} /> : searchQuery.map(service => {
                        return <div className='user-admin-panel-table-row' key={service.id}>
                            <span>{service.id}</span>
                            <span>{service.name}</span>
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
                                <button><i className='fas fa-times' /></button>
                            </div>
                        </div>
                    })}
                </div>
            </div>
        </div>
    </>;
};

export default AdminWorkspaceServices;
