import { TCategory } from "../categories/types"
import { TFeedback } from "../feedback/types"

export const GET_ALL_SERVICES = 'GET_ALL_SERVICES'
export const GET_ALL_SERVICES_LOCATIONS = 'GET_ALL_SERVICES_LOCATIONS'
export const GET_ALL_SERVICES_PLATFORMS = 'GET_ALL_SERVICES_PLATFORMS'
export const GET_SERVICE = 'GET_SERVICE'
export const SERVICES_LOADING = 'SERVICES_LOADING'
export const SERVICE_DATA_UPDATE = 'SERVICE_DATA_UPDATE'
export const CREATE_SERVICE = 'CREATE_SERVICE'

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

interface ICreateService {
    type: typeof CREATE_SERVICE,
    payload: TServicesData
}

export type servicesDispatchTypes = IGetAllServices | IGetAllServicesLocations | IGetAllServicesPlatforms | IGetService | IServicesLoading | IServiceDataUpdate | ICreateService