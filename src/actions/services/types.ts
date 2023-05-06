export const GET_SERVICES_DATA = 'GET_SERVICES_DATA'

interface IGetServicesData {
    type: typeof GET_SERVICES_DATA
}

export type TServicesData = {
    id: number,
    name: string,
    description?: {
        text?: string,
        isFree?: boolean,
        hasTrial?: boolean,
        paymentMethod?: string,
        minPrice?: number,
        location?: string,
        platforms?: string[],
        hasPartnership?: boolean
    },
    rating?: number,
    categories?: string[],
    images?: {
        logo?: string,
        screenshots?: string[]
    },
    isNew?: boolean
}

export type servicesDispatchTypes = IGetServicesData