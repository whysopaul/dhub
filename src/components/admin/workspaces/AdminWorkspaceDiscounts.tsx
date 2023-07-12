import * as React from 'react';
import { TDiscount } from '../../../actions/services/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootStore } from '../../../store';

interface IAdminWorkspaceDiscountsProps {
    onEdit: (_: TDiscount) => void,
    onCreate: () => void
}

const AdminWorkspaceDiscounts: React.FunctionComponent<IAdminWorkspaceDiscountsProps> = (props) => {

    const rootState = useSelector((state: RootStore) => state)

    const dispatch = useDispatch()

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
