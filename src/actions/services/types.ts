import { TCategory } from "../categories/types"

export const GET_ALL_SERVICES = 'GET_ALL_SERVICES'
export const SERVICES_LOADING = 'SERVICES_LOADING'

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
    categories_3: TCategory[],
    images: {
        logo: string,
        screenshots?: TServiceScreenshot[]
    },
    isNew?: boolean
}

export type TServiceLocation = {
    id: number,
    name: string
}

export type TServicePlatform = {
    id: number,
    name: string
}

export type TServiceScreenshot = {
    id: number,
    name?: string,
    service: number,
    source: string
}

interface IGetAllServices {
    type: typeof GET_ALL_SERVICES,
    payload: TServicesData[]
}

interface IServicesLoading {
    type: typeof SERVICES_LOADING,
    payload: boolean
}

export type servicesDispatchTypes = IGetAllServices | IServicesLoading