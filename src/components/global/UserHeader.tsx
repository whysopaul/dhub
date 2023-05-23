import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootStore } from '../../store';
import styles from '../../static/css/Header.module.css';
import { Link } from 'react-router-dom';

interface IUserHeaderProps {
}

const UserHeader: React.FunctionComponent<IUserHeaderProps> = (props) => {

    const authState = useSelector((state: RootStore) => state.auth.user)

    return <>
        <div className={styles.user}>
            <img src={authState.photo} alt="" />
            <Link to='/profile' title='Перейти в профиль'>{authState.name}</Link>
        </div>
    </>;
};

export default UserHeader;
