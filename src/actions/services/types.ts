export const GET_ALL_SERVICES = 'GET_ALL_SERVICES'

export type TServicesData = {
    id: number,
    name: string,
    description: {
        text: string,
        isFree: boolean,
        hasTrial: boolean,
        paymentMethod: string,
        price: string,
        locations: {
            id: number,
            name: string
        }[],
        platforms: {
            id: number,
            name: string
        }[],
        hasPartnership: boolean
    },
    rating: number,
    categories: {
        id: number,
        name: string
    }[],
    images: {
        logo: string,
        screenshots?: {
            id: number,
            name?: string,
            service: number,
            source: string
        }[]
    },
    isNew?: boolean
}

interface IGetAllServices {
    type: typeof GET_ALL_SERVICES,
    payload: TServicesData[]
}

export type servicesDispatchTypes = IGetAllServices