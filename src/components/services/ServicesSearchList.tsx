import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootStore } from '../../store';
import CategoryTag from '../categories/CategoryTag';
import ServiceCardComponent from './ServiceCardComponent';
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { TServicesData } from '../../actions/services/types';
import { TCategory } from '../../actions/categories/types';
import { useOnClickOutside } from '../utils/HandleClickOutside';
import { URL, countriesList } from '../utils';
import { useNavigate, useParams } from 'react-router';
import { Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ServiceCardMockup from './ServiceCardMockup';
import { useDispatch } from 'react-redux';
import { getSearch } from '../../actions/services/services';

interface IServicesSearchListProps {
}

const ServicesSearchList: React.FunctionComponent<IServicesSearchListProps> = (props) => {

    const { pageNumber } = useParams()

    const navigate = useNavigate()
    const location = useLocation()

    const dispatch = useDispatch()

    const rootState = useSelector((state: RootStore) => state)

    const [search, setSearch] = useState('')
    const [isFree, setIsFree] = useState<boolean>(null)
    const [hasTrial, setHasTrial] = useState<boolean>(null)
    const [hasPartnership, setHasPartnership] = useState<boolean>(null)
    const [paymentMethods, setPaymentMethods] = useState<number[]>([])
    const [searchCategories, setSearchCategories] = useState('')
    const [selectedCategories, setSelectedCategories] = useState<number[]>([])
    const [searchByName, setSearchByName] = useState(true)
    const [searchByText, setSearchByText] = useState(true)
    const [country, setCountry] = useState('')
    const [collection, setCollection] = useState<number>(null)
    const [currentPage, setCurrentPage] = useState(1)

    const [showDropdown, setShowDropdown] = useState(false)
    const dropdownRef = useRef(null)
    useOnClickOutside(dropdownRef, () => setShowDropdown(false))

    const paymentMethodOne = ['по подписке', 'ежемесячно', 'ежегодно', 'посуточно', 'ежеквартально', 'месяц', 'ежедневно', 'еженедельно', 'поквартально', 'подписка', 'ежечасно', 'покупка баллов']
    const paymentMethodTwo = ['за действие', 'за время', 'комиссия', 'нефиксированная', 'нефикс', 'за услугу', 'за число кликов', 'поштучно']
    const paymentMethodThree = ['разовая', 'покупка лицензии', 'за пакет', 'фиксированный']

    const [sortMode, setSortMode] = useState<string>('default')

    const [isParamsChecked, setIsParamsChecked] = useState(false)

    useEffect(() => {
        if (isParamsChecked) {
            dispatch(getSearch({ search_string: search, include_name: searchByName, include_description: searchByText, is_free: isFree, has_trial: hasTrial, has_partnership: hasPartnership, country, categories_ids: selectedCategories, collection_id: collection }, currentPage, numberOfServices))
        }
    }, [, isParamsChecked, search, isFree, hasTrial, hasPartnership, searchByName, searchByText, country, selectedCategories, collection, currentPage])

    const searchSource = (): TServicesData[] => {
        if (collection !== -1)
            return rootState.services.services.filter(s => rootState.services.blocks.filter(b => rootState.services.collections.find(c => c.id === collection).connections.map(b_c => b_c.block).includes(b.id)).flatMap(b => b.service_ids).includes(s.id))
        return rootState.services.services
    }

    /* const searchCondition: TServicesData[] = searchSource().map(service => {
        return {
            ...service,
            description: {
                ...service.description,
                paymentMethod: service.description.paymentMethod.includes('нефиксированный') ? 'нефикс' : service.description.paymentMethod
            }
        }
    }).filter(service =>
        (searchByName && !searchByText ? service.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()) : true)
        &&
        (!searchByName && searchByText ? service.description.text.toLocaleLowerCase().includes(search.toLocaleLowerCase()) : true)
        &&
        (searchByName && searchByText ? service.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()) || service.description.text.toLocaleLowerCase().includes(search.toLocaleLowerCase()) : true)
        &&
        service.description.isFree !== isNotFree
        &&
        service.description.hasTrial !== hasNoTrial
        &&
        service.description.hasPartnership !== hasNoPartnership
        &&
        (selectedCategories.length > 0 ? service.categories_2?.find(category => selectedCategories.includes(category.id)) || service.categories_3?.find(category => selectedCategories.includes(category.id)) : true)
        &&
        (paymentMethods.length > 0 ? paymentMethods.some(paymentMethod => paymentMethod === 1 ? paymentMethodOne.some(p_m => service.description.paymentMethod.includes(p_m)) : paymentMethod === 2 ? paymentMethodTwo.some(p_m => service.description.paymentMethod.includes(p_m)) : paymentMethod === 3 ? paymentMethodThree.some(p_m => service.description.paymentMethod.includes(p_m)) : true) : true)
        &&
        (country === '' ? true : service.description.country === country)
    ).sort((a, b) => {
        if (sortMode === 'new') {
            return b.id - a.id
        }
        if (sortMode === 'top') {
            return b.rating - a.rating
        }
        if (sortMode === 'a-z') {
            if (a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()) return -1
            if (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) return 1
            return 0
        }
        if (sortMode === 'z-a') {
            if (a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()) return 1
            if (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) return -1
            return 0
        }
        return
    }) */

    const searchCategoriesCondition = rootState.categories.categories.filter(category => category.index === 3).filter(category => category.name.toLocaleLowerCase().includes(searchCategories.toLocaleLowerCase()))

    const toggleCategory = (category: TCategory) => {
        selectedCategories.includes(category.id)
            ? setSelectedCategories(selectedCategories.filter(cat => cat !== category.id))
            : setSelectedCategories([...selectedCategories, category.id])
    }

    const togglePaymentMethod = (paymentMethod: number) => {
        paymentMethods.includes(paymentMethod)
            ? setPaymentMethods(paymentMethods.filter(p_m => p_m !== paymentMethod))
            : setPaymentMethods([...paymentMethods, paymentMethod])
    }

    // console.log([...new Set(rootState.services.services.map(s => s.description.paymentMethod))])

    const [openMobileFuncInputs, setOpenMobileFuncInputs] = useState(false)
    const [openMobilePaymentInputs, setOpenMobilePaymentInputs] = useState(false)
    const [openMobileCountry, setOpenMobileCountry] = useState(false)

    // const searchParamsInputRef = useRef<HTMLInputElement>(null)

    const createSearchParamsLink = () => {
        const urlParams = new URLSearchParams()

        if (search) {
            urlParams.append('search', search.trim())
        }

        if (isFree) {
            urlParams.append('isFree', 'true')
        }
        if (hasTrial) {
            urlParams.append('hasTrial', 'true')
        }
        if (hasPartnership) {
            urlParams.append('hasPartnership', 'true')
        }

        if (paymentMethods.length > 0) {
            urlParams.append('paymentMethods', paymentMethods.sort((a, b) => a - b).join(','))
        }

        if (selectedCategories.length > 0) {
            urlParams.append('categories', selectedCategories.join(','))
        }

        if (sortMode === 'new') {
            urlParams.append('recent', 'new')
        }

        if (sortMode === 'top') {
            urlParams.append('rating', 'top')
        }

        if (searchByName) {
            urlParams.append('searchbyname', 'true')
        }

        if (searchByText) {
            urlParams.append('searchbytext', 'true')
        }

        if (country) {
            urlParams.append('country', country)
        }

        if (collection) {
            urlParams.append('collection', collection.toString())
        }

        return URL + '/services?' + urlParams
    }

    const titleRef = useRef<HTMLHeadingElement>(null)
    const [copied, setCopied] = useState(false)

    const totalCount = rootState.services.search.total_count //searchCondition.length
    const [numberOfServices] = useState(20)
    const numberOfPages = new Array(Math.ceil(totalCount / numberOfServices)).fill('').map((_, idx) => idx + 1)
    const siblingCount = 1
    const DOTS = '...'

    const range = (start: number, end: number): number[] => {
        let length = end - start + 1;
        /*
            Create an array of certain length and set the elements within it from
          start value to end value.
        */
        return Array.from({ length }, (_, idx) => idx + start);
    };

    const paginationRange = useMemo(() => {
        const totalPageCount = Math.ceil(totalCount / numberOfServices);

        // Pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2*DOTS
        const totalPageNumbers = siblingCount + 5;

        /*
          Case 1:
          If the number of pages is less than the page numbers we want to show in our
          paginationComponent, we return the range [1..totalPageCount]
        */
        if (totalPageNumbers >= totalPageCount) {
            return range(1, totalPageCount);
        }

        /*
            Calculate left and right sibling index and make sure they are within range 1 and totalPageCount
        */
        const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
        const rightSiblingIndex = Math.min(
            currentPage + siblingCount,
            totalPageCount
        );

        /*
          We do not show dots just when there is just one page number to be inserted between the extremes of sibling and the page limits i.e 1 and totalPageCount. Hence we are using leftSiblingIndex > 2 and rightSiblingIndex < totalPageCount - 2
        */
        const shouldShowLeftDots = leftSiblingIndex > 2;
        const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

        const firstPageIndex = 1;
        const lastPageIndex = totalPageCount;

        /*
            Case 2: No left dots to show, but rights dots to be shown
        */
        if (!shouldShowLeftDots && shouldShowRightDots) {
            let leftItemCount = 3 + 2 * siblingCount;
            let leftRange = range(1, leftItemCount);

            return [...leftRange, DOTS, totalPageCount];
        }

        /*
            Case 3: No right dots to show, but left dots to be shown
        */
        if (shouldShowLeftDots && !shouldShowRightDots) {

            let rightItemCount = 3 + 2 * siblingCount;
            let rightRange = range(
                totalPageCount - rightItemCount + 1,
                totalPageCount
            );
            return [firstPageIndex, DOTS, ...rightRange];
        }

        /*
            Case 4: Both left and right dots to be shown
        */
        if (shouldShowLeftDots && shouldShowRightDots) {
            let middleRange = range(leftSiblingIndex, rightSiblingIndex);
            return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
        }
    }, [currentPage, numberOfPages, totalCount]);

    useEffect(() => {
        setIsParamsChecked(false)

        setSortMode('default')

        const urlParams = new URLSearchParams(location.search)
        if (urlParams.has('search')) {
            setSearch(urlParams.get('search'))
        }
        if (urlParams.has('isFree')) {
            setIsFree(true)
        }
        if (urlParams.has('hasTrial')) {
            setHasTrial(true)
        }
        if (urlParams.has('hasPartnership')) {
            setHasPartnership(true)
        }
        if (urlParams.has('categories')) {
            setSelectedCategories(urlParams.get('categories').split(',').map(category => Number(category)))
        }
        if (urlParams.has('paymentMethods')) {
            setPaymentMethods(urlParams.get('paymentMethods').split(',').map(p_m => Number(p_m)))
        }
        if (urlParams.has('recent')) {
            setSortMode('new')
        }
        if (urlParams.has('rating') && urlParams.get('rating') === 'top') {
            setSortMode('top')
        }
        if (urlParams.has('searchbyname')) {
            setSearchByName(true)
        }
        if (urlParams.has('searchbytext')) {
            setSearchByText(true)
        }
        if (urlParams.has('country')) {
            setCountry(urlParams.get('country'))
        }
        if (urlParams.has('collection')) {
            setCollection(parseInt(urlParams.get('collection')))
        }

        setIsParamsChecked(true)
    }, [])

    // Not reload page with pageNumber on first render

    const checkFirstRender = useRef(true)
    const firstRender = checkFirstRender.current

    useLayoutEffect(() => {
        checkFirstRender.current = false
        return
    })

    useEffect(() => {
        setCurrentPage(1)

        if (!firstRender && !window.location.search) {
            navigate('/services')
        }
    }, [, search, isFree, hasTrial, hasPartnership, paymentMethods, selectedCategories, searchByName, searchByText, country, collection])

    useEffect(() => {
        if (!pageNumber || parseInt(pageNumber) === 1) {
            setCurrentPage(1)
        } else {
            setCurrentPage(parseInt(pageNumber))
        }
    }, [, pageNumber])

    // const changePage = (number: number) => {
    //     setCurrentPage(number)
    //     window.requestAnimationFrame(() => titleRef.current.scrollIntoView({ behavior: 'smooth' }))
    // }

    return <>
        <Helmet>
            <title>Найти сервис | digital hub</title>
            <meta property='og:title' content='Найти сервис | digital hub' />
        </Helmet>

        <div className='services-list-header-container'>
            <div className='services-list-search-title'>
                <h2 className='section-main-title' ref={titleRef}>{!collection ? 'Найденные сервисы:' : rootState.services.collections.find(c => c.id === collection)?.title}</h2>
                <span className='services-list-services-number'>{totalCount}</span>
            </div>
            {totalCount > 0 && <div className='sort-selection view-desktop'>
                <span>Сортировать:</span>
                <select className='color-blue' value={sortMode} onChange={e => setSortMode(e.target.value)}>
                    <option value='default'>по умолчанию</option>
                    <option value='new'>по новизне</option>
                    <option value='top'>по рейтингу</option>
                    <option value='a-z'>по алфавиту: А-Я</option>
                    <option value='z-a'>по алфавиту: Я-А</option>
                </select>
            </div>}
        </div>
        <div className='services-list-main-container'>
            <div className='services-list-filters-container'>
                <div className='wide-search-container'>
                    <div className='services-list-search-params'>
                        <span>Поиск по:</span>
                        <label><input type='checkbox' onChange={() => setSearchByName(searchByName ? null : true)} checked={searchByName} /> названию</label>
                        <label><input type='checkbox' onChange={() => setSearchByText(searchByText ? null : true)} checked={searchByText} /> описанию</label>
                    </div>
                    <input type='text' placeholder='Поиск' value={search} onChange={e => setSearch(e.target.value)} autoComplete='off' />
                    <i className='fas fa-search color-blue' />
                </div>
                <div className='wide-search-container'>
                    <p>Поиск по категориям:</p>
                    <input type='text' placeholder='Введите название категории' value={searchCategories} onChange={e => setSearchCategories(e.target.value)} autoComplete='off' onFocus={() => setShowDropdown(true)} />
                    <i className='fas fa-plus color-blue' />
                    {showDropdown && <div className='services-list-dropdown-container' ref={dropdownRef}>
                        {searchCategories.length === 0 && <p>Популярные категории:</p>}
                        <ul className='services-list-dropdown-list'>
                            {searchCategories.length > 0 && searchCategoriesCondition.length > 0 && searchCategoriesCondition.map(category => {
                                return <CategoryTag name={category.name} qty={category.service_count} onClick={() => toggleCategory(category)} checked={selectedCategories.includes(category.id)} key={category.id} />
                            })}
                            {searchCategories.length > 0 && searchCategoriesCondition.length === 0 && <li className='services-list-dropdown-no-match'>Не найдено</li>}
                            {searchCategories.length === 0 && <>
                                {rootState.categories.categories.filter(category => category.index === 3).sort((a, b) => b.service_count - a.service_count).slice(0, 15).map(popularCategory => {
                                    return <CategoryTag name={popularCategory.name} qty={popularCategory.service_count} onClick={() => toggleCategory(popularCategory)} checked={selectedCategories.includes(popularCategory.id)} key={popularCategory.id} />
                                })}
                            </>}
                        </ul>
                    </div>}
                </div>
                {selectedCategories.length > 0 && <div className='services-list-selected-categories'>
                    {/* <p>Выбранные категории:</p> */}
                    <ul className='categories-list'>
                        {rootState.categories.categories.filter(category => selectedCategories.includes(category.id)).map(category => {
                            return <li>
                                <button className='category-tag' onClick={() => setSelectedCategories(selectedCategories.filter(cat => cat !== category.id))}>{category.name.length > 23 ? category.name.slice(0, 23) + '...' : category.name}<i className='fas fa-times' /></button>
                            </li>
                        })}
                    </ul>
                </div>}

                <div>
                    <p>Подборки:</p>
                    <select
                        className='services-list-select'
                        value={collection}
                        onChange={e => setCollection(parseInt(e.target.value))}
                    >
                        <option value={null}>--------</option>
                        {rootState.services.collections.map(c => {
                            return <option value={c.id} key={c.id}>{c.title}</option>
                        })}
                    </select>
                </div>

                <div className='service-selection-advanced-inputs view-desktop'>
                    <div>
                        <p>Функциональные особенности:</p>
                        <label><input type='checkbox' onChange={() => setIsFree(isFree ? null : true)} checked={isFree} />Бесплатная версия</label>
                        <label><input type='checkbox' onChange={() => setHasTrial(hasTrial ? null : true)} checked={hasTrial} />Пробный период</label>
                        <label><input type='checkbox' onChange={() => setHasPartnership(hasPartnership ? null : true)} checked={hasPartnership} />Партнёрская программа</label>
                    </div>
                    <div>
                        <p>Способ оплаты:</p>
                        <label><input type='checkbox' onChange={() => togglePaymentMethod(1)} checked={paymentMethods.includes(1)} />По подписке</label>
                        <label><input type='checkbox' onChange={() => togglePaymentMethod(2)} checked={paymentMethods.includes(2)} />За действие</label>
                        <label><input type='checkbox' onChange={() => togglePaymentMethod(3)} checked={paymentMethods.includes(3)} />Разовая</label>
                    </div>
                    <div>
                        <p>Страна разработчика:</p>
                        <select
                            className='services-list-select'
                            value={country}
                            onChange={e => setCountry(e.target.value)}
                        >
                            <option value=''>--------</option>
                            {Object.values(countriesList).map(c => {
                                return c.map(cn => {
                                    return <option value={cn.countryName} key={cn.countryName}>{cn.countryName}</option>
                                })
                            })}
                        </select>
                    </div>
                </div>

                <div className='service-selection-advanced-inputs view-mobile'>
                    <div className='service-dropdown-container'>
                        <div className='service-dropdown-header' onClick={() => setOpenMobileFuncInputs(!openMobileFuncInputs)}>
                            <p>Функциональные особенности</p>
                            <i className={openMobileFuncInputs ? 'fas fa-arrow-down' : 'fas fa-arrow-right'} />
                        </div>
                        {openMobileFuncInputs && <div className='service-dropdown-content'>
                            <label><input type='checkbox' onChange={() => setIsFree(isFree ? null : true)} checked={isFree} />Бесплатная версия</label>
                            <label><input type='checkbox' onChange={() => setHasTrial(hasTrial ? null : true)} checked={hasTrial} />Пробный период</label>
                            <label><input type='checkbox' onChange={() => setHasPartnership(hasPartnership ? null : true)} checked={hasPartnership} />Партнёрская программа</label>
                        </div>}
                    </div>
                    <div className='service-dropdown-container'>
                        <div className='service-dropdown-header' onClick={() => setOpenMobilePaymentInputs(!openMobilePaymentInputs)}>
                            <p>Способ оплаты</p>
                            <i className={openMobilePaymentInputs ? 'fas fa-arrow-down' : 'fas fa-arrow-right'} />
                        </div>
                        {openMobilePaymentInputs && <div className='service-dropdown-content'>
                            <label><input type='checkbox' onChange={() => togglePaymentMethod(1)} checked={paymentMethods.includes(1)} />По подписке</label>
                            <label><input type='checkbox' onChange={() => togglePaymentMethod(2)} checked={paymentMethods.includes(2)} />За действие</label>
                            <label><input type='checkbox' onChange={() => togglePaymentMethod(3)} checked={paymentMethods.includes(3)} />Разовая</label>
                        </div>}
                    </div>
                    <div className='service-dropdown-container'>
                        <div className='service-dropdown-header' onClick={() => setOpenMobileCountry(!openMobileCountry)}>
                            <p>Страна разработчика</p>
                            <i className={openMobileCountry ? 'fas fa-arrow-down' : 'fas fa-arrow-right'} />
                        </div>
                        {openMobileCountry && <div className='service-dropdown-content'>
                            <select
                                className='services-list-select'
                                value={country}
                                onChange={e => setCountry(e.target.value)}
                            >
                                <option value=''>--------</option>
                                {Object.values(countriesList).map(c => {
                                    return c.map(cn => {
                                        return <option value={cn.countryName} key={cn.countryName}>{cn.countryName}</option>
                                    })
                                })}
                            </select>
                        </div>}
                    </div>
                </div>

                <div className='services-list-options'>
                    <button className='services-list-reset-button' onClick={() => window.location.replace('/services')}>
                        <span>Сбросить все фильтры</span>
                        <i className='fas fa-times' />
                    </button>
                </div>
                {/* searchCondition.length > 0 && */ <div className='sort-selection view-mobile'>
                    <span>Сортировать:</span>
                    <select className='color-blue' value={sortMode} onChange={e => setSortMode(e.target.value)}>
                        <option value='default'>по умолчанию</option>
                        <option value='new'>по новизне</option>
                        <option value='top'>по рейтингу</option>
                        <option value='a-z'>по алфавиту: А-Я</option>
                        <option value='z-a'>по алфавиту: Я-А</option>
                    </select>
                </div>}
                {/* <div className='wide-search-container'>
                    <input
                        type='text'
                        ref={searchParamsInputRef}
                        value={createSearchParamsLink()}
                        onFocus={() => {
                            searchParamsInputRef.current.select()
                            navigator.clipboard.writeText(searchParamsInputRef.current.value)
                            setCopied(true)
                        }}
                        onBlur={() => setCopied(false)}
                        readOnly
                    />
                    <i className={copied ? 'fas fa-check-circle color-green' : 'far fa-copy color-blue'} />
                </div> */}
                <div className='services-list-sharing view-desktop'>
                    <button className='blue-shadow-button' onClick={() => {
                        navigator.clipboard.writeText(createSearchParamsLink())
                        setCopied(true)
                    }}>
                        <span>Поделиться сервисами</span>
                        <i className='fas fa-share' />
                    </button>
                    {copied && <p className='services-list-filters-container-copied'>Скопировано в буфер обмена!</p>}
                    <div className='services-list-social-networks-buttons'>
                        <button onClick={() => window.open('https://vk.com/share.php?url=' + encodeURIComponent(createSearchParamsLink()), '_blank')}><i className='fab fa-vk' /></button>
                        <button onClick={() => window.open('https://t.me/share/url?url=' + encodeURIComponent(createSearchParamsLink()), '_blank')}><i className='fab fa-telegram-plane' /></button>
                        <button onClick={() => window.open('whatsapp://send?text=' + encodeURIComponent(createSearchParamsLink()), '_blank')}><i className='fab fa-whatsapp' /></button>
                    </div>
                </div>
            </div>
            {!rootState.services.is_loading && totalCount > 0 && <div className='services-list-cards-container'>
                {/* {searchCondition.slice(currentPage === 1 ? 0 : (currentPage - 1) * numberOfServices, currentPage * numberOfServices).map(service => {
                    return <ServiceCardComponent service={service} key={service.id} />
                })} */}
                {rootState.services.search.data?.map(service => {
                    return <ServiceCardComponent service={service} key={service.id} />
                })}
            </div>}
            {!rootState.services.is_loading && totalCount === 0 && <div className='services-list-not-found'><i className='fas fa-times' /><p>По запросу ничего не найдено</p></div>}
            {rootState.services.is_loading && <div className='services-list-cards-container'><ServiceCardMockup qty={20} /></div>}
        </div>

        {/* searchCondition.length > 0 && */ numberOfPages.length > 1 && <div className='services-list-pagination'>
            <Link
                className={currentPage === 1 ? 'page-number-button disabled' : 'page-number-button'}
                to={currentPage > 1 && '/services/' + (currentPage - 1)}
            // disabled={currentPage === 1}
            >
                <i className='fas fa-chevron-left' />
            </Link>
            {paginationRange.map(number => {

                if (number === DOTS) {
                    return <button className='page-number-button disabled' disabled>&#8230;</button>
                }

                return <Link
                    className={currentPage === number ? 'page-number-button active' : 'page-number-button'}
                    to={typeof number === 'number' && currentPage !== number && '/services/' + number}
                    key={number}
                >
                    {number}
                </Link>
            })}
            <Link
                className={currentPage === numberOfPages.length ? 'page-number-button disabled' : 'page-number-button'}
                to={currentPage < numberOfPages.length && '/services/' + (currentPage + 1)}
            // disabled={currentPage === numberOfPages.length}
            >
                <i className='fas fa-chevron-right' />
            </Link>
        </div>}

        <div className='services-list-sharing view-mobile'>
            <button className='blue-shadow-button' onClick={() => {
                navigator.clipboard.writeText(createSearchParamsLink())
                setCopied(true)
            }}>
                <span>Поделиться сервисами</span>
                <i className='fas fa-share' />
            </button>
            {copied && <p className='services-list-filters-container-copied'>Скопировано в буфер обмена!</p>}
            <div className='services-list-social-networks-buttons'>
                <button onClick={() => window.open('https://vk.com/share.php?url=' + encodeURIComponent(createSearchParamsLink()), '_blank')}><i className='fab fa-vk' /></button>
                <button onClick={() => window.open('https://t.me/share/url?url=' + encodeURIComponent(createSearchParamsLink()), '_blank')}><i className='fab fa-telegram-plane' /></button>
                <button onClick={() => window.open('whatsapp://send?text=' + encodeURIComponent(createSearchParamsLink()), '_blank')}><i className='fab fa-whatsapp' /></button>
            </div>
        </div>
    </>;
};

export default ServicesSearchList;
