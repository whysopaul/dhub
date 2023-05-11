import * as React from 'react';
import Logo from '../../static/images/logo_transparent.svg';
import Navigation from './Navigation';
import Login from './Login';
import styles from '../../static/css/Header.module.css';

interface IHeaderProps {
    template: React.ReactElement
}

const Header: React.FunctionComponent<IHeaderProps> = (props) => {
    return <>
        <header style={styles}>
            <div className={styles.wrapper}>
                <div className={styles.navbar}>
                    <img src={Logo} alt="" />
                    <div className={styles.navigation}>
                        <Navigation />
                    </div>
                    <Login />
                </div>
                {props.template}
            </div>
        </header>
    </>;
};

export default Header;
