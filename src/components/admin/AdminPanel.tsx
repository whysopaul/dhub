import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootStore } from '../../store';
import { useEffect, useState } from 'react';
import { URL } from '../utils';
// import { useDispatch } from 'react-redux';
// import { createService } from '../../actions/services/services';
import ServiceEditPopup from '../services/ServiceEditPopup';
import CategoryAddPopup from '../categories/CategoryAddPopup';
import { TServicesData } from '../../actions/services/types';
import AdminWorkspaceServices from './workspaces/AdminWorkspaceServices';
import AdminWorkspaceCategories from './workspaces/AdminWorkspaceCategories';

interface IAdminPanelProps {
}

const AdminPanel: React.FunctionComponent<IAdminPanelProps> = (props) => {

    const userState = useSelector((state: RootStore) => state.auth.user)

    // const dispatch = useDispatch()

    const [adminWorkspace, setAdminWorkspace] = useState<'services' | 'categories' | 'locations' | 'platforms' | 'discounts' | 'users'>('services')

    const [createService, setCreateService] = useState(false)
    const [createCategory, setCreateCategory] = useState(false)

    const [editService, setEditService] = useState<TServicesData>(null)

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
                    is_hidden: false,
                    discounts: []
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
                <div className='user-admin-panel-section-buttons'>
                    <button className={adminWorkspace === 'services' ? 'user-admin-panel-button active' : 'user-admin-panel-button'} onClick={() => setAdminWorkspace('services')}>
                        <span>Сервисы</span>
                    </button>
                    <button className={adminWorkspace === 'categories' ? 'user-admin-panel-button active' : 'user-admin-panel-button'} onClick={() => setAdminWorkspace('categories')}>
                        <span>Категории</span>
                    </button>
                    <button className={adminWorkspace === 'locations' ? 'user-admin-panel-button active' : 'user-admin-panel-button'} onClick={() => setAdminWorkspace('locations')}>
                        <span>Дислокации</span>
                    </button>
                    <button className={adminWorkspace === 'platforms' ? 'user-admin-panel-button active' : 'user-admin-panel-button'} onClick={() => setAdminWorkspace('platforms')}>
                        <span>Платформы</span>
                    </button>
                    <button className={adminWorkspace === 'discounts' ? 'user-admin-panel-button active' : 'user-admin-panel-button'} onClick={() => setAdminWorkspace('discounts')}>
                        <span>Скидки</span>
                    </button>
                    <button className={adminWorkspace === 'users' ? 'user-admin-panel-button active' : 'user-admin-panel-button'} onClick={() => setAdminWorkspace('users')}>
                        <span>Пользователи</span>
                    </button>
                </div>
                <div className='user-admin-panel-workspace'>

                    {adminWorkspace === 'services' && <AdminWorkspaceServices onEdit={setEditService} onCreate={() => setCreateService(true)} />}
                    {adminWorkspace === 'categories' && <AdminWorkspaceCategories onCreate={() => setCreateCategory(true)} />}

                </div>
            </div>
        </>}
    </>;
};

export default AdminPanel;
