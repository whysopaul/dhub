import * as React from 'react';
import { TServicesData } from '../../actions/services/types';
import ServiceCardComponent from './ServiceCardComponent';

interface IServicesHomeComponentProps {
    title: string,
    data: TServicesData[]
}

const ServicesHomeComponent: React.FunctionComponent<IServicesHomeComponentProps> = (props) => {
    return <>
        <div>
            <div>
                <h2>{props.title}</h2>
                <span>Показать все сервисы</span>
            </div>
            {props.data.map(i => {
                return <>
                    <ServiceCardComponent service={i} />
                </>
            })}
        </div>
    </>;
};

export default ServicesHomeComponent;
