import * as React from 'react';
import { TFeedback } from '../../actions/feedback/types';
import '../../static/css/feedback.css';
import { useSelector } from 'react-redux';
import { RootStore } from '../../store';
import { useDispatch } from 'react-redux';
import { feedbackDeleteFeedback, feedbackToggleFeedbackUpvote } from '../../actions/feedback/feedback';
import { userShowLoginPopup } from '../../actions/auth/auth';
import { Link } from 'react-router-dom';

interface IFeedbackCardComponentProps {
    comment: TFeedback,
    owner?: boolean,
    onTouchStart?: (e: React.TouchEvent) => void,
    onTouchMove?: (e: React.TouchEvent, cardsQty?: number) => void
}

const FeedbackCardComponent: React.FunctionComponent<IFeedbackCardComponentProps> = ({ comment, owner, onTouchStart, onTouchMove }) => {

    const rootState = useSelector((state: RootStore) => state)

    const dispatch = useDispatch()

    const starCount = (points: number) => {
        return new Array(5).fill('').map((_, idx) => {
            return <i style={{ color: idx < points ? '#FFC517' : '#D3DAEA' }} className='fas fa-star' key={idx} />
        })
    }

    const feedbackServiceData = rootState.services.services.find(service => service.id === comment.service)

    return <>
        <div className='feedback-card-container' onTouchStart={e => onTouchStart ? onTouchStart(e) : null} onTouchMove={e => onTouchMove ? onTouchMove(e) : null}>
            <div className={owner ? 'feedback-card-header owner' : 'feedback-card-header'}>
                {!owner && <>
                    <img src={comment.user.photo} alt="" />
                    <div className='feedback-card-username'>
                        <p>{comment.user.name}</p>
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
            <p>{comment.text}</p>
            <hr />
            <div className='feedback-card-footer'>
                <div className='feedback-service-logo'>
                    <Link to={'/service/' + comment.service}><img src={feedbackServiceData?.images?.logo} /></Link>
                    {/* <i className='fas fa-icons' /> */}
                </div>
                <div className='feedback-service-name'>
                    <Link to={'/service/' + comment.service}><p>{feedbackServiceData?.name}</p></Link>
                    <Link to={'/services?categories=' + feedbackServiceData?.categories_3[0]?.id}><span>{feedbackServiceData?.categories_3[0]?.name}</span></Link>
                </div>
                <button className={comment.likes.includes(rootState.auth.user?.vk_id) ? 'feedback-service-likes active' : 'feedback-service-likes'} onClick={() => rootState.auth.user ? dispatch(feedbackToggleFeedbackUpvote(rootState.auth.user.d_token, comment.id)) : dispatch(userShowLoginPopup())}>
                    <i className='fas fa-thumbs-up' />
                    <div>
                        <span>{comment.likes.length}</span>
                    </div>
                </button>
            </div>
            {comment.user.vk_id === rootState.auth.user?.vk_id && <div className='feedback-card-delete-container'>
                <button onClick={() => dispatch(feedbackDeleteFeedback(rootState.auth.user?.d_token, comment.id))}>Удалить отзыв</button>
            </div>}
        </div>
    </>;
};

export default FeedbackCardComponent;
