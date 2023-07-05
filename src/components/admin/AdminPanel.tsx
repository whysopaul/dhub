import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootStore } from '../../store';
import { useEffect, useMemo, useState } from 'react';
import { URL } from '../utils';
// import { useDispatch } from 'react-redux';
// import { createService } from '../../actions/services/services';
import ServiceEditPopup from '../services/ServiceEditPopup';
import CategoryAddPopup from '../categories/CategoryAddPopup';
import { TServicesData } from '../../actions/services/types';
import Loading from '../global/Loading';

interface IAdminPanelProps {
}

const AdminPanel: React.FunctionComponent<IAdminPanelProps> = (props) => {

    const userState = useSelector((state: RootStore) => state.auth.user)
    const serviceState = useSelector((state: RootStore) => state.services)

    // const dispatch = useDispatch()

    const [createService, setCreateService] = useState(false)
    const [createCategory, setCreateCategory] = useState(false)

    const [editService, setEditService] = useState<TServicesData>(null)

    const [search, setSearch] = useState('')
    const [sortMode, setSortMode] = useState<string>('default')

    const searchQuery = useMemo(() => {
        return serviceState.services?.filter(service => service.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
    }, [, search, serviceState.services])

    useEffect(() => {
        if (!userState || !userState?.is_admin) {
            window.location.replace(URL)
        }
    }, [])

    return <>
        {userState?.is_admin && <>

            {createService && <ServiceEditPopup
                service={{
                    id: -1,
                    name: '',
                    description: {
                        text: '',
                        isFree: false,
                        hasTrial: false,
                        paymentMethod: '',
                        price: '',
                        locations: [],
                        platforms: [],
                        hasPartnership: false
                    },
                    rating: 0,
                    categories_2: [],
                    categories_3: [],
                    images: {
                        logo: '',
                        screenshots: []
                    },
                    feedbacks: [],
                    promocode: '',
                    admin_notes: '',
                    is_hidden: false
                }}
                onClose={() => setCreateService(false)}
                add
            />}

            {createCategory && <CategoryAddPopup onClose={() => setCreateCategory(false)} />}

            {editService && <ServiceEditPopup service={editService} onClose={() => setEditService(null)} />}

            <div>
                <h2 className='section-main-title'>Панель администратора</h2>
            </div>
            <div className='user-admin-panel'>
                <div className='user-admin-panel-add-buttons'>
                    <button className='user-admin-panel-button' onClick={() => setCreateService(true)}>
                        <i className='fas fa-plus' />
                        <span>Добавить сервис</span>
                    </button>
                    <button className='user-admin-panel-button' onClick={() => setCreateCategory(true)}>
                        <i className='fas fa-plus' />
                        <span>Добавить категорию</span>
                    </button>
                    <button className='user-admin-panel-button'>
                        <i className='fas fa-plus' />
                        <span>Добавить дислокацию</span>
                    </button>
                    <button className='user-admin-panel-button'>
                        <i className='fas fa-plus' />
                        <span>Добавить платформу</span>
                    </button>
                </div>
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
                            <span>Редактирование</span>
                        </div>
                        <div className='user-admin-panel-table-content'>
                            {serviceState.is_loading ? <Loading height={505} /> : searchQuery.map(service => {
                                return <div className='user-admin-panel-table-row'>
                                    <span>{service.id}</span>
                                    <span>{service.name}</span>
                                    {/* <span>{service.description.text}</span> */}
                                    <span>{service.rating}</span>
                                    <span>{service.admin_notes}</span>
                                    <div>
                                        <button className='user-admin-panel-table-edit-button' onClick={() => setEditService(service)}>Редактировать</button>
                                    </div>
                                </div>
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>}
    </>;
};

export default AdminPanel;
