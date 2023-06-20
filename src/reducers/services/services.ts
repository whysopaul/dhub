import { GET_ALL_SERVICES, GET_ALL_SERVICES_LOCATIONS, GET_ALL_SERVICES_PLATFORMS, GET_SERVICE, SERVICES_LOADING, SERVICE_DATA_UPDATE, TServiceLocation, TServicePlatform, TServicesData, servicesDispatchTypes } from "../../actions/services/types"

interface IDefaultState {
    services: TServicesData[],
    locations: TServiceLocation[],
    platforms: TServicePlatform[],
    currentService: TServicesData,
    is_loading: boolean
}

const defaultState: IDefaultState = {
    services: [],
    locations: [],
    platforms: [],
    currentService: null,
    is_loading: false
}

const servicesReducer = (state: IDefaultState = defaultState, action: servicesDispatchTypes) => {
    switch (action.type) {
        case GET_ALL_SERVICES:
            return {
                ...state,
                services: action.payload
            }
        case GET_ALL_SERVICES_LOCATIONS:
            return {
                ...state,
                locations: action.payload
            }
        case GET_ALL_SERVICES_PLATFORMS:
            return {
                ...state,
                platforms: action.payload
            }
        case GET_SERVICE:
            return {
                ...state,
                currentService: action.payload
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