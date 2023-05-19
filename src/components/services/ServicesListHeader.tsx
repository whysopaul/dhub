import * as React from 'react';
import { useEffect, useState } from 'react';
import ServiceSelection from './ServiceSelection';
import { closePopup, openPopup } from '../utils';

interface IServicesListHeaderProps {
    value: string,
    setValue: (input: string) => void
}

const ServicesListHeader: React.FunctionComponent<IServicesListHeaderProps> = (props) => {

    const [showServiceSelection, setShowServiceSelection] = useState(false)

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search)
        if (urlParams.has('search')) {
            props.setValue(urlParams.get('search'))
        }
    }, [])

    return <>

        {showServiceSelection && <ServiceSelection onClose={() => closePopup(setShowServiceSelection)} />}

        <div className='services-list-search-container'>
            <input type='text' placeholder='Введите название сервиса' value={props.value} onChange={e => props.setValue(e.target.value)} />
            <div>
                <i className='fas fa-search color-white' />
                <button className='services-list-search-settings' onClick={() => openPopup(setShowServiceSelection)}><i className='fas fa-sliders-h color-white' /></button>
            </div>
        </div>
    </>;
};

export default ServicesListHeader;
