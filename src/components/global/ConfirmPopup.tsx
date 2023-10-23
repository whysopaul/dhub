import * as React from 'react';

interface IConfirmPopupProps {
    title: string,
    onConfirm: () => void,
    onClose: () => void
}

const ConfirmPopup: React.FunctionComponent<IConfirmPopupProps> = (props) => {
    return <>
        <div className='confirm-popup-container'>
            <h3>{props.title}</h3>
            <button className='blue-shadow-button' onClick={() => props.onConfirm()}>Подтверждаю</button>
            <button className='popup-close-button' onClick={() => props.onClose()}><i className='fas fa-times' /></button>
        </div>
    </>;
};

export default ConfirmPopup;
