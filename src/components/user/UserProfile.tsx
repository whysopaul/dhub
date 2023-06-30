import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootStore } from '../../store';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { feedbackGetUserFeedback, mockFeedbackData } from '../../actions/feedback/feedback';
import FeedbackCardComponent from '../feedback/FeedbackCardComponent';
import ServiceCardComponent from '../services/ServiceCardComponent';
import '../../static/css/user.css';
import GiveFeedbackPopup from '../feedback/GiveFeedbackPopup';
import { URL } from '../utils';
import { useDispatch } from 'react-redux';

interface IUserProfileProps {
}

const UserProfile: React.FunctionComponent<IUserProfileProps> = (props) => {

    const userState = useSelector((state: RootStore) => state.auth.user)
    const serviceState = useSelector((state: RootStore) => state.services.services)
    const feedbackState = useSelector((state: RootStore) => state.feedback.feedbacks)

    const dispatch = useDispatch()

    const navigate = useNavigate()

    useEffect(() => {
        if (!userState) {
            window.location.replace(URL)
        }
    }, [])

    useEffect(() => {
        dispatch(feedbackGetUserFeedback(userState?.d_token))
    }, [])

    // 1 - отзывы, 2 - история просмотров
    const [mode, setMode] = useState<number>(1)
    const [showFeedbackPopup, setShowFeedbackPopup] = useState(false)

    return <>

        {showFeedbackPopup && <GiveFeedbackPopup onClose={() => setShowFeedbackPopup(false)} />}

        {userState && <>
            <div className='user-profile-header-container'>
                <div className='user-profile-subheader'>
                    <img src={userState.photo} alt="" className='user-profile-photo' />
                    <h2 className='section-main-title'>{userState.name}</h2>
                </div>
                {userState.is_admin && <div className='user-profile-admin-button-container'>
                    <button className='user-profile-admin-button' onClick={() => navigate('/admin')}>
                        <i className='fas fa-tools' />
                        <span>Панель администратора</span>
                    </button>
                </div>}
                <div className='user-profile-edit-button-container'>
                    <Link to='/profile/edit' className='arrow-right-link'>
                        <span>Редактировать профиль</span>
                        <i className='fas fa-long-arrow-alt-right' />
                    </Link>
                </div>
            </div>
            <hr />
            <div className='user-profile-modes'>
                <button className={mode === 1 ? 'active' : null} onClick={() => setMode(1)}>Отзывы</button>
                <button className={mode === 2 ? 'active' : null} onClick={() => setMode(2)}>История просмотров</button>
            </div>
            <div className='section-header-container'>
                <div className='user-profile-modes-subheader'>
                    {mode === 1 && <>
                        <h2 className='section-main-title'>Мои отзывы</h2>
                        <button className='feedback-button' onClick={() => setShowFeedbackPopup(true)}>
                            <i className='far fa-edit' />
                            <span>Оставить отзыв</span>
                        </button>
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
                    {feedbackState?.map(i => {
                        return <FeedbackCardComponent comment={i} owner key={i.id} />
                    })}
                </div>
            </>}
            {mode === 2 && <>
                <div className='home-services-cards extended'>
                    {userState.history?.slice(0, 10).map(i => {
                        return <ServiceCardComponent service={serviceState.find(service => service.id === i)} key={i} />
                    })}
                </div>
            </>}
            <div className='show-more-container'>
                {userState.history?.length > 10 && <button className='color-blue cursor-pointer'>
                    <span>Показать еще</span>
                    <i className='fas fa-chevron-down' />
                </button>}
            </div>
        </>}
    </>;
};

export default UserProfile;
