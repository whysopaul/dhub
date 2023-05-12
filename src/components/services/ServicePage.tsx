import * as React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootStore } from '../../store';
import { useState } from 'react';
import Header from '../global/Header';
import ServiceHeaderTemplate from './ServiceHeaderTemplate';
import '../../static/css/services.css'
import ServiceRatingTag from './ServiceRatingTag';
import CategoryTag from '../categories/CategoryTag';

interface IServicePageProps {
}

const ServicePage: React.FunctionComponent<IServicePageProps> = (props) => {

    const convertServiceName = (name: string) => {
        return name.split(' ').join('').toLocaleLowerCase()
    }

    const { serviceName } = useParams()
    const serviceState = useSelector((state: RootStore) => state.services.services)
    const [currentService, setCurrentService] = useState(serviceState.find(i => convertServiceName(i.name) === serviceName))

    const categoriesState = useSelector((state: RootStore) => state.categories.categories)

    return <>
        {currentService && <Header template={<ServiceHeaderTemplate name={currentService.name} />} />}
        {currentService && <>
            <div className='service-categories-container'>
                <ul>
                    {currentService.categories.map(i => {
                        return <CategoryTag name={i.name} qty={i.id} />
                    })}
                </ul>
            </div>
            <div className='service-main-container'>
                <div>
                    <img src={currentService?.images?.logo} alt="" width='100px' />
                </div>
                <div className='service-full-desc'>
                    <h1>{currentService?.name}</h1>
                    <span>{currentService?.categories[0]?.name}</span>
                    <div className='service-rate'>
                        <ServiceRatingTag rating={currentService?.rating} />
                    </div>
                    <hr />
                    <p>{currentService?.description?.text}</p>
                    <div className='service-desc'>
                        <span>Бесплатная версия</span>
                        <span>{currentService.description?.isFree ? 'Да' : 'Нет'}</span>
                        <span>Пробный период</span>
                        <span>{currentService.description?.hasTrial ? 'Да' : 'Нет'}</span>
                        <span>Стоимость</span>
                        <span>{currentService.description?.price}</span>
                        <span>Способ оплаты</span>
                        <span>{currentService.description?.paymentMethod}</span>
                        <span>Дислокация</span>
                        <span>{currentService.description?.locations?.map(i => i.name).join(', ')}</span>
                        <span>Платформа</span>
                        <span>{currentService.description?.platforms?.map(i => i.name).join(', ')}</span>
                        <span>Партнерская программа</span>
                        <span>{currentService.description?.hasPartnership ? 'Да' : 'Нет'}</span>
                    </div>
                </div>
            </div>
        </>}
    </>;
};

export default ServicePage;
