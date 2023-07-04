import { TCategory } from "../categories/types"
import { TFeedback } from "../feedback/types"

export const GET_ALL_SERVICES = 'GET_ALL_SERVICES'
export const GET_ALL_SERVICES_LOCATIONS = 'GET_ALL_SERVICES_LOCATIONS'
export const GET_ALL_SERVICES_PLATFORMS = 'GET_ALL_SERVICES_PLATFORMS'
export const GET_SERVICE = 'GET_SERVICE'
export const SERVICES_LOADING = 'SERVICES_LOADING'
export const SERVICE_DATA_UPDATE = 'SERVICE_DATA_UPDATE'

export const CREATE_SERVICE = 'CREATE_SERVICE'
export const CREATE_LOCATION = 'CREATE_LOCATION'
export const CREATE_PLATFORM = 'CREATE_PLATFORM'
export const CREATE_SCREENSHOT = 'CREATE_SCREENSHOT'

export const DELETE_SERVICE = 'DELETE_SERVICE'
export const DELETE_LOCATION = 'DELETE_LOCATION'
export const DELETE_PLATFORM = 'DELETE_PLATFORM'
export const DELETE_SCREENSHOT = 'DELETE_SCREENSHOT'

export type TServicesData = {
    id: number,
    name: string,
    description: {
        text: string,
        isFree: boolean,
        hasTrial: boolean,
        paymentMethod: string,
        price: string,
        locations: TServiceLocation[],
        platforms: TServicePlatform[],
        hasPartnership: boolean
    },
    rating: number,
    categories_2: TCategory[],
    categories_3: TCategory[],
    images: {
        logo: string,
        screenshots?: TServiceScreenshot[]
    },
    feedbacks: TFeedback[],
    promocode: string,
    admin_notes: string,
    is_hidden: boolean,
    isNew?: boolean
}

export type TServiceLocation = {
    id: number,
    name: string,
    connections: {
        id: number,
        service: number,
        location: number
    }[]
}

export type TServicePlatform = {
    id: number,
    name: string,
    connections: {
        id: number,
        service: number,
        platform: number
    }[]
}

export type TServiceScreenshot = {
    id: number,
    name?: string,
    service: number,
    source: string,
    link: string
}

interface IGetAllServices {
    type: typeof GET_ALL_SERVICES,
    payload: TServicesData[]
}

interface IGetAllServicesLocations {
    type: typeof GET_ALL_SERVICES_LOCATIONS,
    payload: TServiceLocation[]
}

interface IGetAllServicesPlatforms {
    type: typeof GET_ALL_SERVICES_PLATFORMS,
    payload: TServicePlatform[]
}

interface IGetService {
    type: typeof GET_SERVICE,
    payload: TServicesData
}

interface IServicesLoading {
    type: typeof SERVICES_LOADING,
    payload: boolean
}

interface IServiceDataUpdate {
    type: typeof SERVICE_DATA_UPDATE,
    payload: TServicesData
}

// interface ICreateService {
//     type: typeof CREATE_SERVICE,
//     payload: TServicesData
// }

interface ICreateLocation {
    type: typeof CREATE_LOCATION,
    payload: any
}

interface ICreatePlatform {
    type: typeof CREATE_PLATFORM,
    payload: any
}

interface ICreateScreenshot {
    type: typeof CREATE_SCREENSHOT,
    payload: any
}

interface IDeleteAction {
    type: typeof DELETE_SERVICE | typeof DELETE_LOCATION | typeof DELETE_PLATFORM | typeof DELETE_SCREENSHOT,
    payload: string
}

export type servicesDispatchTypes = IGetAllServices | IGetAllServicesLocations | IGetAllServicesPlatforms | IGetService | IServicesLoading | IServiceDataUpdate | ICreateLocation | ICreatePlatform | ICreateScreenshot | IDeleteAction