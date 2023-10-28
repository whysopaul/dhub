import * as React from 'react';
import { TServicesBlock, TServicesDataSimple } from '../../../actions/services/types';
import { useSelector } from 'react-redux';
import { RootStore } from '../../../store';
import { useDispatch } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { useOnClickOutside } from '../../utils/HandleClickOutside';
import { useOnPopup } from '../../utils/HandleOnPopup';
import { deleteBlock, getBlock, updateBlock } from '../../../actions/services/services';
import Loading from '../../global/Loading';

interface IBlockEditPopupProps {
    block: TServicesBlock,
    onClose: () => void
}

const BlockEditPopup: React.FunctionComponent<IBlockEditPopupProps> = (props) => {

    const rootState = useSelector((state: RootStore) => state)

    const dispatch = useDispatch()

    const [currentBlock, setCurrentBlock] = useState<TServicesBlock>(null)
    const [serviceName, setServiceName] = useState('')
    const [showAlert, setShowAlert] = useState(false)

    const ref = useRef(null)

    useOnClickOutside(ref, () => props.onClose())

    useOnPopup()

    useEffect(() => {
        dispatch(getBlock(props.block.id))
    }, [])

    useEffect(() => {
        if (rootState.services.currentBlock?.id === props.block.id) {
            setCurrentBlock(rootState.services.currentBlock)
        }
    }, [, rootState.services.currentBlock])

    const toggleService = (service: TServicesDataSimple) => {
        currentBlock.service_ids.includes(service.id)
            ? setCurrentBlock({
                ...currentBlock,
                service_ids: currentBlock.service_ids.filter(s => s !== service.id)
            })
            : setCurrentBlock({
                ...currentBlock,
                service_ids: [...currentBlock.service_ids, service.id]
            })
    }

    return <>
        <div className='backdrop' />
        <div className='popup-container' ref={ref}>
            {currentBlock ? <>
                <h2>Редактирование блока</h2>
                <div className='popup-add-form'>
                    <label>
                        <span>Название:</span>
                        <input
                            type='text'
                            placeholder='Введите название блока'
                            value={currentBlock.title}
                            onChange={e => setCurrentBlock({
                                ...currentBlock,
                                title: e.target.value
                            })}
                        />
                    </label>
                    <label>
                        <span>Сервисы:</span>
                        <input
                            type='text'
                            placeholder='Поиск по сервисам'
                            value={serviceName}
                            onChange={e => setServiceName(e.target.value)}
                        />
                    </label>
                    {currentBlock.service_ids.length > 0 && <ul className='categories-list' id='services'>
                        {currentBlock.service_ids.map(s => rootState.services.services_simple_list.find(service => service.id === s)).map(s => {
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
                        {rootState.services.services_simple_list.filter(s => s.name.toLocaleLowerCase().includes(serviceName.toLocaleLowerCase()) && !currentBlock.service_ids.includes(s.id)).map(s => {
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
                            if (currentBlock.title.length > 0) {
                                dispatch(updateBlock(currentBlock))
                                setShowAlert(false)
                                props.onClose()
                            } else {
                                setShowAlert(true)
                            }
                        }}
                    >
                        Сохранить изменения
                    </button>
                </div>
                <div>
                    <button
                        className='delete-button'
                        onClick={() => {
                            if (confirm('Подтвердите удаление')) {
                                dispatch(deleteBlock(props.block.id, rootState.auth.user.d_token))
                                props.onClose()
                            }
                        }}
                    >
                        Удалить блок
                    </button>
                </div>
                <button
                    className='popup-close-button'
                    onClick={() => props.onClose()}
                >
                    <i className='fas fa-times' />
                </button>
            </> : <Loading height={400} />}
        </div>
    </>;
};

export default BlockEditPopup;
