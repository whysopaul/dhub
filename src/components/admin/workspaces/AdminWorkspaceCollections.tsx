import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootStore } from '../../../store';
import { useDispatch } from 'react-redux';
import { TServicesBlock, TServicesCollection } from '../../../actions/services/types';
import { deleteCollection } from '../../../actions/services/services';
import CategoryTag from '../../categories/CategoryTag';

interface IAdminWorkspaceCollectionsProps {
    onEditCollection: (_: TServicesCollection) => void,
    onCreateCollection: () => void,
    onEditBlock: (_: TServicesBlock) => void,
    onCreateBlock: () => void
}

const AdminWorkspaceCollections: React.FunctionComponent<IAdminWorkspaceCollectionsProps> = (props) => {

    const rootState = useSelector((state: RootStore) => state)

    const dispatch = useDispatch()

    return <>
        <div className='user-admin-panel-table'>
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
                            <div>
                                <ul className='categories-list'>
                                    {rootState.services.blocks.filter(b => b.collection === c.id).map(b => {
                                        return <>
                                            <CategoryTag name={b.title} qty={b.service_ids.length} onClick={() => props.onEditBlock(b)} key={b.id} />
                                        </>
                                    })}
                                </ul>
                            </div>
                            <div>
                                <button
                                    className='user-admin-panel-table-edit-button'
                                    onClick={() => props.onEditCollection(c)}
                                >
                                    Редактировать
                                </button>
                            </div>
                            <div>
                                <button
                                    className='cursor-pointer'
                                    onClick={() => {
                                        if (confirm('Подтвердите удаление')) dispatch(deleteCollection(c.id, rootState.auth.user.d_token))
                                    }}
                                >
                                    <i className='fas fa-times' />
                                </button>
                            </div>
                        </div>
                    })}
                </div>
            </div>
            <div className='user-admin-panel-add-buttons'>
                <button
                    className='user-admin-panel-button'
                    onClick={() => props.onCreateCollection()}
                >
                    <i className='fas fa-plus' />
                    <span>Создать подборку</span>
                </button>
                <button
                    className='user-admin-panel-button'
                    onClick={() => props.onCreateBlock()}
                >
                    <i className='fas fa-plus' />
                    <span>Создать блок</span>
                </button>
            </div>
        </div>
    </>;
};

export default AdminWorkspaceCollections;
