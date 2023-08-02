import * as React from 'react';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useOnClickOutside } from '../utils/HandleClickOutside';
import { useOnPopup } from '../utils/HandleOnPopup';
import { useSelector } from 'react-redux';
import { RootStore } from '../../store';
import { TCategory } from '../../actions/categories/types';
import { createCategoryRelations } from '../../actions/categories/categories';

interface ICategoryRelationsAddPopupProps {
    onClose: () => void
}

const CategoryRelationsAddPopup: React.FunctionComponent<ICategoryRelationsAddPopupProps> = (props) => {

    const categoriesState = useSelector((state: RootStore) => state.categories.categories)

    const dispatch = useDispatch()

    const [child, setChild] = useState<TCategory>(null)
    const [parent, setParent] = useState<TCategory>(null)
    const [showAlert, setShowAlert] = useState(false)

    const ref = useRef(null)

    useOnClickOutside(ref, () => props.onClose())

    useOnPopup()

    return <>
        <div className='backdrop' />
        <div className='popup-container' ref={ref}>
            <h2>Привязать категорию</h2>
            <div className='popup-add-form'>
                <label>
                    <span>Дочерняя категория:</span>
                    <select value={child?.id} onChange={e => setChild(categoriesState.find(c => c.id === parseInt(e.target.value)))}>
                        <option value="-1">--------</option>
                        {categoriesState.filter(c => c.index === 2).map(c => {
                            return <option value={c.id} key={c.id}>{c.id + ' - ' + c.index + ' - ' + c.name}</option>
                        })}
                    </select>
                </label>
                <div className='popup-link-icon'>
                    <i className='fas fa-link' />
                </div>
                <label>
                    <span>Родительская категория:</span>
                    <select value={parent?.id} onChange={e => setParent(categoriesState.find(c => c.id === parseInt(e.target.value)))}>
                        <option value="-1">--------</option>
                        {categoriesState.filter(c => c.index === 1).map(c => {
                            return <option value={c.id} key={c.id}>{c.id + ' - ' + c.index + ' - ' + c.name}</option>
                        })}
                    </select>
                </label>
            </div>
            {showAlert && <div>
                <p className='service-edit-alert'>Выберите по одной категории из каждого списка</p>
            </div>}
            <div>
                <button className='blue-shadow-button' onClick={() => {
                    if (child && parent) {
                        dispatch(createCategoryRelations(child.id, parent.id))
                        setShowAlert(false)
                        props.onClose()
                    } else {
                        setShowAlert(true)
                    }
                }}>Привязать категорию</button>
            </div>
            <button className='popup-close-button' onClick={() => props.onClose()}><i className='fas fa-times' /></button>
        </div>
    </>;
};

export default CategoryRelationsAddPopup;
