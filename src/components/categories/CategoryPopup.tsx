import * as React from 'react';
import '../../static/css/popup.less';
import { useDispatch } from 'react-redux';
import { useRef, useState } from 'react';
import { useOnClickOutside } from '../utils/HandleClickOutside';
import { useOnPopup } from '../utils/HandleOnPopup';
import { createCategory, updateCategory } from '../../actions/categories/categories';
import { useSelector } from 'react-redux';
import { RootStore } from '../../store';
import { TCategory } from '../../actions/categories/types';

interface ICategoryPopupProps {
    category: TCategory,
    onClose: () => void
}

const CategoryPopup: React.FunctionComponent<ICategoryPopupProps> = (props) => {

    const categoriesState = useSelector((state: RootStore) => state.categories.categories)

    const dispatch = useDispatch()

    const [category, setCategory] = useState<TCategory>(props.category)
    const [showAlert, setShowAlert] = useState(false)

    const ref = useRef(null)

    useOnClickOutside(ref, () => props.onClose())

    useOnPopup()

    return <>
        <div className='backdrop' />
        <div className='popup-container' ref={ref}>
            <h2>{category.id === -1 ? 'Добавить категорию' : 'Редактирование категории'}</h2>
            <div className='popup-add-form'>
                <label>
                    <span>Название:</span>
                    <input
                        type='text'
                        placeholder='Введите название категории'
                        value={category.name}
                        onChange={e => setCategory({
                            ...category,
                            name: e.target.value
                        })}
                    />
                </label>
                <label>
                    <span>Индекс:</span>
                    <select
                        value={category.index}
                        onChange={e => setCategory({
                            ...category,
                            index: parseInt(e.target.value)
                        })}
                    >
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                    </select>
                </label>
                {category.index === 2 && <label>
                    <span>Родительская категория:</span>
                    <select
                        value={category.parent}
                        onChange={e => setCategory({
                            ...category,
                            parent: parseInt(e.target.value)
                        })}
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
                    if (category.name) {
                        if (category.id === -1) {
                            if (category.index === 2) {
                                dispatch(createCategory(category))
                            }
                            if (category.index !== 2) {
                                dispatch(createCategory({
                                    ...category,
                                    parent: null
                                }))
                            }
                        }
                        if (category.id !== -1) {
                            dispatch(updateCategory(category))
                        }
                        setShowAlert(false)
                        props.onClose()
                    } else {
                        setShowAlert(true)
                    }
                }}
                >
                    {category.id === -1 ? 'Добавить категорию' : 'Сохранить изменения'}
                </button>
            </div>
            <button className='popup-close-button' onClick={() => props.onClose()}><i className='fas fa-times' /></button>
        </div>
    </>;
};

export default CategoryPopup;
