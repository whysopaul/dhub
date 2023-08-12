import * as React from 'react';
import { TUserData } from '../../../actions/auth/types';
import { useSelector } from 'react-redux';
import { RootStore } from '../../../store';
import { useDispatch } from 'react-redux';
import { useRef, useState } from 'react';
import { useOnClickOutside } from '../../utils/HandleClickOutside';
import { useOnPopup } from '../../utils/HandleOnPopup';
import { adminSetSpecialist, adminUpdateSpecialistConnections } from '../../../actions/admin/admin';

interface IAdminUserEditPopupProps {
    user: TUserData,
    onClose: () => void
}

const AdminUserEditPopup: React.FunctionComponent<IAdminUserEditPopupProps> = (props) => {

    const rootState = useSelector((state: RootStore) => state)

    const dispatch = useDispatch()

    const [isSpecialist, setIsSpecialist] = useState<boolean>(props.user.is_specialist)
    const [specialistDescription, setSpecialistDescription] = useState<string>(props.user.specialist_description)
    const [specialistServices, setSpecialistServices] = useState<number[]>(props.user.specialist_services)

    const [serviceName, setServiceName] = useState('')

    const toggleService = (serviceId: number) => {
        specialistServices.includes(serviceId)
            ? setSpecialistServices(specialistServices.filter(s => s !== serviceId))
            : setSpecialistServices([...specialistServices, serviceId])
    }

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
                <label id='extended'>
                    <span>Сервисы:</span>
                    <input
                        type='text'
                        placeholder='Поиск по сервисам'
                        value={serviceName}
                        onChange={e => setServiceName(e.target.value)}
                    />
                </label>
                {specialistServices.length > 0 && <ul className='categories-list' id='services'>
                    {specialistServices.map(s => rootState.services.services.find(service => service.id === s)).map(s => {
                        return <li key={s.id}>
                            <button
                                className='category-tag active'
                                onClick={() => toggleService(s.id)}
                            >
                                {s.name}
                                <i className='fas fa-times' />
                            </button>
                        </li>
                    })}
                </ul>}
                <ul className='popup-list-scroll'>
                    {rootState.services.services.filter(s => s.name.toLocaleLowerCase().includes(serviceName.toLocaleLowerCase()) && !specialistServices.includes(s.id)).map(s => {
                        return <li key={s.id}>
                            <button
                                className='category-tag'
                                onClick={() => toggleService(s.id)}
                            >
                                {s.name}
                                <i className='fas fa-plus' />
                            </button>
                        </li>
                    })}
                </ul>
            </div>
            <div>
                <button
                    className='blue-shadow-button'
                    onClick={() => {
                        dispatch(adminSetSpecialist(rootState.auth.user.d_token, props.user.id, isSpecialist, specialistDescription))
                        dispatch(adminUpdateSpecialistConnections(rootState.auth.user.d_token, props.user.id, specialistServices))
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
