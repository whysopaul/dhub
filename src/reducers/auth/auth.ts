import { USER_LOGIN, TUserData, authDispatchTypes, USER_ADD_HISTORY, USER_LOGIN_POPUP_STATE } from "../../actions/auth/types"
import { FEEDBACK_GET_USER_FEEDBACK, TFeedback, feedbackDispatchTypes } from "../../actions/feedback/types"

interface IDefaultState {
    user: TUserData,
    userFeedbacks: TFeedback[],
    showLoginPopup: boolean
}

const defaultState: IDefaultState = {
    user: null,
    userFeedbacks: [],
    showLoginPopup: false
    // user: {
    //     id: 1,
    //     vk_id: 0,
    //     name: 'Test User',
    //     photo: '',
    //     token: '',
    //     is_admin: true,
    //     d_token: '',
    //     history: []
    // }
}

const authReducer = (state: IDefaultState = defaultState, action: authDispatchTypes | feedbackDispatchTypes) => {
    switch (action.type) {
        case USER_LOGIN:
            return {
                ...state,
                user: action.payload
            }
        case USER_ADD_HISTORY:
            return {
                ...state,
                user: action.payload
            }
        case USER_LOGIN_POPUP_STATE:
            return {
                ...state,
                showLoginPopup: action.payload
            }
        case FEEDBACK_GET_USER_FEEDBACK:
            return {
                ...state,
                userFeedbacks: [...action.payload]
            }
        default:
            return state
    }
}

export default authReducer;