import * as React from 'react';
import Logo from '../../static/images/logo_transparent.svg';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';

interface IFooterProps {
}

const Footer: React.FunctionComponent<IFooterProps> = (props) => {
    return <>
        <footer className='footer'>
            <div className='footer-wrapper'>
                <img src={Logo} alt='digital.hub' />
                <div className='footer-navigation'>
                    <Navigation />
                </div>
                <div className='footer-social-networks-buttons'>
                    <button><i className='fab fa-vk' /></button>
                    <button><i className='fab fa-telegram-plane' /></button>
                    <button><i className='fab fa-whatsapp' /></button>
                </div>
                <div className='footer-phone'>
                    <p>На все вопросы с радостью ответим на горячей линии:</p>
                    <h3>+7 (999) 999-99-99</h3>
                </div>
                <div className='footer-info'>
                    <div className='footer-doc-links'>
                        <Link to='/'>Политика конфиденциальности</Link>
                        <Link to='/'>Договор оферты</Link>
                    </div>
                    <div className='footer-credentials'>
                        <p>ИП Крестинин К.И.</p>
                        <br />
                        <p>ИНН 745104702135</p>
                        <br />
                        <p>ОГРН 319745600113724</p>
                    </div>
                </div>
                <div className='footer-copyright'>
                    <p>Москва, 2023. Все права защищены.</p>
                </div>
            </div>
        </footer>
    </>;
};

export default Footer;
