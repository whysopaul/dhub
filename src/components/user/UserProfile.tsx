import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootStore } from '../../store';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { mockFeedbackData } from '../../actions/feedback/feedback';
import FeedbackCardComponent from '../feedback/FeedbackCardComponent';
import ServiceCardComponent from '../services/ServiceCardComponent';
import '../../static/css/user.css';

interface IUserProfileProps {
}

const UserProfile: React.FunctionComponent<IUserProfileProps> = (props) => {

    const userState = useSelector((state: RootStore) => state.auth.user)
    const serviceState = useSelector((state: RootStore) => state.services.services)

    const [mode, setMode] = useState<number>(1)

    return <>
        <div className='section-header-container'>
            <div className='user-profile-subheader'>
                <img src={userState.photo} alt="" className='user-profile-photo' />
                <h2 className='section-main-title'>{userState.name}</h2>
            </div>
            <div>
                <Link to='/profile/edit' className='arrow-right-link'>
                    <span>Редактировать профиль</span>
                    <i className='fas fa-long-arrow-alt-right' />
                </Link>
            </div>
        </div>
        <hr />
        <div className='user-profile-modes'>
            <button className={mode === 1 && 'active'} onClick={() => setMode(1)}>Отзывы</button>
            <button className={mode === 2 && 'active'} onClick={() => setMode(2)}>История просмотров</button>
        </div>
        <div className='section-header-container'>
            <div className='user-profile-subheader'>
                {mode === 1 && <>
                    <h2 className='section-main-title'>Мои отзывы</h2>
                    <button className='feedback-button'><i className='far fa-edit' /><span>Оставить отзыв</span></button>
                </>}
                {mode === 2 && <>
                    <h2 className='section-main-title'>История просмотров</h2>
                </>}
            </div>
            <div className='sort-selection'>
                <span>Сортировать:</span>
                <select className='color-blue'>
                    <option value="">по умолчанию</option>
                </select>
            </div>
        </div>
        {mode === 1 && <>
            <div className='feedback-cards'>
                {mockFeedbackData.map(i => {
                    return <FeedbackCardComponent comment={i} owner />
                })}
            </div>
        </>}
        {mode === 2 && <>
            <div className='home-services-cards extended'>
                {serviceState.slice(0, 10).map(i => {
                    return <ServiceCardComponent service={i} />
                })}
            </div>
        </>}
        <div className='show-more-container'>
            <button className='color-blue cursor-pointer'>
                <span>Показать еще</span>
                <i className='fas fa-chevron-down' />
            </button>
        </div>
    </>;
};

export default UserProfile;