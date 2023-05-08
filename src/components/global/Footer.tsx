import * as React from 'react';
import Logo from '../../static/images/logo.svg'
import { Link } from 'react-router-dom';
import styles from '../../static/css/Footer.module.css'
import Navigation from './Navigation';

interface IFooterProps {
}

const Footer: React.FunctionComponent<IFooterProps> = (props) => {
    return <>
        <footer style={styles.footer}>
            <div className={styles.footerTop}>
                <img src={Logo} alt='digital.hub' />
                <div className={styles.navigation}>
                    <Navigation />
                </div>
                <button><i className='fab fa-vk' /></button>
                <button><i className='fab fa-telegram-plane' /></button>
                <button><i className='fab fa-whatsapp' /></button>
            </div>
            <div>
                <p>На все вопросы с радостью ответим на горячей линии:</p>
                <h3>+7 (999) 999-99-99</h3>
            </div>
            <div className={styles.footerBottom}>
                <div>
                    <p>ИП Крестинин К.И.</p>
                    <br />
                    <p>ИНН 745104702135</p>
                    <br />
                    <p>ОГРН 319745600113724</p>
                </div>
                <div className={styles.docs}>
                    <Link to='/'>Политика конфиденциальности</Link>
                    <Link to='/'>Договор оферты</Link>
                </div>
            </div>
        </footer>
    </>;
};

export default Footer;
