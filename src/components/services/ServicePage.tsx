import * as React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootStore } from '../../store';
import { useState } from 'react';
import Header from '../global/Header';
import ServiceHeaderTemplate from './ServiceHeaderTemplate';
import '../../static/css/services.css';
import ServiceRatingTag from './ServiceRatingTag';
import CategoryTag from '../categories/CategoryTag';
import Banner from '../../static/images/service_banner.webp'

interface IServicePageProps {
}

const ServicePage: React.FunctionComponent<IServicePageProps> = (props) => {

    const convertServiceName = (name: string) => {
        return name.split(' ').join('').toLocaleLowerCase()
    }

    const { serviceName } = useParams()
    const serviceState = useSelector((state: RootStore) => state.services.services)
    const [currentService, setCurrentService] = useState(serviceState.find(i => convertServiceName(i.name) === serviceName))

    // const categoriesState = useSelector((state: RootStore) => state.categories.categories)

    return <>
        {currentService && <Header template={<ServiceHeaderTemplate name={currentService.name} />} />}
        {currentService && <>
            <div className='service-page-wrapper'>
                <div className='service-page-categories'>
                    <ul>
                        {currentService.categories.map(i => {
                            return <CategoryTag name={i.name} qty={i.id} />
                        })}
                    </ul>
                </div>
                <div className='service-main-container'>
                    <div>
                        <img src={currentService.images.logo} alt="" width='100px' />
                    </div>
                    <div className='service-info'>
                        <h1>{currentService.name}</h1>
                        <span>{currentService.categories[0]?.name}</span>
                        <div className='service-rating-section'>
                            <ServiceRatingTag rating={currentService.rating} />
                        </div>
                        <hr />
                        <p>{currentService.description.text}</p>
                        <div className='service-banner-wrapper'>
                            <div className='service-banner-container'>
                                <div>
                                    <h3>Специалист в этом сервисе?</h3>
                                    <button>
                                        <span>Регистрируйся</span>
                                        <i className='fas fa-long-arrow-alt-right' />
                                    </button>
                                </div>
                                <div>
                                    <img src={Banner} alt="" />
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className='service-details'>
                            <span>Бесплатная версия</span>
                            <span className='service-details-data'>{currentService.description.isFree ? 'Да' : 'Нет'}</span>
                            <span>Пробный период</span>
                            <span className='service-details-data'>{currentService.description.hasTrial ? 'Да' : 'Нет'}</span>
                            <span>Стоимость</span>
                            <span className='service-details-data'>{currentService.description.price}</span>
                            <span>Способ оплаты</span>
                            <span className='service-details-data'>{currentService.description.paymentMethod}</span>
                            <span>Дислокация</span>
                            <span className='service-details-data'>{currentService.description.locations?.map(i => i.name).join(', ')}</span>
                            <span>Платформа</span>
                            <span className='service-details-data'>{currentService.description.platforms?.map(i => i.name).join(', ')}</span>
                            <span>Партнерская программа</span>
                            <span className='service-details-data'>{currentService.description.hasPartnership ? 'Да' : 'Нет'}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>}
    </>;
};

export default ServicePage;
