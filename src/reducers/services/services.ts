import { GET_ALL_SERVICES, SERVICES_LOADING, SERVICE_DATA_UPDATE, TServicesData, servicesDispatchTypes } from "../../actions/services/types"

interface IDefaultState {
    services: TServicesData[],
    is_loading: boolean
}

const defaultState: IDefaultState = {
    services: [],
    is_loading: false
}

const servicesReducer = (state: IDefaultState = defaultState, action: servicesDispatchTypes) => {
    switch (action.type) {
        case GET_ALL_SERVICES:
            return {
                ...state,
                services: action.payload
            }
        case SERVICES_LOADING:
            return {
                ...state,
                is_loading: action.payload
            }
        case SERVICE_DATA_UPDATE:
            return {
                ...state,
                services: [
                    ...state.services.map(service => {
                        if (service.id === action.payload.id) {
                            return action.payload
                        }
                        return service
                    })
                ]
            }
        default:
            return state
    }
}

export default servicesReducer