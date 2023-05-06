import * as React from 'react';
import { TServicesData } from '../../actions/services/types';
import ServiceCardComponent from '../services/ServiceCardComponent';
import { Link } from 'react-router-dom';
import '../../static/css/home.css';
import ArticleCardComponent from '../articles/ArticleCardComponent';

interface IHomeSectionComponentProps {
    title: string,
    data: TServicesData[] | any[],
    qty: number,
    type: 'Services' | 'Articles'
}

const HomeSectionComponent: React.FunctionComponent<IHomeSectionComponentProps> = (props) => {
    return <>
        <div className='home-section-common-container'>
            <div className='home-services-header'>
                <h2>{props.title}</h2>

                {props.type === 'Services' && <Link to='/'>
                    <span>Показать все сервисы</span>
                    <i className='fas fa-long-arrow-alt-right' />
                </Link>}

                {props.type === 'Articles' && <div>
                    <button><i className='fas fa-chevron-left' /></button>
                    <button><i className='fas fa-chevron-right' /></button>
                </div>}
            </div>
            {props.type === 'Services' && <div className='home-services-cards'>
                {props.data.slice(0, props.qty).map(i => {
                    return <ServiceCardComponent service={i} />
                })}
            </div>}

            {props.type === 'Articles' && <div>
                {props.data.map(i => {
                    return <ArticleCardComponent article={i} />
                })}
            </div>}
        </div>
    </>;
};

export default HomeSectionComponent;
