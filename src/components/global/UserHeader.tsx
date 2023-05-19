import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootStore } from '../../store';
import styles from '../../static/css/Header.module.css';

interface IUserHeaderProps {
}

const UserHeader: React.FunctionComponent<IUserHeaderProps> = (props) => {

    const authState = useSelector((state: RootStore) => state.auth.user)

    return <>
        <div className={styles.user}>
            <img src={authState.photo} alt="" />
            <a href={'https://vk.com/id' + authState.vk_id} target='_blank' rel='noopener noreferrer'>{authState.name}</a>
        </div>
    </>;
};

export default UserHeader;
