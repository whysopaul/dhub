import * as React from 'react';
import { TUserData } from '../../../actions/auth/types';
import { useSelector } from 'react-redux';
import { RootStore } from '../../../store';
import { useDispatch } from 'react-redux';
import { useRef, useState } from 'react';
import { useOnClickOutside } from '../../utils/HandleClickOutside';
import { useOnPopup } from '../../utils/HandleOnPopup';
import { adminSetSpecialist } from '../../../actions/admin/admin';

interface IAdminUserEditPopupProps {
    user: TUserData,
    onClose: () => void
}

const AdminUserEditPopup: React.FunctionComponent<IAdminUserEditPopupProps> = (props) => {

    const rootState = useSelector((state: RootStore) => state)

    const dispatch = useDispatch()

    const [isSpecialist, setIsSpecialist] = useState<boolean>(props.user.is_specialist)
    const [specialistDescription, setSpecialistDescription] = useState<string>(props.user.specialist_description)

    const ref = useRef(null)

    useOnClickOutside(ref, () => props.onClose())

    useOnPopup()

    return <>
        <div className='backdrop' />
        <div className='popup-container' ref={ref}>
            <h2>Назначить специалиста</h2>
            <div className='popup-add-form'>
                <label id='extended'>
                    <span>Специалист:</span>
                    <input
                        type='checkbox'
                        onChange={() => setIsSpecialist(!isSpecialist)}
                        checked={isSpecialist}
                    />
                </label>
                <label id='extended'>
                    <span>Описание специалиста:</span>
                    <textarea
                        placeholder='Введите описание специалиста'
                        value={specialistDescription}
                        onChange={e => setSpecialistDescription(e.target.value)}
                    />
                </label>
            </div>
            <div>
                <button
                    className='blue-shadow-button'
                    onClick={() => {
                        dispatch(adminSetSpecialist(rootState.auth.user.d_token, props.user.id, isSpecialist, specialistDescription))
                        props.onClose()
                    }}
                >
                    Сохранить изменения
                </button>
            </div>
            <button
                className='popup-close-button'
                onClick={() => props.onClose()}
            >
                <i className='fas fa-times' />
            </button>
        </div>
    </>;
};

export default AdminUserEditPopup;
