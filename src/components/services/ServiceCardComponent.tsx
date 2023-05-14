import * as React from 'react';
import { TServicesData } from '../../actions/services/types';
import '../../static/css/services.css';
import ServiceRatingTag from './ServiceRatingTag';
import { Link } from 'react-router-dom';
import { createServiceLink } from '../utils';

interface IServiceCardComponentProps {
    service: TServicesData
}

const ServiceCardComponent: React.FunctionComponent<IServiceCardComponentProps> = (props) => {
    return <>
        <div className='service-card-container'>
            <div className='service-card-header'>
                <Link to={'/service/' + createServiceLink(props.service.name)}>
                    <div className='service-card-logo'>
                        <img src={props.service.images?.logo} alt={props.service.name} />
                    </div>
                </Link>
                <ServiceRatingTag rating={props.service.rating} />
            </div>
            <Link to={'/service/' + createServiceLink(props.service.name)}><p className='service-card-name'>{props.service.name}</p></Link>
            <span className='service-card-category'>{props.service.categories[0]?.name}</span>
            <p className='service-card-description'>{props.service.description?.text?.slice(0, 60) + '...'}</p>
        </div>
    </>;
};

export default ServiceCardComponent;
