import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootStore } from '../../store';
// import CategoryTag from '../categories/CategoryTag';
import { feedbackSearchFeedbacks } from '../../actions/feedback/feedback';
import FeedbackCardComponent from './FeedbackCardComponent';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import Loading from '../global/Loading';
import { useDebounce } from '../utils/useDebounce';
import { range } from '../utils';

interface IFeedbackListPageProps {
}

const FeedbackListPage: React.FunctionComponent<IFeedbackListPageProps> = (props) => {

    const dispatch = useDispatch()

    const feedbackState = useSelector((state: RootStore) => state.feedback)

    const [search, setSearch] = useState('')
    const debouncedSearch = useDebounce(search, 1000)
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        dispatch(feedbackSearchFeedbacks({ service_name: search }, currentPage, numberOfFeedbacks))
    }, [, debouncedSearch, currentPage])

    const titleRef = useRef(null)

    const totalCount = feedbackState.search_feedbacks.total_count
    const [numberOfFeedbacks] = useState(8)
    const numberOfPages = new Array(Math.ceil(totalCount / numberOfFeedbacks)).fill('').map((_, idx) => idx + 1)
    const siblingCount = 1
    const DOTS = '...'

    const paginationRange = useMemo(() => {
        const totalPageCount = Math.ceil(totalCount / numberOfFeedbacks);

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

    const changePage = (number: number) => {
        setCurrentPage(number)
        window.requestAnimationFrame(() => titleRef.current.scrollIntoView({ behavior: 'smooth' }))
    }

    return <>
        <div className='section-header-container'>
            <h3 className='section-main-title' ref={titleRef}>Отзывы</h3>
            <div className='sort-selection'>
                <span>Сортировать:</span>
                <select className='color-blue'>
                    <option value="">по умолчанию</option>
                </select>
            </div>
        </div>
        <div className='wide-search-container'>
            <input type='text' placeholder='Введите название сервиса' value={search} onChange={e => setSearch(e.target.value)} autoComplete='off' />
            <i className='fas fa-search color-blue' />
        </div>
        {/* <div className='categories-section'>
            <p>Выберите категории:</p>
            <div>
                <ul className='categories-list'>
                    {rootState.categories.categories.length > 0 && rootState.categories.categories.slice(0, 16).map(i => {
                        const servicesInCategory = rootState.services.services?.filter(service => service.categories_3.find(category => category.id === i.id)).length
                        return <CategoryTag name={i.name} qty={servicesInCategory} key={i.id} />
                    })}
                </ul>
            </div>
        </div> */}

        {!feedbackState.feedback_is_loading && <div className='feedback-cards'>
            {feedbackState.search_feedbacks.data?.map(i => {
                return <FeedbackCardComponent comment={i} key={i.id} />
            })}
        </div>}
        {feedbackState.feedback_is_loading && <Loading height={400} />}

        {numberOfPages.length > 1 && <div className='services-list-pagination'>
            <button className={currentPage === 1 ? 'page-number-button disabled' : 'page-number-button'} onClick={() => { currentPage > 1 && changePage(currentPage - 1) }} disabled={currentPage === 1}>
                <i className='fas fa-chevron-left' />
            </button>
            {paginationRange.map(number => {

                if (number === DOTS) {
                    return <button className='page-number-button disabled' disabled>&#8230;</button>
                }

                return <button className={currentPage === number ? 'page-number-button active' : 'page-number-button'} onClick={() => { typeof number === 'number' && currentPage !== number && changePage(number) }} key={number}>
                    {number}
                </button>
            })}
            <button className={currentPage === numberOfPages.length ? 'page-number-button disabled' : 'page-number-button'} onClick={() => { currentPage < numberOfPages.length && changePage(currentPage + 1) }} disabled={currentPage === numberOfPages.length}>
                <i className='fas fa-chevron-right' />
            </button>
        </div>}
    </>;
};

export default FeedbackListPage;
