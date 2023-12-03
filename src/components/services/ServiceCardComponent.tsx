import * as React from 'react';
import { TServicesData } from '../../actions/services/types';
import '../../static/css/services.css';
import ServiceRatingTag from './ServiceRatingTag';
import { Link } from 'react-router-dom';
import { getImage, sliceDescription } from '../utils';

interface IServiceCardComponentProps {
    service: TServicesData
}

const ServiceCardComponent: React.FunctionComponent<IServiceCardComponentProps> = (props) => {

    const service = sliceDescription(props.service)

    return <>
        {props.service && <Link to={'/service/' + service.id} className='service-card-link'>
            <div className='service-card-container' itemScope itemType='https://schema.org/SoftwareApplication'>
                <div className='service-card-header'>
                    <div className='service-card-logo'>
                        <img src={getImage(service.images?.logo_file)} alt={service.name} loading='lazy' itemProp='image' />
                    </div>
                    {service.rating === 0 ? null : <ServiceRatingTag rating={service.rating} itemProp='aggregateRating' />}
                </div>
                <div>
                    <p className='service-card-name' itemProp='name'>{service.name}</p>
                    {/* <span className='service-card-category'>{props.service.categories_3.length > 0 && props.service.categories_3[0]?.name}</span> */}
                    <p className='service-card-description' itemProp='description'>{service.description?.text?.slice(0, 200) + '...'}</p>
                </div>
            </div>
        </Link>}
    </>;
};

export default ServiceCardComponent;
