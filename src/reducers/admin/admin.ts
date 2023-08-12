import { ADMIN_GET_ALL_USERS, ADMIN_SET_SPECIALIST, ADMIN_UPDATE_SPECIALIST_CONNECTIONS, adminDispatchTypes } from "../../actions/admin/types";
import { TUserData } from "../../actions/auth/types";
import { DELETE_SERVICE_APPLICATION, GET_SERVICE_APPLICATIONS, TServiceApplication, servicesDispatchTypes } from "../../actions/services/types";

interface IDefaultState {
    users: TUserData[],
    applications: TServiceApplication[]
}

const defaultState: IDefaultState = {
    users: [],
    applications: []
}

const adminReducer = (state: IDefaultState = defaultState, action: adminDispatchTypes | servicesDispatchTypes) => {
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
        case ADMIN_UPDATE_SPECIALIST_CONNECTIONS:
            return {
                ...state,
                users: [
                    ...state.users.map(u => {
                        if (u.id === action.payload.id) {
                            return {
                                ...u,
                                specialist_services: action.payload.specialist_services
                            }
                        }
                        return u
                    })
                ]
            }
        case GET_SERVICE_APPLICATIONS:
            return {
                ...state,
                applications: action.payload
            }
        case DELETE_SERVICE_APPLICATION:
            return {
                ...state,
                applications: state.applications.filter(a => a.id !== parseInt(action.payload))
            }
        default:
            return state
    }
}

export default adminReducer;