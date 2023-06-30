import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootStore } from '../../store';
import { Link } from 'react-router-dom';
import '../../static/css/user.css';
import { useEffect, useState } from 'react';
import { URL } from '../utils';

interface IUserProfileEditProps {
}

const UserProfileEdit: React.FunctionComponent<IUserProfileEditProps> = (props) => {

    const userState = useSelector((state: RootStore) => state.auth.user)

    useEffect(() => {
        if (!userState) {
            window.location.replace(URL)
        }
    }, [])

    const [firstName, setFirstName] = useState(userState?.name.split(' ')[0])
    const [lastName, setLastName] = useState(userState?.name.split(' ')[1])

    return <>
        {userState && <>
            <div>
                <h2 className='section-main-title'>Редактировать профиль</h2>
            </div>
            <div className='user-profile-edit-container'>
                <div className='user-profile-edit-photo'>
                    <img src={userState.photo} alt="" className='user-profile-large-photo' />
                    <input type='file' id='change-photo' className='user-profile-edit-photo-input' />
                    <label htmlFor='change-photo'><i className='fas fa-pen' /></label>
                </div>
                <div className='user-profile-edit-info'>
                    <input type='text' placeholder='Введите имя' value={firstName} onChange={e => setFirstName(e.target.value)} />
                    <input type='text' placeholder='Введите фамилию' value={lastName} onChange={e => setLastName(e.target.value)} />
                    <label>
                        <input type='checkbox' />
                        <span>Согласен на получение информационной и рекламной информации</span>
                    </label>
                    <label>
                        <input type='checkbox' />
                        <span>Ознакомлен с <Link to='/'>политикой обработки</Link> персональных данных</span>
                    </label>
                    <button className='blue-shadow-button'>
                        <span>Сохранить</span>
                        <i className='fas fa-long-arrow-alt-right' />
                    </button>
                </div>
                <div>
                    <button className='delete-button'>Удалить аккаунт</button>
                </div>
            </div>
        </>}
    </>;
};

export default UserProfileEdit;
