import * as React from 'react';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useOnClickOutside } from '../../utils/HandleClickOutside';
import { useOnPopup } from '../../utils/HandleOnPopup';
import { createLocation, createPlatform } from '../../../actions/services/services';

interface ILocationsPlatformsAddPopupProps {
    onClose: () => void,
    action: 'location' | 'platform'
}

const LocationsPlatformsAddPopup: React.FunctionComponent<ILocationsPlatformsAddPopupProps> = (props) => {

    const dispatch = useDispatch()

    const [name, setName] = useState('')
    const [showAlert, setShowAlert] = useState(false)

    const ref = useRef(null)

    useOnClickOutside(ref, () => props.onClose())

    useOnPopup()

    return <>
        <div className='backdrop' />
        <div className='popup-container' ref={ref}>
            <h2>{`Добавить ${props.action === 'location' ? 'дислокацию' : 'платформу'}`}</h2>
            <div className='popup-add-form'>
                <label>
                    <span>Название:</span>
                    <input type='text' placeholder={`Введите название ${props.action === 'location' ? 'дислокации' : 'платформы'}`} value={name} onChange={e => setName(e.target.value)} />
                </label>
            </div>
            {showAlert && <div>
                <p className='service-edit-alert'>Поле "Название" должно быть заполнено</p>
            </div>}
            <div>
                <button className='blue-shadow-button' onClick={() => {
                    if (name) {
                        if (props.action === 'location') {
                            dispatch(createLocation(name))
                        }
                        if (props.action === 'platform') {
                            dispatch(createPlatform(name))
                        }
                        setShowAlert(false)
                        props.onClose()
                    } else {
                        setShowAlert(true)
                    }
                }}>{`Добавить ${props.action === 'location' ? 'дислокацию' : 'платформу'}`}</button>
            </div>
            <button className='popup-close-button' onClick={() => props.onClose()}><i className='fas fa-times' /></button>
        </div>
    </>;
};

export default LocationsPlatformsAddPopup;
