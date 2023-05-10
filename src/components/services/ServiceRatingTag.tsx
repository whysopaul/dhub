import * as React from 'react';
import '../../static/css/services.css';

interface IServiceRatingTagProps {
}

const ServiceRatingTag: React.FunctionComponent<IServiceRatingTagProps> = (props) => {
    return <>
        <div className='service-rating-tag'>
            <i className='fas fa-star' />
            <span>75</span>
        </div>
    </>;
};

export default ServiceRatingTag;
