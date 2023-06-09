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
import CategoryRelationsAddPopup from '../categories/CategoryRelationsAddPopup';
import AdminWorkspaceLocationsPlatforms from './workspaces/AdminWorkspaceLocationsPlatforms';
import LocationsPlatformsAddPopup from './workspaces/LocationsPlatformsAddPopup';
import AdminWorkspaceDiscounts from './workspaces/AdminWorkspaceDiscounts';

interface IAdminPanelProps {
}

const AdminPanel: React.FunctionComponent<IAdminPanelProps> = (props) => {

    const userState = useSelector((state: RootStore) => state.auth.user)

    // const dispatch = useDispatch()

    const [adminWorkspace, setAdminWorkspace] = useState<'services' | 'categories' | 'locations_platforms' | 'discounts' | 'users'>('services')

    const [createService, setCreateService] = useState(false)
    const [createCategory, setCreateCategory] = useState(false)
    const [createCategoryRelations, setCreateCategoryRelations] = useState(false)
    const [createLocation, setCreateLocation] = useState(false)
    const [createPlatform, setCreatePlatform] = useState(false)

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
                    link: '',
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

            {editService && <ServiceEditPopup service={editService} onClose={() => setEditService(null)} is_empty />}

            {createCategory && <CategoryAddPopup onClose={() => setCreateCategory(false)} />}
            {createCategoryRelations && <CategoryRelationsAddPopup onClose={() => setCreateCategoryRelations(false)} />}

            {createLocation && <LocationsPlatformsAddPopup onClose={() => setCreateLocation(false)} action='location' />}
            {createPlatform && <LocationsPlatformsAddPopup onClose={() => setCreatePlatform(false)} action='platform' />}

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
                    <button className={adminWorkspace === 'locations_platforms' ? 'user-admin-panel-button active' : 'user-admin-panel-button'} onClick={() => setAdminWorkspace('locations_platforms')}>
                        <span>Дислокации и платформы</span>
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
                    {adminWorkspace === 'categories' && <AdminWorkspaceCategories onCreate={() => setCreateCategory(true)} onCreateRelations={() => setCreateCategoryRelations(true)} />}
                    {adminWorkspace === 'locations_platforms' && <AdminWorkspaceLocationsPlatforms onCreateLocation={() => setCreateLocation(true)} onCreatePlatform={() => setCreatePlatform(true)} />}
                    {adminWorkspace === 'discounts' && <AdminWorkspaceDiscounts onEdit={() => null} onCreate={() => null} />}

                </div>
            </div>
        </>}
    </>;
};

export default AdminPanel;
