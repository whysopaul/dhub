import { LOGIN, TUserData, authDispatchTypes } from "../../actions/auth/types"

interface IDefaultState {
    user: TUserData
}

const defaultState: IDefaultState = {
    user: null
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