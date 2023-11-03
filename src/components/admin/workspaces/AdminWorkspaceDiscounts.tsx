import * as React from 'react';
import { TDiscount } from '../../../actions/services/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootStore } from '../../../store';
import { useEffect } from 'react';
import { deleteDiscount, getAllServicesDiscounts } from '../../../actions/services/services';

interface IAdminWorkspaceDiscountsProps {
    onEdit: (_: TDiscount) => void,
    onCreate: () => void
}

const AdminWorkspaceDiscounts: React.FunctionComponent<IAdminWorkspaceDiscountsProps> = (props) => {

    const rootState = useSelector((state: RootStore) => state)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllServicesDiscounts())
    }, [])

    return <>
        <div className='user-admin-panel-table'>
            <div>
                <div className='user-admin-panel-table-row-head' id='discounts'>
                    <span>ID</span>
                    <span>Название сервиса</span>
                    <span>Тип</span>
                    <span>Промокод</span>
                    <span>Описание</span>
                    <span>Редактирование</span>
                    <div>
                        <i className='fas fa-trash-alt' />
                    </div>
                </div>
                <div className='user-admin-panel-table-content'>
                    {rootState.services.discounts.map(d => {
                        return <div className='user-admin-panel-table-row' id='discounts' key={d.id}>
                            <span>{d.id}</span>
                            <span>{rootState.services.services_simple_list.find(s => s.id === d.service)?.name}</span>
                            <span>{d.is_promocode ? 'Промокод' : 'Скидка'}</span>
                            <span>{d.code}</span>
                            <span>{d.description}</span>
                            <div>
                                <button
                                    className='user-admin-panel-table-edit-button'
                                    onClick={() => props.onEdit(d)}
                                >
                                    Редактировать
                                </button>
                            </div>
                            <div>
                                <button
                                    className='cursor-pointer'
                                    onClick={() => {
                                        if (confirm('Подтвердите удаление')) dispatch(deleteDiscount(d.id, rootState.auth.user.d_token))
                                    }}
                                >
                                    <i className='fas fa-times' />
                                </button>
                            </div>
                        </div>
                    })}
                </div>
            </div>
            <button className='user-admin-panel-button' onClick={() => props.onCreate()}>
                <i className='fas fa-plus' />
                <span>Добавить промокод или скидку</span>
            </button>
        </div>
    </>;
};

export default AdminWorkspaceDiscounts;
