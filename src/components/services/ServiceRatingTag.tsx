import * as React from 'react';
import '../../static/css/services.css';

interface IServiceRatingTagProps {
    rating: number
}

const ServiceRatingTag: React.FunctionComponent<IServiceRatingTagProps> = (props) => {
    return <>
        <div className='service-rating-tag'>
            <i className='fas fa-star' />
            <span>{props.rating}</span>
        </div>
    </>;
};

export default ServiceRatingTag;
