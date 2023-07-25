import * as React from 'react';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useOnClickOutside } from '../utils/HandleClickOutside';
import { useOnPopup } from '../utils/HandleOnPopup';
import { createCollection } from '../../actions/services/services';

interface ICollectionAddPopupProps {
    onClose: () => void
}

const CollectionAddPopup: React.FunctionComponent<ICollectionAddPopupProps> = (props) => {

    const dispatch = useDispatch()

    const [title, setTitle] = useState('')
    const [showAlert, setShowAlert] = useState(false)

    const ref = useRef(null)

    useOnClickOutside(ref, () => props.onClose())

    useOnPopup()

    return <>
        <div className='backdrop' />
        <div className='popup-container' ref={ref}>
            <h2>Создать подборку</h2>
            <div className='popup-add-form'>
                <label>
                    <span>Название:</span>
                    <input
                        type='text'
                        placeholder='Введите название подборки'
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                </label>
            </div>
            {showAlert && <div>
                <p className='service-edit-alert'>Поле "Название" должно быть заполнено</p>
            </div>}
            <div>
                <button
                    className='blue-shadow-button'
                    onClick={() => {
                        if (title) {
                            dispatch(createCollection({
                                id: -1,
                                title,
                                blocks: []
                            }))
                            setShowAlert(false)
                            props.onClose()
                        } else {
                            setShowAlert(true)
                        }
                    }}
                >
                    Создать подборку
                </button>
            </div>
            <button
                className='popup-close-button'
                onClick={() => props.onClose()}
            >
                <i className='fas fa-times' />
            </button>
        </div>
    </>;
};

export default CollectionAddPopup;
