import * as React from 'react';
import { TFeedback } from '../../actions/feedback/types';
import '../../static/css/feedback.css';
import { useSelector } from 'react-redux';
import { RootStore } from '../../store';
import { useDispatch } from 'react-redux';
import { feedbackDeleteFeedback, feedbackToggleFeedbackUpvote } from '../../actions/feedback/feedback';
import { userShowLoginPopup } from '../../actions/auth/auth';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import FeedbackCardPopup from './FeedbackCardPopup';

interface IFeedbackCardComponentProps {
    comment: TFeedback,
    owner?: boolean,
    show_full?: boolean,
    onTouchStart?: (e: React.TouchEvent) => void,
    onTouchMove?: (e: React.TouchEvent, cardsQty?: number) => void
}

const FeedbackCardComponent: React.FunctionComponent<IFeedbackCardComponentProps> = ({ comment, owner, show_full, onTouchStart, onTouchMove }) => {

    const rootState = useSelector((state: RootStore) => state)

    const dispatch = useDispatch()

    const starCount = (points: number) => {
        return new Array(5).fill('').map((_, idx) => {
            return <i style={{ color: idx < points ? '#FFC517' : '#D3DAEA' }} className='fas fa-star' key={idx} />
        })
    }

    const feedbackServiceData = rootState.services.services.find(service => service.id === comment.service)

    const [showFullFeedback, setShowFullFeedback] = useState(false)

    return <>

        {showFullFeedback && <FeedbackCardPopup comment={comment} onClose={() => setShowFullFeedback(false)} />}

        <div className='feedback-card-container' onTouchStart={e => onTouchStart ? onTouchStart(e) : null} onTouchMove={e => onTouchMove ? onTouchMove(e) : null}>
            <div className={owner ? 'feedback-card-header owner' : 'feedback-card-header'}>
                {!owner && <>
                    {comment.is_soup ? <div className='feedback-card-anonym'><i className='fas fa-user-circle' /></div> : <img src={comment.user.photo} alt="" />}
                    <div className='feedback-card-username'>
                        <p>{comment.is_soup ? comment.soup_name : comment.user.name}</p>
                    </div>
                </>}
                <div className='feedback-card-rating'>
                    <span>Функциональность</span>
                    <div>{starCount(comment.functionality)}</div>
                    <span>Простота использования</span>
                    <div>{starCount(comment.usability)}</div>
                    <span>Служба поддержки</span>
                    <div>{starCount(comment.customer_service)}</div>
                </div>
            </div>
            <hr />
            <div className='feedback-card-description'>
                <p>{comment.text.split(' ').length > 30 && !show_full ? comment.text.split(' ').slice(0, 30).join(' ') + '...' : comment.text}</p>
                {comment.text.split(' ').length > 30 && !show_full && <button className='feedback-card-read-more' onClick={() => setShowFullFeedback(true)}>Читать далее</button>}
            </div>
            <hr />
            <div className='feedback-card-footer'>
                <div className='feedback-service-logo'>
                    <Link to={'/service/' + comment.service}><img src={feedbackServiceData?.images?.logo} alt={feedbackServiceData?.name} /></Link>
                    {/* <i className='fas fa-icons' /> */}
                </div>
                <div className='feedback-service-name'>
                    <Link to={'/service/' + comment.service}><p>{feedbackServiceData?.name}</p></Link>
                    <Link to={'/services?categories=' + feedbackServiceData?.categories_3[0]?.id}><span>{feedbackServiceData?.categories_3[0]?.name}</span></Link>
                </div>
                <button className={rootState.auth.user && comment.likes.includes(rootState.auth.user?.vk_id) ? 'feedback-service-likes active' : 'feedback-service-likes'} onClick={() => rootState.auth.user ? dispatch(feedbackToggleFeedbackUpvote(rootState.auth.user.d_token, comment.id)) : dispatch(userShowLoginPopup())}>
                    <i className='fas fa-thumbs-up' />
                    <div>
                        <span>{comment.likes.length}</span>
                    </div>
                </button>
            </div>
            {(comment.user && (comment.user.vk_id === rootState.auth.user?.vk_id) || rootState.auth.user?.is_admin) && <div className='feedback-card-delete-container'>
                <button className='delete-button' onClick={() => dispatch(feedbackDeleteFeedback(rootState.auth.user?.d_token, comment.id))}>Удалить отзыв</button>
            </div>}
        </div>
    </>;
};

export default FeedbackCardComponent;
