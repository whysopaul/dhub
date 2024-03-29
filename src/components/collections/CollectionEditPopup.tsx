import * as React from 'react';
import { TServicesBlock, TServicesCollection } from '../../actions/services/types';
import { useSelector } from 'react-redux';
import { RootStore } from '../../store';
import { useDispatch } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { getCollection, updateCollection } from '../../actions/services/services';
import Loading from '../global/Loading';
import { useOnClickOutside } from '../utils/HandleClickOutside';
import { useOnPopup } from '../utils/HandleOnPopup';

interface ICollectionEditPopupProps {
    collection: TServicesCollection,
    onClose: () => void
}

const CollectionEditPopup: React.FunctionComponent<ICollectionEditPopupProps> = (props) => {

    const rootState = useSelector((state: RootStore) => state)

    const dispatch = useDispatch()

    const [currentCollection, setCurrentCollection] = useState<TServicesCollection>(null)
    const [showAlert, setShowAlert] = useState(false)

    const ref = useRef(null)

    useOnClickOutside(ref, () => props.onClose())

    useOnPopup()

    useEffect(() => {
        dispatch(getCollection(props.collection.id))
    }, [])

    useEffect(() => {
        if (rootState.services.currentCollection?.id === props.collection.id) {
            setCurrentCollection(rootState.services.currentCollection)
        }
    }, [, rootState.services.currentCollection])

    const toggleBlock = (block: TServicesBlock) => {
        currentCollection.connections.map(c => c.block).includes(block.id)
            ? setCurrentCollection({
                ...currentCollection,
                connections: currentCollection.connections.filter(c => c.block !== block.id)
            })
            : setCurrentCollection({
                ...currentCollection,
                connections: [...currentCollection.connections, { collection: currentCollection.id, block: block.id }]
            })
    }

    return <>
        <div className='backdrop' />
        <div className='popup-container' ref={ref}>
            {currentCollection ? <>
                <h2>Редактирование подборки</h2>
                <div className='popup-add-form'>
                    <label>
                        <span>Название:</span>
                        <input
                            type='text'
                            placeholder='Введите название подборки'
                            value={currentCollection.title}
                            onChange={e => setCurrentCollection({
                                ...currentCollection,
                                title: e.target.value
                            })}
                        />
                    </label>
                    <p>Блоки:</p>
                    {currentCollection.connections.length > 0 && <ul className='categories-list' id='blocks'>
                        {rootState.services.blocks.filter(b => currentCollection.connections.map(b_c => b_c.block).includes(b.id)).map(b => {
                            return <li key={b.id}>
                                <button
                                    className='category-tag active'
                                    onClick={() => toggleBlock(b)}
                                >
                                    {b.title}
                                    <i className='fas fa-times' />
                                </button>
                            </li>
                        })}
                    </ul>}
                    <ul className='categories-list' id='services'>
                        {rootState.services.blocks?.filter(b => !currentCollection.connections.map(b_c => b_c.block).includes(b.id)).map(b => {
                            return <li key={b.id}>
                                <button
                                    className='category-tag'
                                    onClick={() => toggleBlock(b)}
                                >
                                    {b.title}
                                    <i className='fas fa-plus' />
                                </button>
                            </li>
                        })}
                    </ul>
                </div>
                {showAlert && <div>
                    <p className='service-edit-alert'>Подборка должна содержать название и блоки</p>
                </div>}
                <div>
                    <button
                        className='blue-shadow-button'
                        onClick={() => {
                            if (currentCollection.title.length > 0 && currentCollection.connections.length > 0) {
                                dispatch(updateCollection(currentCollection))
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

export default CollectionEditPopup;
