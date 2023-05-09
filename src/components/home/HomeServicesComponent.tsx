import * as React from 'react';
import { TServicesData } from '../../actions/services/types';
import ServiceCardComponent from '../services/ServiceCardComponent';
import { Link } from 'react-router-dom';

interface IHomeServicesComponentProps {
    title: string,
    data: TServicesData[],
    qty: number,
    extended?: boolean
}

const HomeServicesComponent: React.FunctionComponent<IHomeServicesComponentProps> = (props) => {
    return <>
        <div className='home-section-common-container'>
            <div className='home-section-header'>
                <h2>{props.title}</h2>
                <Link to='/'>
                    <span>Показать все сервисы</span>
                    <i className='fas fa-long-arrow-alt-right' />
                </Link>
            </div>
            <div className={props.extended ? 'home-services-cards extended' : 'home-services-cards'}>
                {props.data.slice(0, props.qty).map(i => {
                    return <ServiceCardComponent service={i} />
                })}
            </div>
        </div>
    </>;
};

export default HomeServicesComponent;
