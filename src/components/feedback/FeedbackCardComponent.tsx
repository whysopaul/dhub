import * as React from 'react';
import { TFeedbackComment } from '../../actions/feedback/types';

interface IFeedbackCardComponentProps {
    comment: TFeedbackComment
}

const FeedbackCardComponent: React.FunctionComponent<IFeedbackCardComponentProps> = ({ comment }) => {

    const starCount = (points: number) => {
        const stars = new Array(points).fill('').map(_ => {
            return <i style={{ color: '#FFC517' }} className='fas fa-star' />
        }).concat(new Array(5 - points).fill('').map(_ => {
            return <i style={{ color: '#D3DAEA' }} className='fas fa-star' />
        }))
        return stars
    }

    return <>
        <div>
            <div>
                <div>
                    <img src={comment.author.profilePhoto} alt="" width='76' height='76' />
                </div>
                <div>
                    <p>{comment.author.firstName}</p>
                    <p>{comment.author.lastName}</p>
                </div>
                <div>
                    <span>Функциональность</span>
                    <span>{starCount(comment.points.functionality)}</span>
                    <span>Простота использования</span>
                    <span>{starCount(comment.points.usability)}</span>
                    <span>Служба поддержки</span>
                    <span>{starCount(comment.points.customerService)}</span>
                </div>
            </div>
            <div>
                <p>{comment.text}</p>
            </div>
            <div>
                <div>
                    <i className='fas fa-icons' />
                </div>
                <div>
                    <span>BoostLike</span>
                    <span>Накрутка в социальных сетях</span>
                </div>
                <div>
                    <i className='fas fa-thumbs-up' />
                    <span>{comment.likes}</span>
                </div>
            </div>
        </div>
    </>;
};

export default FeedbackCardComponent;
