import * as React from 'react';
import { TFeedbackComment } from '../../actions/feedback/types';
import '../../static/css/feedback.css';

interface IFeedbackCardComponentProps {
    comment: TFeedbackComment,
    owner?: boolean
}

const FeedbackCardComponent: React.FunctionComponent<IFeedbackCardComponentProps> = ({ comment, owner }) => {

    const starCount = (points: number) => {
        return new Array(5).fill('').map((_, idx) => {
            return <i style={{ color: idx < points ? '#FFC517' : '#D3DAEA' }} className='fas fa-star' key={idx} />
        })
    }

    return <>
        <div className='feedback-card-container'>
            <div className='feedback-card-header'>
                {!owner && <>
                    <img src={comment.author.profilePhoto} alt="" />
                    <div className='feedback-card-username'>
                        <p>{comment.author.firstName} {comment.author.lastName}</p>
                    </div>
                </>}
                <div className='feedback-card-rating'>
                    <span>Функциональность</span>
                    <div>{starCount(comment.points.functionality)}</div>
                    <span>Простота использования</span>
                    <div>{starCount(comment.points.usability)}</div>
                    <span>Служба поддержки</span>
                    <div>{starCount(comment.points.customerService)}</div>
                </div>
            </div>
            <hr />
            <p>{comment.text}</p>
            <hr />
            <div className='feedback-card-footer'>
                <div className='feedback-service-logo'>
                    <i className='fas fa-icons' />
                </div>
                <div className='feedback-service-name'>
                    <p>BoostLike</p>
                    <span>Накрутка в социальных сетях</span>
                </div>
                <button className='feedback-service-likes'>
                    <i className='fas fa-thumbs-up' />
                    <div>
                        <span>{comment.likes}</span>
                    </div>
                </button>
            </div>
        </div>
    </>;
};

export default FeedbackCardComponent;
