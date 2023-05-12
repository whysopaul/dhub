import { GET_ALL_SERVICES, TServicesData, servicesDispatchTypes } from "../../actions/services/types"

interface IDefaultState {
    services: TServicesData[]
}

const defaultState: IDefaultState = {
    services: []
}

const servicesReducer = (state: IDefaultState = defaultState, action: servicesDispatchTypes) => {
    switch (action.type) {
        case GET_ALL_SERVICES:
            return {
                ...state,
                services: action.payload
            }
        default:
            return state
    }
}

export default servicesReducer