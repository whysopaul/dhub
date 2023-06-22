import { USER_LOGIN, TUserData, authDispatchTypes, USER_ADD_HISTORY, USER_LOGIN_POPUP_STATE } from "../../actions/auth/types"

interface IDefaultState {
    user: TUserData,
    showLoginPopup: boolean
}

const defaultState: IDefaultState = {
    user: null,
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

const authReducer = (state: IDefaultState = defaultState, action: authDispatchTypes) => {
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
        default:
            return state
    }
}

export default authReducer;