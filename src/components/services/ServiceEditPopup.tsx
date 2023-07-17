import * as React from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useOnClickOutside } from '../utils/HandleClickOutside';
import { useOnPopup } from '../utils/HandleOnPopup';
import { TServiceLocation, TServicePlatform, TServicesData } from '../../actions/services/types';
import { useDispatch } from 'react-redux';
import { createScreenshot, deleteService, getService, serviceDataUpdate, serviceUpdateLink } from '../../actions/services/services';
import { useSelector } from 'react-redux';
import { RootStore } from '../../store';
import { TCategory } from '../../actions/categories/types';
import Loading from '../global/Loading';

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

    // const [screenshots, setScreenshots] = useState<{ id: number, name: string, source: string, service_id: number }[]>([])

    useEffect(() => {
        if (props.is_empty) {
            dispatch(getService(props.service.id))
        }
    }, [])

    useEffect(() => {
        if (serviceState.currentService?.id === props.service.id) {
            setCurrentService(serviceState.currentService)
        }
    }, [, serviceState.currentService])

    const [showAddMainCategoryPopup, setShowAddMainCategoryPopup] = useState(false)
    const [showAddCategoryPopup, setShowAddCategoryPopup] = useState(false)
    const [searchCategory, setSearchCategory] = useState('')
    const searchRef = useRef<HTMLInputElement>(null)
    const [showList, setShowList] = useState(false)

    const searchMainCategoryFilter = useMemo(() => {
        return categoriesState
            .filter(category => category.index === 2)
            .filter(category => !currentService?.categories_2.map(cat => cat.id).includes(category.id))
            .filter(category => category.name.toLocaleLowerCase().includes(searchCategory.toLocaleLowerCase()))
    }, [searchCategory, currentService?.categories_2, categoriesState])

    const searchCategoryFilter = useMemo(() => {
        return categoriesState
            .filter(category => category.index === 3)
            .filter(category => !currentService?.categories_3.map(cat => cat.id).includes(category.id))
            .filter(category => category.name.toLocaleLowerCase().includes(searchCategory.toLocaleLowerCase()))
    }, [searchCategory, currentService?.categories_3, categoriesState])

    const toggleLocation = (location: TServiceLocation) => {
        currentService.description.locations.map(loc => loc.id).includes(location.id)
            ? setCurrentService({
                ...currentService,
                description: {
                    ...currentService.description,
                    locations: currentService.description.locations.filter(loc => loc.id !== location.id)
                }
            })
            : setCurrentService({
                ...currentService,
                description: {
                    ...currentService.description,
                    locations: [...currentService.description.locations, location]
                }
            })
    }

    const togglePlatform = (platform: TServicePlatform) => {
        currentService.description.platforms.map(pl => pl.id).includes(platform.id)
            ? setCurrentService({
                ...currentService,
                description: {
                    ...currentService.description,
                    platforms: currentService.description.platforms.filter(pl => pl.id !== platform.id)
                }
            })
            : setCurrentService({
                ...currentService,
                description: {
                    ...currentService.description,
                    platforms: [...currentService.description.platforms, platform]
                }
            })
    }

    const toggleMainCategories = (category: TCategory) => {
        currentService.categories_2.map(cat => cat.id).includes(category.id)
            ? setCurrentService({
                ...currentService,
                categories_2: currentService.categories_2.filter(cat => cat.id !== category.id)
            })
            : setCurrentService({
                ...currentService,
                categories_2: [...currentService.categories_2, category]
            })
    }

    const toggleCategories = (category: TCategory) => {
        currentService.categories_3.map(cat => cat.id).includes(category.id)
            ? setCurrentService({
                ...currentService,
                categories_3: currentService.categories_3.filter(cat => cat.id !== category.id)
            })
            : setCurrentService({
                ...currentService,
                categories_3: [...currentService.categories_3, category]
            })
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
                    <input
                        type='text'
                        placeholder='Выберите категорию из списка'
                        value={searchCategory}
                        onChange={e => setSearchCategory(e.target.value)}
                        onFocus={() => setShowList(true)}
                        ref={searchRef}
                    />
                    <button
                        type='button'
                        onClick={() => showList ? setShowList(false) : searchRef.current.focus()}
                    >
                        <i className={`fas fa-caret-${showList ? 'up' : 'down'} color-blue cursor-pointer`} />
                    </button>
                </div>
                <ul className='service-edit-popup-add-category-list'>
                    {showList && searchMainCategoryFilter.map(category => {
                        return <li key={category.id}>
                            <button
                                className='category-tag'
                                onClick={() => toggleMainCategories(category)}
                            >
                                {category.name}
                                <i className='fas fa-plus' />
                            </button>
                        </li>
                    })}
                </ul>
                <button
                    className='popup-close-button'
                    onClick={() => setShowAddMainCategoryPopup(false)}
                >
                    <i className='fas fa-times' />
                </button>
            </div>
        </>}

        {showAddCategoryPopup && <>
            <div className='backdrop' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)', backdropFilter: 'blur(4px)', zIndex: 101 }} />
            <div className='service-edit-popup-add-category-popup' ref={refTwo}>
                <h3>Добавить подкатегорию</h3>
                <div className='service-edit-popup-add-category-search'>
                    <input
                        type='text'
                        placeholder='Выберите категорию из списка'
                        value={searchCategory}
                        onChange={e => setSearchCategory(e.target.value)}
                        onFocus={() => setShowList(true)}
                        ref={searchRef}
                    />
                    <button
                        type='button'
                        onClick={() => showList ? setShowList(false) : searchRef.current.focus()}
                    >
                        <i className={`fas fa-caret-${showList ? 'up' : 'down'} color-blue cursor-pointer`} />
                    </button>
                </div>
                <ul className='service-edit-popup-add-category-list'>
                    {showList && searchCategoryFilter.map(category => {
                        return <li key={category.id}>
                            <button
                                className='category-tag'
                                onClick={() => toggleCategories(category)}
                            >
                                {category.name}
                                <i className='fas fa-plus' />
                            </button>
                        </li>
                    })}
                </ul>
                <button
                    className='popup-close-button'
                    onClick={() => setShowAddCategoryPopup(false)}
                >
                    <i className='fas fa-times' />
                </button>
            </div>
        </>}

        <div className='service-edit-popup-container' ref={refOne}>
            {currentService ? <>
                <h2>{props.add ? 'Добавить сервис' : 'Редактирование сервиса'}</h2>
                <div className='service-edit-info'>
                    <input
                        type='text'
                        placeholder='Название сервиса'
                        value={currentService.name}
                        onChange={e => setCurrentService({
                            ...currentService,
                            name: e.target.value
                        })}
                    />
                    <textarea
                        placeholder='Описание сервиса'
                        value={currentService.description.text}
                        onChange={e => setCurrentService({
                            ...currentService,
                            description: {
                                ...currentService.description,
                                text: e.target.value
                            }
                        })}
                    />
                    <div className='service-edit-details'>
                        <label>
                            <span>Бесплатная версия:</span>
                            <input
                                type='checkbox'
                                checked={currentService.description.isFree}
                                onChange={() => setCurrentService({
                                    ...currentService,
                                    description: {
                                        ...currentService.description,
                                        isFree: !currentService.description.isFree
                                    }
                                })}
                            />
                        </label>
                        <label>
                            <span>Пробный период:</span>
                            <input
                                type='checkbox'
                                checked={currentService.description.hasTrial}
                                onChange={() => setCurrentService({
                                    ...currentService,
                                    description: {
                                        ...currentService.description,
                                        hasTrial: !currentService.description.hasTrial
                                    }
                                })}
                            />
                        </label>
                        <label>
                            <span>Партнерская программа:</span>
                            <input
                                type='checkbox'
                                checked={currentService.description.hasPartnership}
                                onChange={() => setCurrentService({
                                    ...currentService,
                                    description: {
                                        ...currentService.description,
                                        hasPartnership: !currentService.description.hasPartnership
                                    }
                                })}
                            />
                        </label>
                        <label>
                            <span>Стоимость:</span>
                            <input
                                type='text'
                                placeholder='напр.: от 1000 р. в месяц'
                                value={currentService.description.price}
                                onChange={e => setCurrentService({
                                    ...currentService,
                                    description: {
                                        ...currentService.description,
                                        price: e.target.value
                                    }
                                })}
                            />
                        </label>
                        <label>
                            <span>Способ оплаты:</span>
                            <input
                                type='text'
                                placeholder='напр.: ежемесячно, по подписке'
                                value={currentService.description.paymentMethod}
                                onChange={e => setCurrentService({
                                    ...currentService,
                                    description: {
                                        ...currentService.description,
                                        paymentMethod: e.target.value
                                    }
                                })}
                            />
                        </label>
                        <p>Дислокация:</p>
                        <ul className='categories-list'>
                            {serviceState.locations?.map(location => {
                                return <li key={location.id}>
                                    <button
                                        className={currentService.description.locations.find(loc => loc.id === location.id) ? 'category-tag active' : 'category-tag'}
                                        onClick={() => toggleLocation(location)}
                                    >
                                        {location.name}
                                    </button>
                                </li>
                            })}
                        </ul>
                        <p>Платформа:</p>
                        <ul className='categories-list'>
                            {serviceState.platforms?.map(platform => {
                                return <li key={platform.id}>
                                    <button
                                        className={currentService.description.platforms.find(pl => pl.id === platform.id) ? 'category-tag active' : 'category-tag'}
                                        onClick={() => togglePlatform(platform)}
                                    >
                                        {platform.name}
                                    </button>
                                </li>
                            })}
                        </ul>
                        <p>Категории:</p>
                        <ul className='categories-list'>
                            {currentService.categories_2.map(category => {
                                return <li key={category.id}>
                                    <button
                                        className='category-tag'
                                        onClick={() => toggleMainCategories(category)}
                                    >
                                        {category.name}
                                        <i className='fas fa-times' />
                                    </button>
                                </li>
                            })}
                            <li>
                                <button
                                    className='category-tag-add-category'
                                    onClick={() => setShowAddMainCategoryPopup(true)}
                                >
                                    <i className='fas fa-plus' />
                                </button>
                            </li>
                        </ul>
                        <p>Подкатегории:</p>
                        <ul className='categories-list'>
                            {currentService.categories_3.map(category => {
                                return <li key={category.id}>
                                    <button
                                        className='category-tag'
                                        onClick={() => toggleCategories(category)}
                                    >
                                        {category.name}
                                        <i className='fas fa-times' />
                                    </button>
                                </li>
                            })}
                            <li>
                                <button
                                    className='category-tag-add-category'
                                    onClick={() => setShowAddCategoryPopup(true)}
                                >
                                    <i className='fas fa-plus' />
                                </button>
                            </li>
                        </ul>
                        <p>Ссылка:</p>
                        <div className='service-edit-link-container'>
                            <input
                                type='text'
                                placeholder='http://'
                                value={currentService.link}
                                onChange={e => setCurrentService({
                                    ...currentService,
                                    link: e.target.value
                                })}
                            />
                            <button
                                className='blue-shadow-button'
                                onClick={() => dispatch(serviceUpdateLink(currentService.link, props.service.id))}
                            >
                                Обновить ссылку
                            </button>
                        </div>
                        {!props.add && <>
                            <p>Скриншоты:</p>
                            <div className='service-edit-screenshots-container'>
                                {currentService.images.screenshots.map((s, idx) => {
                                    return <>
                                        <span>{idx + 1}.</span>
                                        <input
                                            type='text'
                                            placeholder='Ссылка на скриншот'
                                            value={s.source}
                                            onChange={e => setCurrentService({
                                                ...currentService,
                                                images: {
                                                    ...currentService.images,
                                                    screenshots: currentService.images.screenshots.map(screen => {
                                                        if (screen.id === s.id) {
                                                            return {
                                                                ...screen,
                                                                source: e.target.value
                                                            }
                                                        }
                                                        return screen
                                                    })
                                                }
                                            })}
                                        />
                                        <button
                                            className='service-edit-secondary-button'
                                            onClick={() => setCurrentService({
                                                ...currentService,
                                                images: {
                                                    ...currentService.images,
                                                    screenshots: currentService.images.screenshots.filter(screen => screen.id !== s.id)
                                                }
                                            })}
                                        >
                                            <i className='fas fa-minus' />
                                        </button>
                                        <button
                                            className='blue-shadow-button'
                                            onClick={() => dispatch(createScreenshot(s.name, s.source, s.service))}
                                        >
                                            <i className='fas fa-save' />
                                        </button>
                                    </>
                                })}
                                <button
                                    className='service-edit-secondary-button add-screenshot'
                                    onClick={() => setCurrentService({
                                        ...currentService,
                                        images: {
                                            ...currentService.images,
                                            screenshots: [
                                                ...currentService.images.screenshots,
                                                {
                                                    id: currentService.images.screenshots.length > 0 ? currentService.images.screenshots[currentService.images.screenshots.length - 1].id + 1 : 1,
                                                    source: '',
                                                    link: '',
                                                    service: currentService.id
                                                }
                                            ]
                                        }
                                    })}>
                                    <i className='fas fa-plus' />
                                    Добавить поле
                                </button>
                            </div>
                        </>}
                        <p>Заметки:</p>
                        <textarea
                            value={currentService.admin_notes}
                            onChange={e => setCurrentService({
                                ...currentService,
                                admin_notes: e.target.value
                            })}
                        />
                    </div>
                </div>

                {showAlert && <div>
                    <p className='service-edit-alert'>Пожалуйста, заполните все поля ввода и выберите минимум одну категорию и подкатегорию</p>
                </div>}

                <div>
                    <button
                        className='blue-shadow-button'
                        onClick={() => {
                            if (currentService.name
                                &&
                                currentService.link
                                &&
                                currentService.categories_2.length > 0
                                &&
                                currentService.categories_3.length > 0
                                &&
                                currentService.description.text
                                &&
                                currentService.description.price
                                &&
                                currentService.description.paymentMethod
                                &&
                                currentService.description.locations.length > 0
                                &&
                                currentService.description.platforms.length > 0) {
                                dispatch(serviceDataUpdate(currentService))
                                setShowAlert(false)
                                props.onClose()
                            } else {
                                setShowAlert(true)
                            }
                        }}
                    >
                        {props.add ? 'Добавить сервис' : 'Сохранить изменения'}
                    </button>
                </div>

                {!props.add && <div>
                    <button
                        className='delete-button'
                        onClick={() => {
                            if (confirm('Подтвердите удаление сервиса')) dispatch(deleteService(props.service.id, userState?.d_token))
                        }}
                    >
                        Удалить сервис
                    </button>
                </div>}

                <button
                    className='popup-close-button'
                    onClick={() => props.onClose()}
                >
                    <i className='fas fa-times' />
                </button>
            </> : <Loading height={505} />}
        </div>
    </>;
};

export default ServiceEditPopup;
