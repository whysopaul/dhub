import { mockdata } from "../../actions/services/services"
import { GET_SERVICES_DATA, TServicesData, servicesDispatchTypes } from "../../actions/services/types"

interface IDefaultState {
    services: TServicesData[]
}

const defaultState: IDefaultState = {
    services: []
}

const servicesReducer = (state: IDefaultState = defaultState, action: servicesDispatchTypes) => {
    switch (action.type) {
        case GET_SERVICES_DATA:
            return {
                ...state,
                services: mockdata
            }
        default:
            return state
    }
}

export default servicesReducer