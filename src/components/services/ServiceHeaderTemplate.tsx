import * as React from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styles from '../../static/css/Header.module.css';

interface IServiceHeaderTemplateProps {
    name: string
}

const ServiceHeaderTemplate: React.FunctionComponent<IServiceHeaderTemplateProps> = (props) => {

    const location = useLocation()
    console.log(location.pathname.split('/'))

    const createBreadCrumbs = (i: string) => {
        switch (i) {
            case '':
                return <Link to='/'>Главная</Link>
            case 'service':
                return <Link to='/'>Сервисы</Link>
            default:
                return <Link to={'/service/' + i}>{i}</Link>
        }
    }

    return <>
        <div className={styles.name}>
            <h1>{props.name}</h1>
            <Link to='/'>
                <span>Перейти в сервис</span>
                <i className='fas fa-long-arrow-alt-right' />
            </Link>
        </div>
        <div>
            {/* <Link to='/'>Главная</Link>•<Link to='/'>Сервисы</Link>•<Link to='/'>{props.name}</Link> */}
            {location.pathname.split('/').map(i => createBreadCrumbs(i))}
        </div>
    </>;
};

export default ServiceHeaderTemplate;
