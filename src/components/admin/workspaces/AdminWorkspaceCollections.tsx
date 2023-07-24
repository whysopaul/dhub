import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootStore } from '../../../store';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getCollections } from '../../../actions/services/services';
import { TServicesCollection } from '../../../actions/services/types';

interface IAdminWorkspaceCollectionsProps {
    onEdit: (_: TServicesCollection) => void
}

const AdminWorkspaceCollections: React.FunctionComponent<IAdminWorkspaceCollectionsProps> = (props) => {

    const rootState = useSelector((state: RootStore) => state)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCollections())
    }, [])

    return <>
        <div>
            <div>
                <div className='user-admin-panel-table-row-head' id='collections'>
                    <span>ID</span>
                    <span>Название подборки</span>
                    <span>Блоки</span>
                    <span>Редактирование</span>
                    <div>
                        <i className='fas fa-trash-alt' />
                    </div>
                </div>
                <div className='user-admin-panel-table-content'>
                    {rootState.services.collections.map(c => {
                        return <div className='user-admin-panel-table-row' id='collections'>
                            <span>{c.id}</span>
                            <span>{c.title}</span>
                            <span>{c.blocks.map(b => b.title)}</span>
                            <div>
                                <button
                                    className='user-admin-panel-table-edit-button'
                                    onClick={() => props.onEdit(c)}
                                >
                                    Редактировать
                                </button>
                            </div>
                            <div>
                                <button
                                    className='cursor-pointer'
                                    onClick={() => {
                                        // if (confirm('Подтвердите удаление')) dispatch(deleteServiceApplication(a.id, rootState.auth.user.d_token))
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

export default AdminWorkspaceCollections;
