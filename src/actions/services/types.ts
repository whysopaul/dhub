export const GET_SERVICES_DATA = 'GET_SERVICES_DATA'



export type TServicesData = {
    id: number,
    name: string,
    description?: {
        text?: string,
        isFree?: boolean,
        hasTrial?: boolean,
        paymentMethod?: string,
        price?: string,
        locations?: {
            id: number,
            name: string
        }[],
        platforms?: {
            id: number,
            name: string
        }[],
        hasPartnership?: boolean
    },
    rating: number,
    categories: {
        id: number,
        name: string
    }[],
    images: {
        logo?: string,
        screenshots?: {
            id: number,
            name?: string,
            service: number,
            source: string
        }[]
    },
    isNew?: boolean
}

interface IGetServicesData {
    type: typeof GET_SERVICES_DATA,
    payload: TServicesData[]
}

export type servicesDispatchTypes = IGetServicesData