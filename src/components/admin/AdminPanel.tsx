import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootStore } from '../../store';
import { useEffect, useState } from 'react';
// import { URL } from '../utils';
// import { useDispatch } from 'react-redux';
// import { createService } from '../../actions/services/services';
import ServiceEditPopup from '../services/ServiceEditPopup';
import CategoryPopup from '../categories/CategoryPopup';
import { TDiscount, TServicesBlock, TServicesCollection, TServicesData } from '../../actions/services/types';
import AdminWorkspaceServices from './workspaces/AdminWorkspaceServices';
import AdminWorkspaceCategories from './workspaces/AdminWorkspaceCategories';
import CategoryRelationsAddPopup from '../categories/CategoryRelationsAddPopup';
import AdminWorkspaceLocationsPlatforms from './workspaces/AdminWorkspaceLocationsPlatforms';
import LocationsPlatformsAddPopup from './workspaces/LocationsPlatformsAddPopup';
import AdminWorkspaceDiscounts from './workspaces/AdminWorkspaceDiscounts';
import DiscountPopup from './workspaces/DiscountPopup';
import AdminWorkspaceUsers from './workspaces/AdminWorkspaceUsers';
import { TUserData } from '../../actions/auth/types';
import AdminUserEditPopup from './workspaces/AdminUserEditPopup';
import AdminWorkspaceApplications from './workspaces/AdminWorkspaceApplications';
import AdminWorkspaceCollections from './workspaces/AdminWorkspaceCollections';
import CollectionAddPopup from '../collections/CollectionAddPopup';
import BlockAddPopup from '../collections/blocks/BlockAddPopup';
import CollectionEditPopup from '../collections/CollectionEditPopup';
import BlockEditPopup from '../collections/blocks/BlockEditPopup';
import { TCategory } from '../../actions/categories/types';

interface IAdminPanelProps {
}

const AdminPanel: React.FunctionComponent<IAdminPanelProps> = (props) => {

    const userState = useSelector((state: RootStore) => state.auth.user)

    // const dispatch = useDispatch()

    const [adminWorkspace, setAdminWorkspace] = useState<'services' | 'categories' | 'locations_platforms' | 'discounts' | 'users' | 'applications' | 'collections'>('services')

    const [createService, setCreateService] = useState(false)
    const [createCategory, setCreateCategory] = useState(false)
    const [createCategoryRelations, setCreateCategoryRelations] = useState(false)
    const [createLocation, setCreateLocation] = useState(false)
    const [createPlatform, setCreatePlatform] = useState(false)
    const [createDiscount, setCreateDiscount] = useState(false)
    const [createCollection, setCreateCollection] = useState(false)
    const [createBlock, setCreateBlock] = useState(false)

    const [editService, setEditService] = useState<TServicesData>(null)
    const [editCategory, setEditCategory] = useState<TCategory>(null)
    const [editDiscount, setEditDiscount] = useState<TDiscount>(null)
    const [editUser, setEditUser] = useState<TUserData>(null)
    const [editCollection, setEditCollection] = useState<TServicesCollection>(null)
    const [editBlock, setEditBlock] = useState<TServicesBlock>(null)

    // useEffect(() => {
    //     if (!userState || !userState?.is_admin) {
    //         window.location.replace(URL)
    //     }
    // }, [])

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
                        hasPartnership: false,
                        country: ''
                    },
                    rating: 0,
                    categories_2: [],
                    categories_3: [],
                    images: {
                        logo: '',
                        logo_file: '',
                        screenshots: []
                    },
                    feedbacks: [],
                    promocode: '',
                    admin_notes: '',
                    is_hidden: false,
                    discounts: [],
                    similar_services: []
                }}
                onClose={() => setCreateService(false)}
                add
            />}

            {editService && <ServiceEditPopup service={editService} onClose={() => setEditService(null)} is_empty />}

            {createCategory && <CategoryPopup category={{ id: -1, name: '', index: 1, service_count: 0 }} onClose={() => setCreateCategory(false)} />}
            {createCategoryRelations && <CategoryRelationsAddPopup onClose={() => setCreateCategoryRelations(false)} />}
            {editCategory && <CategoryPopup category={editCategory} onClose={() => setEditCategory(null)} />}

            {createLocation && <LocationsPlatformsAddPopup onClose={() => setCreateLocation(false)} action='location' />}
            {createPlatform && <LocationsPlatformsAddPopup onClose={() => setCreatePlatform(false)} action='platform' />}

            {createDiscount && <DiscountPopup
                discount={{
                    id: -1,
                    code: '',
                    service: -1,
                    description: '',
                    is_promocode: true,
                    is_sale: false
                }}
                onClose={() => setCreateDiscount(false)}
            />}
            {editDiscount && <DiscountPopup discount={editDiscount} onClose={() => setEditDiscount(null)} />}

            {createCollection && <CollectionAddPopup onClose={() => setCreateCollection(false)} />}
            {editCollection && <CollectionEditPopup collection={editCollection} onClose={() => setEditCollection(null)} />}

            {createBlock && <BlockAddPopup onClose={() => setCreateBlock(false)} />}
            {editBlock && <BlockEditPopup block={editBlock} onClose={() => setEditBlock(null)} />}

            {editUser && <AdminUserEditPopup user={editUser} onClose={() => setEditUser(null)} />}

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
                    <button className={adminWorkspace === 'collections' ? 'user-admin-panel-button active' : 'user-admin-panel-button'} onClick={() => setAdminWorkspace('collections')}>
                        <span>Подборки</span>
                    </button>
                    <button className={adminWorkspace === 'users' ? 'user-admin-panel-button active' : 'user-admin-panel-button'} onClick={() => setAdminWorkspace('users')}>
                        <span>Пользователи</span>
                    </button>
                    <button className={adminWorkspace === 'applications' ? 'user-admin-panel-button active' : 'user-admin-panel-button'} onClick={() => setAdminWorkspace('applications')}>
                        <span>Заявки</span>
                    </button>
                </div>
                <div className='user-admin-panel-workspace'>

                    {adminWorkspace === 'services' && <AdminWorkspaceServices onEdit={setEditService} onCreate={() => setCreateService(true)} />}
                    {adminWorkspace === 'categories' && <AdminWorkspaceCategories onEdit={setEditCategory} onCreate={() => setCreateCategory(true)} onCreateRelations={() => setCreateCategoryRelations(true)} />}
                    {adminWorkspace === 'locations_platforms' && <AdminWorkspaceLocationsPlatforms onCreateLocation={() => setCreateLocation(true)} onCreatePlatform={() => setCreatePlatform(true)} />}
                    {adminWorkspace === 'discounts' && <AdminWorkspaceDiscounts onEdit={setEditDiscount} onCreate={() => setCreateDiscount(true)} />}
                    {adminWorkspace === 'collections' && <AdminWorkspaceCollections onEditCollection={setEditCollection} onCreateCollection={() => setCreateCollection(true)} onEditBlock={setEditBlock} onCreateBlock={() => setCreateBlock(true)} />}
                    {adminWorkspace === 'users' && <AdminWorkspaceUsers onEdit={setEditUser} />}
                    {adminWorkspace === 'applications' && <AdminWorkspaceApplications />}

                </div>
            </div>
        </>}
    </>;
};

export default AdminPanel;
