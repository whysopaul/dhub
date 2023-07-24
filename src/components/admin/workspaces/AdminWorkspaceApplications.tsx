import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootStore } from '../../../store';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { deleteServiceApplication, getServiceApplications } from '../../../actions/services/services';

interface IAdminWorkspaceApplicationsProps {
}

const AdminWorkspaceApplications: React.FunctionComponent<IAdminWorkspaceApplicationsProps> = (props) => {

    const rootState = useSelector((state: RootStore) => state)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getServiceApplications())
    }, [])

    return <>
        <div>
            <div>
                <div className='user-admin-panel-table-row-head' id='applications'>
                    <span>ID</span>
                    <span>Имя пользователя</span>
                    <span>Контактные данные</span>
                    <span>Название сервиса</span>
                    <span>Ссылка на сервис</span>
                    <span>Описание</span>
                    <div>
                        <i className='fas fa-trash-alt' />
                    </div>
                </div>
                <div className='user-admin-panel-table-content'>
                    {rootState.admin.applications.map(a => {
                        return <div className='user-admin-panel-table-row' id='applications'>
                            <span>{a.id}</span>
                            <span>{a.username}</span>
                            <span>{a.contact}</span>
                            <span>{a.service_name}</span>
                            <span>{a.service_link}</span>
                            <span>{a.description}</span>
                            <div>
                                <button
                                    className='cursor-pointer'
                                    onClick={() => {
                                        if (confirm('Подтвердите удаление')) dispatch(deleteServiceApplication(a.id, rootState.auth.user.d_token))
                                    }}
                                >
                                    <i className='fas fa-times' />
                                </button>
                            </div>
                        </div>
                    })}
                </div>
            </div>
        </div>
    </>;
};

export default AdminWorkspaceApplications;
