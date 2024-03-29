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
import GiveFeedbackPopup from './GiveFeedbackPopup';
import ConfirmDeletePopup from '../global/ConfirmDeletePopup';
import { getImage } from '../utils';

interface IFeedbackCardComponentProps {
    comment: TFeedback,
    owner?: boolean,
    show_full?: boolean,
    onClosePopup?: () => void,
    onTouchStart?: (e: React.TouchEvent) => void,
    onTouchMove?: (e: React.TouchEvent, cardsQty?: number) => void
}

const FeedbackCardComponent: React.FunctionComponent<IFeedbackCardComponentProps> = ({ comment, owner, show_full, onClosePopup, onTouchStart, onTouchMove }) => {

    const rootState = useSelector((state: RootStore) => state)

    const dispatch = useDispatch()

    const starCount = (points: number) => {
        return new Array(5).fill('').map((_, idx) => {
            return <i style={{ color: idx < points ? '#FFC517' : '#D3DAEA' }} className='fas fa-star' key={idx} />
        })
    }

    // const feedbackServiceData = rootState.services.services.find(service => service.id === comment.service)

    const [showFullFeedback, setShowFullFeedback] = useState(false)
    const [editMode, setEditMode] = useState(false)

    const [openConfirmDeletePopup, setOpenConfirmDeletePopup] = useState(false)

    return <>

        {showFullFeedback && <FeedbackCardPopup comment={comment} onClose={() => setShowFullFeedback(false)} />}
        {editMode && <GiveFeedbackPopup edit_feedback={comment} onClose={() => setEditMode(false)} />}
        {openConfirmDeletePopup && <ConfirmDeletePopup title='Вы уверены, что хотите удалить данный отзыв?' onConfirm={() => dispatch(feedbackDeleteFeedback(rootState.auth.user?.d_token, comment.id))} onClose={() => setOpenConfirmDeletePopup(false)} />}

        <div className='feedback-card-container' onTouchStart={e => onTouchStart ? onTouchStart(e) : null} onTouchMove={e => onTouchMove ? onTouchMove(e) : null} itemProp='review' itemScope itemType='https://schema.org/Review'>
            <div className={owner ? 'feedback-card-header owner' : 'feedback-card-header'}>
                {!owner && <>
                    {comment.is_soup || comment.user.photo === 'https://vk.com/images/camera_200.png' ? <div className='feedback-card-anonym'><i className='fas fa-user-circle' /></div> : <img src={comment.user.photo} alt="" />}
                    <div className='feedback-card-username'>
                        <p itemProp='author'>{comment.is_soup ? comment.soup_name.split(' ')[0] : comment.user.name.split(' ')[0]}</p>
                    </div>
                </>}
                <div className='feedback-card-rating' itemProp='reviewRating' itemScope itemType='https://schema.org/Rating'>
                    <span itemProp='reviewAspect'>Функциональность</span>
                    <div>{starCount(comment.functionality)}</div>
                    <meta itemProp='ratingValue' content={comment.functionality + ''} />
                    <span itemProp='reviewAspect'>Простота использования</span>
                    <div>{starCount(comment.usability)}</div>
                    <meta itemProp='ratingValue' content={comment.usability + ''} />
                    <span itemProp='reviewAspect'>Служба поддержки</span>
                    <div>{starCount(comment.customer_service)}</div>
                    <meta itemProp='ratingValue' content={comment.customer_service + ''} />
                </div>
            </div>
            <hr />
            <div className='feedback-card-description'>
                <p itemProp='reviewBody'>{comment.text.split(' ').length > 30 && !show_full ? comment.text.split(' ').slice(0, 30).join(' ') + '...' : comment.text}</p>
                {comment.text.split(' ').length > 30 && !show_full && <button className='feedback-card-read-more' onClick={() => setShowFullFeedback(true)}>Читать далее</button>}
            </div>
            <hr />
            <div className='feedback-card-footer'>
                <div className='feedback-service-logo'>
                    <Link to={'/service/' + comment.service}><img src={getImage(comment.service_logo)} alt={comment.service_name} /></Link>
                    {/* <i className='fas fa-icons' /> */}
                </div>
                <div className='feedback-service-name'>
                    <Link to={'/service/' + comment.service}><p itemProp='itemReviewed'>{comment.service_name}</p></Link>
                    {/* <Link to={'/services?categories=' + feedbackServiceData?.categories_3[0]?.id}><span>{feedbackServiceData?.categories_3[0]?.name}</span></Link> */}
                </div>
                <button
                    className={rootState.auth.user && comment.likes.includes(rootState.auth.user?.vk_id) ? 'feedback-service-likes active' : 'feedback-service-likes'}
                    onClick={() => {
                        if (rootState.auth.user) {
                            dispatch(feedbackToggleFeedbackUpvote(rootState.auth.user.d_token, comment.id))
                        } else {
                            if (show_full) {
                                onClosePopup()
                                dispatch(userShowLoginPopup())
                            } else {
                                dispatch(userShowLoginPopup())
                            }
                        }
                    }}
                >
                    <i className='fas fa-thumbs-up' />
                    <div>
                        <span>{comment.likes.length}</span>
                    </div>
                </button>
            </div>
            {(comment.user && (comment.user.vk_id === rootState.auth.user?.vk_id) || rootState.auth.user?.is_admin) && !show_full && <div className='feedback-card-buttons-container'>
                <button onClick={() => setEditMode(true)}>
                    Редактировать
                </button>
                <button
                    className='delete-button'
                    onClick={() => setOpenConfirmDeletePopup(true)}
                >
                    Удалить отзыв
                </button>
            </div>}
        </div>
    </>;
};

export default FeedbackCardComponent;
