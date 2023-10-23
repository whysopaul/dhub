import { FEEDBACK_CLEAR_GENERATED_FEEDBACK, FEEDBACK_CREATE_FEEDBACK, FEEDBACK_DELETE_FEEDBACK, FEEDBACK_GENERATE_FEEDBACK, FEEDBACK_GET_USER_FEEDBACK, FEEDBACK_IS_LOADING, FEEDBACK_SEARCH_FEEDBACKS, FEEDBACK_TOGGLE_FEEDBACK_UPVOTE, FEEDBACK_UPDATE_FEEDBACK, TFeedback, feedbackDispatchTypes } from "../../actions/feedback/types";

interface IDefaultState {
    feedbacks: TFeedback[],
    generated_feedback: TFeedback,
    feedback_is_loading: boolean,
    search_feedbacks: {
        total_count: number,
        data: TFeedback[]
    }
}

const defaultState: IDefaultState = {
    feedbacks: [],
    generated_feedback: null,
    feedback_is_loading: false,
    search_feedbacks: {
        total_count: 0,
        data: []
    }
}

const feedbackReducer = (state: IDefaultState = defaultState, action: feedbackDispatchTypes) => {
    switch (action.type) {
        case FEEDBACK_CREATE_FEEDBACK:
            return {
                ...state,
                feedbacks: [...state.feedbacks, action.payload],
                generated_feedback: null
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
        case FEEDBACK_UPDATE_FEEDBACK:
            return {
                ...state,
                feedbacks: state.feedbacks.map(feedback => {
                    if (feedback.id === action.payload.id) {
                        return action.payload
                    }
                    return feedback
                })
            }
        case FEEDBACK_GENERATE_FEEDBACK:
            return {
                ...state,
                generated_feedback: action.payload
            }
        case FEEDBACK_CLEAR_GENERATED_FEEDBACK:
            return {
                ...state,
                generated_feedback: null
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
        case FEEDBACK_SEARCH_FEEDBACKS:
            return {
                ...state,
                search_feedbacks: action.payload
            }
        case FEEDBACK_IS_LOADING:
            return {
                ...state,
                feedback_is_loading: action.payload
            }
        default:
            return state
    }
}

export default feedbackReducer;