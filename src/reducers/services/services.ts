import { FEEDBACK_CREATE_FEEDBACK, FEEDBACK_DELETE_FEEDBACK, FEEDBACK_TOGGLE_FEEDBACK_UPVOTE, FEEDBACK_UPDATE_FEEDBACK, feedbackDispatchTypes } from "../../actions/feedback/types"
import { CREATE_BLOCK, CREATE_COLLECTION, CREATE_DISCOUNT, CREATE_LOCATION, CREATE_PLATFORM, CREATE_SCREENSHOT, CREATE_SCREENSHOT_WITH_FILE, DELETE_BLOCK, DELETE_COLLECTION, DELETE_DISCOUNT, DELETE_LOCATION, DELETE_PLATFORM, DELETE_SCREENSHOT, DELETE_SERVICE, GET_ALL_SERVICES, GET_ALL_SERVICES_DISCOUNTS, GET_ALL_SERVICES_LOCATIONS, GET_ALL_SERVICES_PLATFORMS, GET_ALL_SERVICES_SIMPLE_LIST, GET_BLOCK, GET_BLOCKS, GET_COLLECTION, GET_COLLECTIONS, GET_MAIN_PAGE, GET_SEARCH, GET_SERVICE, SERVICES_LOADING, SERVICE_DATA_UPDATE, SERVICE_UPDATE_DISCOUNT, TDiscount, TMainPage, TServiceLocation, TServicePlatform, TServicesBlock, TServicesCollection, TServicesData, TServicesDataSimple, UPDATE_BLOCK, UPDATE_COLLECTION, servicesDispatchTypes } from "../../actions/services/types"

interface IDefaultState {
    main_page: TMainPage,
    search: {
        total_count: number,
        data: TServicesData[]
    },
    services: TServicesData[],
    services_hidden: TServicesData[],
    services_simple_list: TServicesDataSimple[],
    locations: TServiceLocation[],
    platforms: TServicePlatform[],
    discounts: TDiscount[],
    blocks: TServicesBlock[],
    collections: TServicesCollection[],
    currentService: TServicesData,
    currentCollection: TServicesCollection,
    currentBlock: TServicesBlock,
    is_loading: boolean
}

const defaultState: IDefaultState = {
    main_page: {
        new_services: [],
        free_services: [],
        top_services: [],
        feedbacks_data: [],
        all_services: []
    },
    search: {
        total_count: 0,
        data: []
    },
    services: [],
    services_hidden: [],
    services_simple_list: [],
    locations: [],
    platforms: [],
    discounts: [],
    blocks: [],
    collections: [],
    currentService: null,
    currentCollection: null,
    currentBlock: null,
    is_loading: false
}

const servicesReducer = (state: IDefaultState = defaultState, action: servicesDispatchTypes | feedbackDispatchTypes) => {
    switch (action.type) {
        case GET_MAIN_PAGE:
            return {
                ...state,
                main_page: action.payload
            }
        case GET_SEARCH:
            return {
                ...state,
                search: action.payload
            }
        case GET_ALL_SERVICES:
            return {
                ...state,
                services: action.payload.filter(s => !s.is_hidden),
                services_hidden: action.payload.filter(s => s.is_hidden)
            }
        case GET_ALL_SERVICES_SIMPLE_LIST:
            return {
                ...state,
                services_simple_list: action.payload
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
        case GET_ALL_SERVICES_DISCOUNTS:
            return {
                ...state,
                discounts: action.payload
            }
        case GET_SERVICE:
            return {
                ...state,
                currentService: action.payload
            }
        case GET_BLOCK:
            return {
                ...state,
                currentBlock: action.payload
            }
        case GET_BLOCKS:
            return {
                ...state,
                blocks: action.payload
            }
        case GET_COLLECTION:
            return {
                ...state,
                currentCollection: action.payload
            }
        case GET_COLLECTIONS:
            return {
                ...state,
                collections: action.payload.sort((a, b) => a.id - b.id)
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
        case SERVICE_UPDATE_DISCOUNT:
            return {
                ...state,
                discounts: [
                    ...state.discounts.map(d => {
                        if (d.id === action.payload.id) {
                            return action.payload
                        }
                        return d
                    })
                ]
            }
        case UPDATE_BLOCK:
            return {
                ...state,
                blocks: [
                    ...state.blocks.map(b => {
                        if (b.id === action.payload.id) {
                            return action.payload
                        }
                        return b
                    })
                ],
                currentBlock: !state.currentBlock ? null : state.currentBlock.id === action.payload.id ? {
                    ...action.payload
                } : state.currentBlock
            }
        case UPDATE_COLLECTION:
            return {
                ...state,
                collections: [
                    ...state.collections.map(c => {
                        if (c.id === action.payload.id) {
                            return action.payload
                        }
                        return c
                    })
                ],
                currentCollection: !state.currentCollection ? null : state.currentCollection.id === action.payload.id ? {
                    ...action.payload
                } : state.currentCollection
            }
        case CREATE_LOCATION:
            return {
                ...state,
                locations: [...state.locations, action.payload]
            }
        case CREATE_PLATFORM:
            return {
                ...state,
                platforms: [...state.platforms, action.payload]
            }
        case CREATE_SCREENSHOT:
            return {
                ...state,
                currentService: {
                    ...state.currentService,
                    images: {
                        ...state.currentService.images,
                        screenshots: [
                            ...state.currentService.images.screenshots,
                            action.payload
                        ]
                    }
                }
            }
        case CREATE_SCREENSHOT_WITH_FILE:
            return {
                ...state,
                currentService: {
                    ...state.currentService,
                    images: {
                        ...state.currentService.images,
                        screenshots: [
                            ...state.currentService.images.screenshots,
                            ...action.payload
                        ]
                    }
                }
            }
        case CREATE_DISCOUNT:
            return {
                ...state,
                discounts: [...state.discounts, action.payload]
            }
        case CREATE_BLOCK:
            return {
                ...state,
                blocks: [...state.blocks, action.payload]
            }
        case CREATE_COLLECTION:
            return {
                ...state,
                collections: [...state.collections, action.payload]
            }
        case DELETE_SERVICE:
            return {
                ...state,
                services: [...state.services.filter(service => service.id !== parseInt(action.payload))]
            }
        case DELETE_LOCATION:
            return {
                ...state,
                locations: [...state.locations.filter(location => location.id !== parseInt(action.payload))]
            }
        case DELETE_PLATFORM:
            return {
                ...state,
                platforms: [...state.platforms.filter(platform => platform.id !== parseInt(action.payload))]
            }
        case DELETE_SCREENSHOT:
            return {
                ...state,
                currentService: {
                    ...state.currentService,
                    images: {
                        ...state.currentService.images,
                        screenshots: state.currentService.images.screenshots.filter(s => s.id !== parseInt(action.payload))
                    }
                }
            }
        case DELETE_DISCOUNT:
            return {
                ...state,
                discounts: [...state.discounts.filter(discount => discount.id !== parseInt(action.payload))]
            }
        case DELETE_BLOCK:
            return {
                ...state,
                blocks: [...state.blocks.filter(b => b.id !== parseInt(action.payload))]
            }
        case DELETE_COLLECTION:
            return {
                ...state,
                collections: [...state.collections.filter(c => c.id !== parseInt(action.payload))]
            }
        case FEEDBACK_CREATE_FEEDBACK:
            return {
                ...state,
                currentService: !state.currentService ? null : {
                    ...state.currentService,
                    feedbacks: state.currentService.id === action.payload.service
                        ? [...state.currentService.feedbacks, action.payload]
                        : [...state.currentService.feedbacks]
                }
            }
        case FEEDBACK_TOGGLE_FEEDBACK_UPVOTE:
            return {
                ...state,
                currentService: !state.currentService ? null : {
                    ...state.currentService,
                    feedbacks: state.currentService.id === action.payload.service
                        ? [
                            ...state.currentService.feedbacks.map(feedback => {
                                if (feedback.id === action.payload.id) {
                                    return action.payload
                                }
                                return feedback
                            })
                        ]
                        : [...state.currentService.feedbacks]
                }
            }
        case FEEDBACK_UPDATE_FEEDBACK:
            return {
                ...state,
                currentService: !state.currentService ? null : {
                    ...state.currentService,
                    feedbacks: state.currentService.id === action.payload.service
                        ? [
                            ...state.currentService.feedbacks.map(feedback => {
                                if (feedback.id === action.payload.id) {
                                    return action.payload
                                }
                                return feedback
                            })
                        ]
                        : [...state.currentService.feedbacks]
                }
            }
        case FEEDBACK_DELETE_FEEDBACK:
            return {
                ...state,
                currentService: !state.currentService ? null : {
                    ...state.currentService,
                    feedbacks: [...state.currentService.feedbacks.filter(feedback => feedback.id !== parseInt(action.payload))]
                }
            }
        default:
            return state
    }
}

export default servicesReducer