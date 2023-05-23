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
        <div className='user-profile-header'>
            <div className='user-profile-subheader'>
                <img src={userState.photo} alt="" className='user-profile-image' />
                <p className='section-main-title'>{userState.name}</p>
            </div>
            <div>
                <Link to='/' className='arrow-right-link'>
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
        <div className='user-profile-section-header'>
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
            <div className='service-feedback-cards'>
                {mockFeedbackData.map(i => {
                    return <FeedbackCardComponent comment={i} />
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
    </>;
};

export default UserProfile;
