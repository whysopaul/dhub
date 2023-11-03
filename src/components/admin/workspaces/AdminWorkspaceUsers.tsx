import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootStore } from '../../../store';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { adminGetAllUsers } from '../../../actions/admin/admin';
import { TUserData } from '../../../actions/auth/types';

interface IAdminWorkspaceUsersProps {
    onEdit: (_: TUserData) => void
}

const AdminWorkspaceUsers: React.FunctionComponent<IAdminWorkspaceUsersProps> = (props) => {

    const rootState = useSelector((state: RootStore) => state)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(adminGetAllUsers())
    }, [])

    return <>
        <div>
            <div>
                <div className='user-admin-panel-table-row-head' id='users'>
                    <span>ID</span>
                    <span>Имя пользователя</span>
                    <span>Админ</span>
                    <span>Специалист</span>
                    {/* <span>Описание</span> */}
                    <span>Редактирование</span>
                    <div>
                        <i className='fas fa-trash-alt' />
                    </div>
                </div>
                <div className='user-admin-panel-table-content'>
                    {rootState.admin.users.sort((a, b) => a.id - b.id).map(user => {
                        return <div className='user-admin-panel-table-row' id='users' key={user.id}>
                            <span>{user.id}</span>
                            <div id='user-name'>
                                <a href={'https://vk.com/id' + user.vk_id} target='_blank' rel='noopener noreferrer'>
                                    <span>{user.name}</span>
                                    <i className='fas fa-external-link-alt' />
                                </a>
                            </div>
                            <span>{user.is_admin ? 'Да' : 'Нет'}</span>
                            <span>{user.is_specialist ? 'Да' : 'Нет'}</span>
                            {/* <span>{user.specialist_description}</span> */}
                            <div>
                                <button
                                    className='user-admin-panel-table-edit-button'
                                    onClick={() => props.onEdit(user)}
                                >
                                    Редактировать
                                </button>
                            </div>
                            <div>
                                <button
                                    className='cursor-pointer'
                                    onClick={() => {
                                        // if (confirm('Подтвердите удаление')) dispatch(deleteDiscount(d.id, rootState.auth.user.d_token))
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

export default AdminWorkspaceUsers;
