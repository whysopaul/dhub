import * as React from 'react';
import '../../static/css/popup.less';
import { useDispatch } from 'react-redux';
import { useRef, useState } from 'react';
import { useOnClickOutside } from '../utils/HandleClickOutside';
import { useOnPopup } from '../utils/HandleOnPopup';
import { createCategory } from '../../actions/categories/categories';
import { useSelector } from 'react-redux';
import { RootStore } from '../../store';

interface ICategoryAddPopupProps {
    onClose: () => void
}

const CategoryAddPopup: React.FunctionComponent<ICategoryAddPopupProps> = (props) => {

    const categoriesState = useSelector((state: RootStore) => state.categories.categories)

    const dispatch = useDispatch()

    const [name, setName] = useState('')
    const [index, setIndex] = useState(1)
    const [parentId, setParentId] = useState<number>(null)
    const [showAlert, setShowAlert] = useState(false)

    const ref = useRef(null)

    useOnClickOutside(ref, () => props.onClose())

    useOnPopup()

    return <>
        <div className='backdrop' />
        <div className='popup-container' ref={ref}>
            <h2>Добавить категорию</h2>
            <div className='popup-add-form'>
                <label>
                    <span>Название:</span>
                    <input type='text' placeholder='Введите название категории' value={name} onChange={e => setName(e.target.value)} />
                </label>
                <label>
                    <span>Индекс:</span>
                    <select value={index} onChange={e => setIndex(parseInt(e.target.value))}>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                    </select>
                </label>
                {index === 2 && <label>
                    <span>Родительская категория:</span>
                    <select
                        value={parentId}
                        onChange={e => setParentId(parseInt(e.target.value))}
                    >
                        <option value=''>--------</option>
                        {categoriesState.filter(c => c.index === 1).map(c => {
                            return <option value={c.id} key={c.id}>{c.name}</option>
                        })}
                    </select>
                </label>}
            </div>
            {showAlert && <div>
                <p className='service-edit-alert'>Поле "Название" должно быть заполнено</p>
            </div>}
            <div>
                <button className='blue-shadow-button' onClick={() => {
                    if (name) {
                        if (index === 2) {
                            dispatch(createCategory(name, index, parentId))
                        }
                        if (index !== 2) {
                            dispatch(createCategory(name, index))
                        }
                        setShowAlert(false)
                        props.onClose()
                    } else {
                        setShowAlert(true)
                    }
                }}>Добавить категорию</button>
            </div>
            <button className='popup-close-button' onClick={() => props.onClose()}><i className='fas fa-times' /></button>
        </div>
    </>;
};

export default CategoryAddPopup;
