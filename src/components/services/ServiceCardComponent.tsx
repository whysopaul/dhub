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
                <div className='service-card-logo'>
                    <img src={props.service.images?.logo} alt="" />
                </div>
                <ServiceRatingTag rating={props.service.rating} />
            </div>
            <Link to={'/service/' + props.service.name.split(' ').join('').toLocaleLowerCase()}><p className='service-card-name'>{props.service.name}</p></Link>
            <span>Накрутка в социальных сетях</span>
            <p className='service-card-description'>{props.service.description?.text?.slice(0, 60) + '...'}</p>
        </div>
    </>;
};

export default ServiceCardComponent;
