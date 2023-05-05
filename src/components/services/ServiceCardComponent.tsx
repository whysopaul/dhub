import * as React from 'react';
import { TServicesData } from '../../actions/services/types';

interface IServiceCardComponentProps {
    service: TServicesData
}

const ServiceCardComponent: React.FunctionComponent<IServiceCardComponentProps> = (props) => {
    return <>
        <div>
            {/* <i className='fas fa-search' /> */}
            <p>{props.service.name}</p>
        </div>
    </>;
};

export default ServiceCardComponent;
