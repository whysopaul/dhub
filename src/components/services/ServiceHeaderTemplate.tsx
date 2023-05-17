import * as React from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styles from '../../static/css/Header.module.css';

interface IServiceHeaderTemplateProps {
    name: string
}

const ServiceHeaderTemplate: React.FunctionComponent<IServiceHeaderTemplateProps> = (props) => {

    const location = useLocation()
    // console.log(location.pathname.split('/'))

    const createBreadCrumbs = (i: string, name: string) => {
        switch (i) {
            case '':
                return <li><Link to='/'>Главная</Link></li>
            case 'service':
                return <li><Link to='/services'>Сервисы</Link></li>
            default:
                return <li><span>{name}</span></li>
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
        <div className={styles.breadcrumbs}>
            <ul>
                {location.pathname.split('/').map(i => createBreadCrumbs(i, props.name))}
            </ul>
        </div>
    </>;
};

export default ServiceHeaderTemplate;
