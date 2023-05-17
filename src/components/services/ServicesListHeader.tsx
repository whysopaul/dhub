import * as React from 'react';

interface IServicesListHeaderProps {
}

const ServicesListHeader: React.FunctionComponent<IServicesListHeaderProps> = (props) => {
    return <>
        <div className='services-header-search-container'>
            <input type='text' placeholder='Введите название сервиса' />
            <i className='fas fa-search color-white' />
        </div>
    </>;
};

export default ServicesListHeader;
