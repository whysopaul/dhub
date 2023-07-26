import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootStore } from '../../../store';
import { useDispatch } from 'react-redux';
import { useRef, useState } from 'react';
import { TServicesData } from '../../../actions/services/types';
import { useOnClickOutside } from '../../utils/HandleClickOutside';
import { useOnPopup } from '../../utils/HandleOnPopup';
import { createBlock } from '../../../actions/services/services';

interface IBlockAddPopupProps {
    onClose: () => void
}

const BlockAddPopup: React.FunctionComponent<IBlockAddPopupProps> = (props) => {

    const rootState = useSelector((state: RootStore) => state)

    const dispatch = useDispatch()

    const [title, setTitle] = useState('')
    const [collection, setCollection] = useState(-1)
    const [services, setServices] = useState<string[]>([])
    const [showAlert, setShowAlert] = useState(false)

    const ref = useRef(null)

    useOnClickOutside(ref, () => props.onClose())

    useOnPopup()

    const toggleService = e => {
        services.includes(e.target.value)
            ? setServices(services.filter(s => s != e.target.value))
            : setServices([...services, e.target.value])
    }

    return <>
        <div className='backdrop' />
        <div className='popup-container' ref={ref}>
            <h2>Создать блок</h2>
            <div className='popup-add-form'>
                <label>
                    <span>Название:</span>
                    <input
                        type='text'
                        placeholder='Введите название блока'
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                </label>
                <label>
                    <span>Подборка:</span>
                    <select
                        value={collection}
                        onChange={e => setCollection(parseInt(e.target.value))}
                    >
                        <option value='-1'>--------</option>
                        {rootState.services.collections.map(c => {
                            return <option value={c.id} key={c.id}>{c.title}</option>
                        })}
                    </select>
                </label>
                <label>
                    <span>Сервисы:</span>
                    <select
                        value={services}
                        onChange={toggleService}
                        multiple
                    >
                        <option value='-1'>--------</option>
                        {rootState.services.services.map(s => {
                            return <option value={s.id.toString()} key={s.id}>{s.name}</option>
                        })}
                    </select>
                </label>
            </div>
            {showAlert && <div>
                <p className='service-edit-alert'>Поля "Название" и "Подборка" должны быть заполнены</p>
            </div>}
            <div>
                <button
                    className='blue-shadow-button'
                    onClick={() => {
                        if (title.length > 0 && collection !== -1) {
                            dispatch(createBlock({
                                id: -1,
                                title,
                                collection,
                                service_ids: services.map(s => parseInt(s))
                            }))
                            setShowAlert(false)
                            props.onClose()
                        } else {
                            setShowAlert(true)
                        }
                    }}
                >
                    Создать блок
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

export default BlockAddPopup;
