import * as React from 'react';
import Logo from '../../static/images/logo_transparent.svg';
import { Link } from 'react-router-dom';
import styles from '../../static/css/Footer.module.css'
import Navigation from './Navigation';

interface IFooterProps {
}

const Footer: React.FunctionComponent<IFooterProps> = (props) => {
    return <>
        <footer style={styles}>
            <div className={styles.wrapper}>
                <img src={Logo} alt='digital.hub' />
                <div className={styles.navigation}>
                    <Navigation />
                </div>
                <div className={styles.buttons}>
                    <button><i className='fab fa-vk' /></button>
                    <button><i className='fab fa-telegram-plane' /></button>
                    <button><i className='fab fa-whatsapp' /></button>
                </div>
                <div className={styles.phone}>
                    <p>На все вопросы с радостью ответим на горячей линии:</p>
                    <h3>+7 (999) 999-99-99</h3>
                </div>
                <div className={styles.info}>
                    <div className={styles.docs}>
                        <Link to='/'>Политика конфиденциальности</Link>
                        <Link to='/'>Договор оферты</Link>
                    </div>
                    <div className={styles.credentials}>
                        <p>ИП Крестинин К.И.</p>
                        <br />
                        <p>ИНН 745104702135</p>
                        <br />
                        <p>ОГРН 319745600113724</p>
                    </div>
                </div>
                <div className={styles.copyright}>
                    <p>Санкт-Петербург, 2023. Все права защищены.</p>
                </div>
            </div>
        </footer>
    </>;
};

export default Footer;
