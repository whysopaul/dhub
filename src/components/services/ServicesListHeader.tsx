import * as React from 'react';

interface IServicesListHeaderProps {
    value: string,
    setValue: (input: string) => void
}

const ServicesListHeader: React.FunctionComponent<IServicesListHeaderProps> = (props) => {
    return <>
        <div className='services-header-search-container'>
            <input type='text' placeholder='Введите название сервиса' value={props.value} onChange={e => props.setValue(e.target.value)} />
            <div>
                <i className='fas fa-search color-white' />
                <button className='services-header-search-settings'><i className='fas fa-sliders-h color-white' /></button>
            </div>
        </div>
    </>;
};

export default ServicesListHeader;
