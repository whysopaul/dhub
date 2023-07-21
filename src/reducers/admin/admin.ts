import { ADMIN_GET_ALL_USERS, adminDispatchTypes } from "../../actions/admin/types";
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
        default:
            return state
    }
}

export default adminReducer;