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
            <div className='home-section-title'>
                <h2>{props.title}</h2>
            </div>
            <div className={props.extended ? 'home-services-cards extended' : 'home-services-cards'}>
                {props.data.slice(0, props.qty).map(i => {
                    return <ServiceCardComponent service={i} key={i.id} />
                })}
            </div>
            <div className='home-section-link'>
                <Link to='/results' className='arrow-right-link'>
                    <span>Показать все сервисы</span>
                    <i className='fas fa-long-arrow-alt-right' />
                </Link>
            </div>
        </div>
    </>;
};

export default HomeServicesComponent;
