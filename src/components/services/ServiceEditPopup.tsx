import * as React from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useOnClickOutside } from '../utils/HandleClickOutside';
import { useOnPopup } from '../utils/HandleOnPopup';
import { TServiceLocation, TServicePlatform, TServicesData } from '../../actions/services/types';
import { useDispatch } from 'react-redux';
import { deleteService, getService, serviceDataUpdate, serviceUpdateLink } from '../../actions/services/services';
import { useSelector } from 'react-redux';
import { RootStore } from '../../store';
import { TCategory } from '../../actions/categories/types';

interface IServiceEditPopupProps {
    service: TServicesData,
    onClose: () => void,
    add?: boolean,
    is_empty?: boolean
}

const ServiceEditPopup: React.FunctionComponent<IServiceEditPopupProps> = (props) => {

    const userState = useSelector((state: RootStore) => state.auth.user)
    const serviceState = useSelector((state: RootStore) => state.services)
    const categoriesState = useSelector((state: RootStore) => state.categories.categories)

    const [currentService, setCurrentService] = useState<TServicesData>(props.is_empty ? null : props.service)

    useEffect(() => {
        if (props.is_empty) {
            dispatch(getService(props.service.id))
        }
    }, [])

    useEffect(() => {
        if (serviceState.currentService?.id === props.service.id) {
            setCurrentService(serviceState.currentService)
            console.log(serviceState.currentService)
        }
    }, [, serviceState.currentService])

    const [name, setName] = useState(props.service.name)
    const [link, setLink] = useState(props.service.link)
    const [description, setDescription] = useState(props.service.description.text)
    const [isFree, setIsFree] = useState(props.service.description.isFree)
    const [hasTrial, setHasTrial] = useState(props.service.description.hasTrial)
    const [hasPartnership, setHasPartnership] = useState(props.service.description.hasPartnership)
    const [price, setPrice] = useState(props.service.description.price)
    const [paymentMethod, setPaymentMethod] = useState(props.service.description.paymentMethod)
    const [locations, setLocations] = useState(props.service.description.locations)
    const [platforms, setPlatforms] = useState(props.service.description.platforms)
    const [mainCategories, setMainCategories] = useState(props.service.categories_2)
    const [categories, setCategories] = useState(props.service.categories_3)
    const [adminNotes, setAdminNotes] = useState(props.service.admin_notes)

    const [showAddMainCategoryPopup, setShowAddMainCategoryPopup] = useState(false)
    const [showAddCategoryPopup, setShowAddCategoryPopup] = useState(false)
    const [searchCategory, setSearchCategory] = useState('')
    const searchRef = useRef<HTMLInputElement>(null)
    const [showList, setShowList] = useState(false)

    const searchMainCategoryFilter = useMemo(() => {
        return categoriesState.filter(category => category.index === 2).filter(category => !mainCategories.map(cat => cat.id).includes(category.id)).filter(category => category.name.toLocaleLowerCase().includes(searchCategory.toLocaleLowerCase()))
    }, [searchCategory, mainCategories, categoriesState])

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

    const toggleMainCategories = (category: TCategory) => {
        mainCategories.map(cat => cat.id).includes(category.id)
            ? setMainCategories(mainCategories.filter(cat => cat.id !== category.id))
            : setMainCategories([...mainCategories, category])
    }

    const toggleCategories = (category: TCategory) => {
        categories.map(cat => cat.id).includes(category.id)
            ? setCategories(categories.filter(cat => cat.id !== category.id))
            : setCategories([...categories, category])
    }

    const [showAlert, setShowAlert] = useState(false)

    const dispatch = useDispatch()

    const refOne = useRef(null)
    const refTwo = useRef(null)

    useOnClickOutside((showAddMainCategoryPopup || showAddCategoryPopup) ? refTwo : refOne, () => showAddMainCategoryPopup ? setShowAddMainCategoryPopup(false) : showAddCategoryPopup ? setShowAddCategoryPopup(false) : props.onClose())

    useOnPopup()

    return <>
        <div className='backdrop' />

        {showAddMainCategoryPopup && <>
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
                    {showList && searchMainCategoryFilter.map(category => {
                        return <li key={category.id}>
                            <button className='category-tag' onClick={() => toggleMainCategories(category)}>{category.name}<i className='fas fa-plus' /></button>
                        </li>
                    })}
                </ul>
                <button className='popup-close-button' onClick={() => setShowAddMainCategoryPopup(false)}><i className='fas fa-times' /></button>
            </div>
        </>}

        {showAddCategoryPopup && <>
            <div className='backdrop' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)', backdropFilter: 'blur(4px)', zIndex: 101 }} />
            <div className='service-edit-popup-add-category-popup' ref={refTwo}>
                <h3>Добавить подкатегорию</h3>
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
            <h2>{props.add ? 'Добавить сервис' : 'Редактирование сервиса'}</h2>
            <div className='service-edit-info'>
                <input type='text' placeholder='Название сервиса' value={name} onChange={e => setName(e.target.value)} />
                <textarea placeholder='Описание сервиса' value={description} onChange={e => setDescription(e.target.value)} />
                <div className='service-edit-details'>
                    <label><span>Бесплатная версия:</span><input type='checkbox' checked={isFree} onChange={() => setIsFree(!isFree)} /></label>
                    <label><span>Пробный период:</span><input type='checkbox' checked={hasTrial} onChange={() => setHasTrial(!hasTrial)} /></label>
                    <label><span>Партнерская программа:</span><input type='checkbox' checked={hasPartnership} onChange={() => setHasPartnership(!hasPartnership)} /></label>
                    <label><span>Стоимость:</span><input type='text' placeholder='напр.: от 1000 р. в месяц' value={price} onChange={e => setPrice(e.target.value)} /></label>
                    <label><span>Способ оплаты:</span><input type='text' placeholder='напр.: ежемесячно, по подписке' value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)} /></label>
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
                        {mainCategories.map(category => {
                            return <li key={category.id}>
                                <button className='category-tag' onClick={() => toggleMainCategories(category)}>{category.name}<i className='fas fa-times' /></button>
                            </li>
                        })}
                        <li><button className='category-tag-add-category' onClick={() => setShowAddMainCategoryPopup(true)}><i className='fas fa-plus' /></button></li>
                    </ul>
                    <p>Подкатегории:</p>
                    <ul className='categories-list'>
                        {categories.map(category => {
                            return <li key={category.id}>
                                <button className='category-tag' onClick={() => toggleCategories(category)}>{category.name}<i className='fas fa-times' /></button>
                            </li>
                        })}
                        <li><button className='category-tag-add-category' onClick={() => setShowAddCategoryPopup(true)}><i className='fas fa-plus' /></button></li>
                    </ul>
                    <div className='service-edit-link-container'>
                        <label>
                            <span>Ссылка:</span>
                            <input type='text' placeholder='http://' value={link} onChange={e => setLink(e.target.value)} />
                        </label>
                        <button className='blue-shadow-button' onClick={() => dispatch(serviceUpdateLink(link, props.service.id))}>Обновить ссылку</button>
                    </div>
                    <p>Заметки:</p>
                    <textarea value={adminNotes} onChange={e => setAdminNotes(e.target.value)}></textarea>
                </div>
            </div>

            {showAlert && <div>
                <p className='service-edit-alert'>Пожалуйста, заполните все поля ввода и выберите минимум одну категорию и подкатегорию</p>
            </div>}

            <div>
                <button className='blue-shadow-button' onClick={() => {
                    if (name && link && mainCategories.length > 0 && categories.length > 0 && description && price && paymentMethod && locations.length > 0 && platforms.length > 0) {
                        dispatch(serviceDataUpdate({
                            ...props.service,
                            name: name,
                            categories_2: mainCategories,
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
                            },
                            admin_notes: adminNotes
                        }))
                        setShowAlert(false)
                        props.onClose()
                    } else {
                        setShowAlert(true)
                    }
                }}>{props.add ? 'Добавить сервис' : 'Сохранить изменения'}</button>
            </div>

            {!props.add && <div>
                <button className='delete-button' onClick={() => {
                    if (confirm('Подтвердите удаление сервиса')) dispatch(deleteService(props.service.id, userState?.d_token))
                }}>Удалить сервис</button>
            </div>}

            <button className='popup-close-button' onClick={() => props.onClose()}><i className='fas fa-times' /></button>
        </div>
    </>;
};

export default ServiceEditPopup;
