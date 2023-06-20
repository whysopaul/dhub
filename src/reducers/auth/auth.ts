import { LOGIN, TUserData, authDispatchTypes } from "../../actions/auth/types"

interface IDefaultState {
    user: TUserData
}

const defaultState: IDefaultState = {
    user: null
    // user: {
    //     vk_id: 0,
    //     name: 'Test User',
    //     photo: '',
    //     token: ''
    // }
}

const authReducer = (state: IDefaultState = defaultState, action: authDispatchTypes) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                user: action.payload
            }
        default:
            return state
    }
}

export default authReducer;