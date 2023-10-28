import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootStore } from '../../../store';
import { useDispatch } from 'react-redux';
import { useRef, useState } from 'react';
import { TServicesDataSimple } from '../../../actions/services/types';
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
    // const [collection, setCollection] = useState(-1)
    const [serviceName, setServiceName] = useState('')
    const [services, setServices] = useState<TServicesDataSimple[]>([])
    const [showAlert, setShowAlert] = useState(false)

    const ref = useRef(null)

    useOnClickOutside(ref, () => props.onClose())

    useOnPopup()

    const toggleService = (service: TServicesDataSimple) => {
        services.map(s => s.id).includes(service.id)
            ? setServices(services.filter(s => s.id !== service.id))
            : setServices([...services, service])
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
                {/* <label>
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
                </label> */}
                <label>
                    <span>Сервисы:</span>
                    {/* <select
                        value={services}
                        onChange={toggleService}
                        multiple
                    >
                        <option value='-1'>--------</option>
                        {rootState.services.services.map(s => {
                            return <option value={s.id.toString()} key={s.id}>{s.name}</option>
                        })}
                    </select> */}
                    <input
                        type='text'
                        placeholder='Поиск по сервисам'
                        value={serviceName}
                        onChange={e => setServiceName(e.target.value)}
                    />
                </label>
                {services.length > 0 && <ul className='categories-list' id='services'>
                    {services.map(s => {
                        return <li key={s.id}>
                            <button
                                className='category-tag active'
                                onClick={() => toggleService(s)}
                            >
                                {s.name}
                                <i className='fas fa-times' />
                            </button>
                        </li>
                    })}
                </ul>}
                <ul className='popup-list-scroll'>
                    {rootState.services.services_simple_list.filter(s => s.name.toLocaleLowerCase().includes(serviceName.toLocaleLowerCase()) && !services.map(service => service.id).includes(s.id)).map(s => {
                        return <li key={s.id}>
                            <button
                                className='category-tag'
                                onClick={() => toggleService(s)}
                            >
                                {s.name}
                                <i className='fas fa-plus' />
                            </button>
                        </li>
                    })}
                </ul>
            </div>
            {showAlert && <div>
                <p className='service-edit-alert'>Поле "Название" должно быть заполнено</p>
            </div>}
            <div>
                <button
                    className='blue-shadow-button'
                    onClick={() => {
                        if (title.length > 0) {
                            dispatch(createBlock({
                                id: -1,
                                title,
                                service_ids: services.map(s => s.id)
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
