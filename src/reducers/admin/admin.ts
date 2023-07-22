import { ADMIN_GET_ALL_USERS, ADMIN_SET_SPECIALIST, adminDispatchTypes } from "../../actions/admin/types";
import { TUserData } from "../../actions/auth/types";

interface IDefaultState {
    users: TUserData[]
}

const defaultState: IDefaultState = {
    users: []
}

const adminReducer = (state: IDefaultState = defaultState, action: adminDispatchTypes) => {
    switch (action.type) {
        case ADMIN_GET_ALL_USERS:
            return {
                ...state,
                users: action.payload
            }
        case ADMIN_SET_SPECIALIST:
            return {
                ...state,
                users: [
                    ...state.users.map(u => {
                        if (u.id === action.payload.id) {
                            return action.payload
                        }
                        return u
                    })
                ]
            }
        default:
            return state
    }
}

export default adminReducer;