import * as React from 'react';
import Logo from '../../static/images/logo.svg'
import { Link } from 'react-router-dom';

interface IFooterProps {
}

const Footer: React.FunctionComponent<IFooterProps> = (props) => {
    return <>
        <footer>
            <div className='home-header'>
                <img src={Logo} alt='digital.hub' />
                <div className='home-header-navigation'>
                    <Link to='/'>Сервисы</Link>
                    <Link to='/'>Отзывы</Link>
                    <Link to='/'>Статьи и обзоры</Link>
                </div>
                <button><i className='fab fa-vk' /></button>
                <button><i className='fab fa-telegram-plane' /></button>
                <button><i className='fab fa-whatsapp' /></button>
            </div>
            <div>
                <p>На все вопросы с радостью ответим на горячей линии:</p>
                <h3>+7 (999) 999-99-99</h3>
            </div>
            <div>
                <div>
                    <p>ИП Крестинин К.И.</p>
                    <p>ИНН 745104702135</p>
                    <p>ОГРН 319745600113724</p>
                </div>
                <div>
                    <Link to='/'>Политика конфиденциальности</Link>
                    <Link to='/'>Договор оферты</Link>
                </div>
            </div>
        </footer>
    </>;
};

export default Footer;
