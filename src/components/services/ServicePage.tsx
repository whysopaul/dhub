import * as React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootStore } from '../../store';
import { useState } from 'react';
import Header from '../global/Header';
import ServiceHeaderTemplate from './ServiceHeaderTemplate';

interface IServicePageProps {
}

const ServicePage: React.FunctionComponent<IServicePageProps> = (props) => {

    const convertServiceName = (name: string) => {
        return name.split(' ').join('').toLocaleLowerCase()
    }

    const { serviceName } = useParams()
    const serviceState = useSelector((state: RootStore) => state.services.services)
    const [currentService, setCurrentService] = useState(serviceState.find(i => convertServiceName(i.name) === serviceName))

    return <>
        {currentService && <Header template={<ServiceHeaderTemplate name={currentService.name} />} />}
        <h1>{currentService?.name}</h1>
        <p>{currentService?.description?.text}</p>
    </>;
};

export default ServicePage;
