import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootStore } from '../../../store';
import { useDispatch } from 'react-redux';
import Loading from '../../global/Loading';
import { deleteLocation, deletePlatform } from '../../../actions/services/services';

interface IAdminWorkspaceLocationsPlatformsProps {
    onCreateLocation: () => void,
    onCreatePlatform: () => void
}

const AdminWorkspaceLocationsPlatforms: React.FunctionComponent<IAdminWorkspaceLocationsPlatformsProps> = (props) => {

    const rootState = useSelector((state: RootStore) => state)

    const dispatch = useDispatch()

    return <>
        <div className='user-admin-panel-table-split'>
            <div className='user-admin-panel-table'>
                <div className='user-admin-panel-table-header'>
                    <h3>Дислокации</h3>
                </div>
                <div>
                    <div className='user-admin-panel-table-row-head' id='locations-platforms'>
                        <span>ID</span>
                        <span>Название</span>
                        <div>
                            <i className='fas fa-trash-alt' />
                        </div>
                    </div>
                    <div className='user-admin-panel-table-content'>
                        {rootState.services.is_loading ? <Loading height={505} /> : rootState.services.locations.map(location => {
                            return <div className='user-admin-panel-table-row' id='locations-platforms' key={location.id}>
                                <span>{location.id}</span>
                                <span>{location.name}</span>
                                <div>
                                    <button className='cursor-pointer' onClick={() => {
                                        if (confirm('Подтвердите удаление дислокации')) dispatch(deleteLocation(location.id, rootState.auth.user?.d_token))
                                    }}><i className='fas fa-times' /></button>
                                </div>
                            </div>
                        })}
                    </div>
                </div>
                <button className='user-admin-panel-button' onClick={() => props.onCreateLocation()}>
                    <i className='fas fa-plus' />
                    <span>Добавить дислокацию</span>
                </button>
            </div>

            <div className='user-admin-panel-table'>
                <div className='user-admin-panel-table-header'>
                    <h3>Платформы</h3>
                </div>
                <div>
                    <div className='user-admin-panel-table-row-head' id='locations-platforms'>
                        <span>ID</span>
                        <span>Название</span>
                        <div>
                            <i className='fas fa-trash-alt' />
                        </div>
                    </div>
                    <div className='user-admin-panel-table-content'>
                        {rootState.services.is_loading ? <Loading height={505} /> : rootState.services.platforms.map(platform => {
                            return <div className='user-admin-panel-table-row' id='locations-platforms' key={platform.id}>
                                <span>{platform.id}</span>
                                <span>{platform.name}</span>
                                <div>
                                    <button className='cursor-pointer' onClick={() => {
                                        if (confirm('Подтвердите удаление платформы')) dispatch(deletePlatform(platform.id, rootState.auth.user?.d_token))
                                    }}><i className='fas fa-times' /></button>
                                </div>
                            </div>
                        })}
                    </div>
                </div>
                <button className='user-admin-panel-button' onClick={() => props.onCreatePlatform()}>
                    <i className='fas fa-plus' />
                    <span>Добавить платформу</span>
                </button>
            </div>
        </div>
    </>;
};

export default AdminWorkspaceLocationsPlatforms;
