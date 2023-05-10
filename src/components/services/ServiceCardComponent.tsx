import * as React from 'react';
import { TServicesData } from '../../actions/services/types';
import '../../static/css/services.css';
import ServiceRatingTag from './ServiceRatingTag';

interface IServiceCardComponentProps {
    service: TServicesData
}

const ServiceCardComponent: React.FunctionComponent<IServiceCardComponentProps> = (props) => {
    return <>
        <div className='service-card-container'>
            <div className='service-card-header'>
                <div className='service-card-logo'>
                    <i className='fas fa-icons' />
                </div>
                <ServiceRatingTag />
            </div>
            <p className='service-card-name'>{props.service.name}</p>
            <span>Накрутка в социальных сетях</span>
            <p className='service-card-description'>{props.service.description?.text}</p>
        </div>
    </>;
};

export default ServiceCardComponent;
