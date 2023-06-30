import { FEEDBACK_CREATE_FEEDBACK, FEEDBACK_DELETE_FEEDBACK, FEEDBACK_GET_USER_FEEDBACK, FEEDBACK_TOGGLE_FEEDBACK_UPVOTE, TFeedback, feedbackDispatchTypes } from "../../actions/feedback/types";

interface IDefaultState {
    feedbacks: TFeedback[]
}

const defaultState: IDefaultState = {
    feedbacks: []
}

const feedbackReducer = (state: IDefaultState = defaultState, action: feedbackDispatchTypes) => {
    switch (action.type) {
        case FEEDBACK_CREATE_FEEDBACK:
            return {
                ...state,
                feedbacks: [...state.feedbacks, action.payload]
            }
        case FEEDBACK_TOGGLE_FEEDBACK_UPVOTE:
            return {
                ...state,
                feedbacks: [
                    ...state.feedbacks.map(feedback => {
                        if (feedback.id === action.payload.id) {
                            return action.payload
                        }
                        return feedback
                    })
                ]
            }
        case FEEDBACK_DELETE_FEEDBACK:
            return {
                ...state,
                feedbacks: [
                    ...state.feedbacks.filter(feedback => feedback.id !== parseInt(action.payload))
                ]
            }
        case FEEDBACK_GET_USER_FEEDBACK:
            return {
                ...state,
                feedbacks: [...action.payload]
            }
        default:
            return state
    }
}

export default feedbackReducer;