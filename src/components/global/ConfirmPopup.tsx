import * as React from 'react';

interface IConfirmPopupProps {
    title: string,
    type: 'confirm' | 'delete',
    onConfirm: () => void,
    onClose: () => void
}

const ConfirmPopup: React.FunctionComponent<IConfirmPopupProps> = (props) => {
    return <>
        <div className='confirm-popup-container'>
            <h3>{props.title}</h3>

            {props.type === 'confirm' && <button className='blue-shadow-button' onClick={() => props.onConfirm()}>Подтверждаю</button>}

            {props.type === 'delete' && <>
                <button className='blue-shadow-button' onClick={() => props.onClose()}>Отмена</button>
                <button className='delete-button' onClick={() => props.onConfirm()}>Удалить</button>
            </>}
            <button className='popup-close-button' onClick={() => props.onClose()}><i className='fas fa-times' /></button>
        </div>
    </>;
};

export default ConfirmPopup;
