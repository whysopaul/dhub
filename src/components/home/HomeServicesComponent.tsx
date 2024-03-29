import * as React from 'react';
import { TServicesData } from '../../actions/services/types';
import ServiceCardComponent from '../services/ServiceCardComponent';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootStore } from '../../store';
import ServiceCardMockup from '../services/ServiceCardMockup';

interface IHomeServicesComponentProps {
    title: string,
    data: TServicesData[],
    qty: number,
    sortModeLink?: 'new' | 'free' | 'top',
    extended?: boolean
}

const HomeServicesComponent: React.FunctionComponent<IHomeServicesComponentProps> = (props) => {

    const servicesLoading = useSelector((state: RootStore) => state.services.is_loading)

    return <>
        <div className='home-section-common-container'>
            <div className='home-section-title'>
                <h2>{props.title}</h2>
            </div>
            <div className={props.extended ? 'home-services-cards extended' : 'home-services-cards'}>
                {servicesLoading ? <ServiceCardMockup qty={props.qty >= 8 ? (props.qty === 10 ? 10 : 5) : 3} /> : props.data.slice(0, props.qty).map(i => {
                    return <ServiceCardComponent service={i} key={i.id} />
                })}
            </div>
            <div className='home-section-link'>
                <Link to={props.sortModeLink ? props.sortModeLink === 'new' && '/services?recent=true' || props.sortModeLink === 'free' && '/services?isFree=true' || props.sortModeLink === 'top' && '/services?rating=top' : '/services'} className='arrow-right-link'>
                    <span>Показать все сервисы</span>
                    <i className='fas fa-long-arrow-alt-right' />
                </Link>
            </div>
        </div>
    </>;
};

export default HomeServicesComponent;
