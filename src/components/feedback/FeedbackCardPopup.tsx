import * as React from 'react';
import { TFeedback } from '../../actions/feedback/types';
import { useRef } from 'react';
import { useOnClickOutside } from '../utils/HandleClickOutside';
import { useOnPopup } from '../utils/HandleOnPopup';
import FeedbackCardComponent from './FeedbackCardComponent';

interface IFeedbackCardPopupProps {
    comment: TFeedback,
    onClose: () => void
}

const FeedbackCardPopup: React.FunctionComponent<IFeedbackCardPopupProps> = (props) => {

    const ref = useRef(null)

    useOnClickOutside(ref, () => props.onClose())

    useOnPopup()

    return <>
        <div className='backdrop' />
        <div className='feedback-card-popup-container' ref={ref}>
            <FeedbackCardComponent comment={props.comment} show_full />
            <button className='feedback-card-popup-close-button' onClick={() => props.onClose()}><i className='fas fa-times' /></button>
        </div>
    </>;
};

export default FeedbackCardPopup;
