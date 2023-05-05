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