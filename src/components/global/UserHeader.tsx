import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootStore } from '../../store';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userLogout } from '../../actions/auth/auth';

interface IUserHeaderProps {
}

const UserHeader: React.FunctionComponent<IUserHeaderProps> = (props) => {

    const dispatch = useDispatch()

    const authState = useSelector((state: RootStore) => state.auth.user)

    return <>
        <div className='header-user'>
            <img src={authState.photo} alt="" />
            <Link to='/profile' title='Перейти в профиль'>{authState.name}</Link>
            <button className='header-user-logout-button' onClick={() => dispatch(userLogout())} title='Выйти из аккаунта'>
                <i className='fas fa-sign-out-alt' />
            </button>
        </div>
    </>;
};

export default UserHeader;
