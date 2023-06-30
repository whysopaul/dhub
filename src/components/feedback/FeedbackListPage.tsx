import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootStore } from '../../store';
import CategoryTag from '../categories/CategoryTag';
import { mockFeedbackData } from '../../actions/feedback/feedback';
import FeedbackCardComponent from './FeedbackCardComponent';

interface IFeedbackListPageProps {
}

const FeedbackListPage: React.FunctionComponent<IFeedbackListPageProps> = (props) => {

    const rootState = useSelector((state: RootStore) => state)

    return <>
        <div className='section-header-container'>
            <h3 className='section-main-title'>Отзывы</h3>
            <div className='sort-selection'>
                <span>Сортировать:</span>
                <select className='color-blue'>
                    <option value="">по умолчанию</option>
                </select>
            </div>
        </div>
        <div className='wide-search-container'>
            <input type='text' placeholder='Введите название сервиса' autoComplete='off' />
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
        <div className='feedback-cards'>
            {mockFeedbackData.map(i => {
                return <FeedbackCardComponent comment={i} key={i.id} />
            })}
        </div>
    </>;
};

export default FeedbackListPage;
