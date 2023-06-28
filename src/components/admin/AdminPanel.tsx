import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootStore } from '../../store';
import { useEffect, useState } from 'react';
import { URL } from '../utils';
import { useDispatch } from 'react-redux';
// import { createService } from '../../actions/services/services';
import ServiceEditPopup from '../services/ServiceEditPopup';

interface IAdminPanelProps {
}

const AdminPanel: React.FunctionComponent<IAdminPanelProps> = (props) => {

    const userState = useSelector((state: RootStore) => state.auth.user)

    const dispatch = useDispatch()

    const [createService, setCreateService] = useState(false)

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
                }}
                onClose={() => setCreateService(false)}
                add
            />}

            <div>
                <h2 className='section-main-title'>Панель администратора</h2>
            </div>
            <div className='user-admin-panel'>
                <button className='user-admin-panel-button' onClick={() => setCreateService(true)}>
                    <i className='fas fa-plus' />
                    <span>Добавить сервис</span>
                </button>
                <button className='user-admin-panel-button'>
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
        </>}
    </>;
};

export default AdminPanel;
