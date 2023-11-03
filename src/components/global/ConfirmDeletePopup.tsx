import * as React from 'react';
import { useRef } from 'react';
import { useOnClickOutside } from '../utils/HandleClickOutside';
import { useOnPopup } from '../utils/HandleOnPopup';

interface IConfirmDeletePopupProps {
    title: string,
    onConfirm: () => void,
    onClose: () => void
}

const ConfirmDeletePopup: React.FunctionComponent<IConfirmDeletePopupProps> = (props) => {

    const ref = useRef(null)

    useOnClickOutside(ref, () => props.onClose())

    useOnPopup()

    return <>
        <div className='backdrop' />
        <div className='confirm-popup-container' ref={ref}>
            <h3>{props.title}</h3>
            <button className='blue-shadow-button' onClick={() => props.onClose()}>Отмена</button>
            <button className='delete-button' onClick={() => props.onConfirm()}>Удалить</button>
            <button className='popup-close-button' onClick={() => props.onClose()}><i className='fas fa-times' /></button>
        </div>
    </>;
};

export default ConfirmDeletePopup;
