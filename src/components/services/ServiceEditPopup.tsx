import * as React from 'react';
import { useMemo, useRef, useState } from 'react';
import { useOnClickOutside } from '../utils/HandleClickOutside';
import { useOnPopup } from '../utils/HandleOnPopup';
import { TServiceLocation, TServicePlatform, TServicesData } from '../../actions/services/types';
import { useDispatch } from 'react-redux';
import { serviceDataUpdate } from '../../actions/services/services';
import { useSelector } from 'react-redux';
import { RootStore } from '../../store';
import { TCategory } from '../../actions/categories/types';

interface IServiceEditPopupProps {
    service: TServicesData,
    onClose: () => void
}

const ServiceEditPopup: React.FunctionComponent<IServiceEditPopupProps> = (props) => {

    const serviceState = useSelector((state: RootStore) => state.services)
    const categoriesState = useSelector((state: RootStore) => state.categories.categories)

    const [name, setName] = useState(props.service.name)
    const [description, setDescription] = useState(props.service.description.text)
    const [isFree, setIsFree] = useState(props.service.description.isFree)
    const [hasTrial, setHasTrial] = useState(props.service.description.hasTrial)
    const [hasPartnership, setHasPartnership] = useState(props.service.description.hasPartnership)
    const [price, setPrice] = useState(props.service.description.price)
    const [paymentMethod, setPaymentMethod] = useState(props.service.description.paymentMethod)
    const [locations, setLocations] = useState(props.service.description.locations)
    const [platforms, setPlatforms] = useState(props.service.description.platforms)
    const [categories, setCategories] = useState(props.service.categories_3)

    const [showAddCategoryPopup, setShowAddCategoryPopup] = useState(false)
    const [searchCategory, setSearchCategory] = useState('')
    const searchRef = useRef<HTMLInputElement>(null)
    const [showList, setShowList] = useState(false)
    const searchCategoryFilter = useMemo(() => {
        return categoriesState.filter(category => category.index === 3).filter(category => !categories.map(cat => cat.id).includes(category.id)).filter(category => category.name.toLocaleLowerCase().includes(searchCategory.toLocaleLowerCase()))
    }, [searchCategory, categories, categoriesState])

    const toggleLocation = (location: TServiceLocation) => {
        locations.map(loc => loc.id).includes(location.id)
            ? setLocations(locations.filter(loc => loc.id !== location.id))
            : setLocations([...locations, location])
    }

    const togglePlatform = (platform: TServicePlatform) => {
        platforms.map(pl => pl.id).includes(platform.id)
            ? setPlatforms(platforms.filter(pl => pl.id !== platform.id))
            : setPlatforms([...platforms, platform])
    }

    const toggleCategories = (category: TCategory) => {
        categories.map(cat => cat.id).includes(category.id)
            ? setCategories(categories.filter(cat => cat.id !== category.id))
            : setCategories([...categories, category])
    }

    const dispatch = useDispatch()

    const refOne = useRef(null)
    const refTwo = useRef(null)

    useOnClickOutside(showAddCategoryPopup ? refTwo : refOne, () => showAddCategoryPopup ? setShowAddCategoryPopup(false) : props.onClose())

    useOnPopup()

    return <>
        <div className='backdrop' />

        {showAddCategoryPopup && <>
            <div className='backdrop' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)', backdropFilter: 'blur(4px)', zIndex: 101 }} />
            <div className='service-edit-popup-add-category-popup' ref={refTwo}>
                <h3>Добавить категорию</h3>
                <div className='service-edit-popup-add-category-search'>
                    <input type='text' placeholder='Выберите категорию из списка' value={searchCategory} onChange={e => setSearchCategory(e.target.value)} onFocus={() => setShowList(true)} ref={searchRef} />
                    <button type='button' onClick={() => showList ? setShowList(false) : searchRef.current.focus()}>
                        <i className={`fas fa-caret-${showList ? 'up' : 'down'} color-blue cursor-pointer`} />
                    </button>
                </div>
                <ul className='service-edit-popup-add-category-list'>
                    {showList && searchCategoryFilter.map(category => {
                        return <li key={category.id}>
                            <button className='category-tag' onClick={() => toggleCategories(category)}>{category.name}<i className='fas fa-plus' /></button>
                        </li>
                    })}
                </ul>
                <button className='popup-close-button' onClick={() => setShowAddCategoryPopup(false)}><i className='fas fa-times' /></button>
            </div>
        </>}

        <div className='service-edit-popup-container' ref={refOne}>
            <h2>Редактирование сервиса</h2>
            <div className='service-edit-info'>
                <input type='text' value={name} onChange={e => setName(e.target.value)} />
                <textarea value={description} onChange={e => setDescription(e.target.value)} />
                <div className='service-edit-details'>
                    <label><span>Бесплатная версия:</span><input type='checkbox' checked={isFree} onChange={() => setIsFree(!isFree)} /></label>
                    <label><span>Пробный период:</span><input type='checkbox' checked={hasTrial} onChange={() => setHasTrial(!hasTrial)} /></label>
                    <label><span>Партнерская программа:</span><input type='checkbox' checked={hasPartnership} onChange={() => setHasPartnership(!hasPartnership)} /></label>
                    <label><span>Стоимость:</span><input type='text' value={price} onChange={e => setPrice(e.target.value)} /></label>
                    <label><span>Способ оплаты:</span><input type='text' value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)} /></label>
                    <p>Дислокация:</p>
                    <ul className='categories-list'>
                        {serviceState.locations?.map(location => {
                            return <li key={location.id}>
                                <button className={locations.find(loc => loc.id === location.id) ? 'category-tag active' : 'category-tag'} onClick={() => toggleLocation(location)}>{location.name}</button>
                            </li>
                        })}
                    </ul>
                    <p>Платформа:</p>
                    <ul className='categories-list'>
                        {serviceState.platforms?.map(platform => {
                            return <li key={platform.id}>
                                <button className={platforms.find(pl => pl.id === platform.id) ? 'category-tag active' : 'category-tag'} onClick={() => togglePlatform(platform)}>{platform.name}</button>
                            </li>
                        })}
                    </ul>
                    <p>Категории:</p>
                    <ul className='categories-list'>
                        {categories.map(category => {
                            return <li key={category.id}>
                                <button className='category-tag' onClick={() => toggleCategories(category)}>{category.name}<i className='fas fa-times' /></button>
                            </li>
                        })}
                        <li><button className='category-tag-add-category' onClick={() => setShowAddCategoryPopup(true)}><i className='fas fa-plus' /></button></li>
                    </ul>
                </div>
            </div>
            <div>
                <button className='blue-shadow-button' onClick={() => {
                    dispatch(serviceDataUpdate({
                        ...props.service,
                        name: name,
                        categories_3: categories,
                        description: {
                            ...props.service.description,
                            text: description,
                            isFree: isFree,
                            hasTrial: hasTrial,
                            hasPartnership: hasPartnership,
                            price: price,
                            paymentMethod: paymentMethod,
                            locations: locations,
                            platforms: platforms
                        }
                    })); props.onClose()
                }}>Сохранить изменения</button>
            </div>
            <button className='popup-close-button' onClick={() => props.onClose()}><i className='fas fa-times' /></button>
        </div>
    </>;
};

export default ServiceEditPopup;
