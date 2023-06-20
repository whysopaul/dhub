import * as React from 'react';
import { TServicesData } from '../../actions/services/types';
import '../../static/css/services.css';
import ServiceRatingTag from './ServiceRatingTag';
import { Link } from 'react-router-dom';

interface IServiceCardComponentProps {
    service: TServicesData
}

const ServiceCardComponent: React.FunctionComponent<IServiceCardComponentProps> = (props) => {
    return <>
        <div className='service-card-container'>
            <div className='service-card-header'>
                <Link to={'/service/' + props.service.id}>
                    <div className='service-card-logo'>
                        <img src={props.service.images?.logo} alt={props.service.name} />
                    </div>
                </Link>
                <ServiceRatingTag rating={props.service.rating} />
            </div>
            <div>
                <Link to={'/service/' + props.service.id}><p className='service-card-name'>{props.service.name}</p></Link>
                <span className='service-card-category'>{props.service.categories_3[0]?.name}</span>
                <p className='service-card-description'>{props.service.description?.text?.slice(0, 100) + '...'}</p>
            </div>
        </div>
    </>;
};

export default ServiceCardComponent;
