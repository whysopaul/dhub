import { TCategory } from "../categories/types"
import { TFeedback } from "../feedback/types"

export const GET_ALL_SERVICES = 'GET_ALL_SERVICES'
export const GET_ALL_SERVICES_LOCATIONS = 'GET_ALL_SERVICES_LOCATIONS'
export const GET_ALL_SERVICES_PLATFORMS = 'GET_ALL_SERVICES_PLATFORMS'
export const GET_ALL_SERVICES_DISCOUNTS = 'GET_ALL_SERVICES_DISCOUNTS'
export const GET_SERVICE = 'GET_SERVICE'
export const GET_SERVICE_APPLICATIONS = 'GET_SERVICE_APPLICATIONS'
export const GET_BLOCK = 'GET_BLOCK'
export const GET_BLOCKS = 'GET_BLOCKS'
export const GET_COLLECTION = 'GET_COLLECTION'
export const GET_COLLECTIONS = 'GET_COLLECTIONS'

export const SERVICES_LOADING = 'SERVICES_LOADING'

export const SERVICE_DATA_UPDATE = 'SERVICE_DATA_UPDATE'
export const SERVICE_UPDATE_LINK = 'SERVICE_UPDATE_LINK'
export const SERVICE_UPDATE_DISCOUNT = 'SERVICE_UPDATE_DISCOUNT'
export const SERVICE_TOGGLE_HIDDEN_STATUS = 'SERVICE_TOGGLE_HIDDEN_STATUS'

export const UPDATE_BLOCK = 'UPDATE_BLOCK'
export const UPDATE_COLLECTION = 'UPDATE_COLLECTION'

export const CREATE_SERVICE = 'CREATE_SERVICE'
export const CREATE_LOCATION = 'CREATE_LOCATION'
export const CREATE_PLATFORM = 'CREATE_PLATFORM'
export const CREATE_SCREENSHOT = 'CREATE_SCREENSHOT'
export const CREATE_SCREENSHOT_WITH_FILE = 'CREATE_SCREENSHOT_WITH_FILE'
export const CREATE_DISCOUNT = 'CREATE_DISCOUNT'
export const CREATE_SERVICE_APPLICATION = 'CREATE_SERVICE_APPLICATION'
export const CREATE_BLOCK = 'CREATE_BLOCK'
export const CREATE_COLLECTION = 'CREATE_COLLECTION'

export const DELETE_SERVICE = 'DELETE_SERVICE'
export const DELETE_LOCATION = 'DELETE_LOCATION'
export const DELETE_PLATFORM = 'DELETE_PLATFORM'
export const DELETE_SCREENSHOT = 'DELETE_SCREENSHOT'
export const DELETE_DISCOUNT = 'DELETE_DISCOUNT'
export const DELETE_SERVICE_APPLICATION = 'DELETE_SERVICE_APPLICATION'
export const DELETE_BLOCK = 'DELETE_BLOCK'
export const DELETE_COLLECTION = 'DELETE_COLLECTION'

export type TServicesData = {
    id: number,
    name: string,
    link: string,
    description: {
        text: string,
        isFree: boolean,
        hasTrial: boolean,
        paymentMethod: string,
        price: string,
        locations: TServiceLocation[],
        platforms: TServicePlatform[],
        hasPartnership: boolean,
        country: string
    },
    rating: number,
    categories_2: TCategory[],
    categories_3: TCategory[],
    images: {
        logo: string,
        screenshots?: TServiceScreenshot[]
    },
    feedbacks: TFeedback[],
    promocode: string, // outdated
    admin_notes: string,
    is_hidden: boolean,
    discounts: TDiscount[],
    isNew?: boolean
}

export type TServiceLocation = {
    id: number,
    name: string,
    connections?: {
        id: number,
        service: number,
        location: number
    }[]
}

export type TServicePlatform = {
    id: number,
    name: string,
    connections?: {
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

export type TDiscount = {
    id: number,
    service: number,
    code: string,
    description: string,
    is_sale: boolean,
    is_promocode: boolean
}

export type TServiceApplication = {
    id?: number,
    username: string,
    contact: string,
    service_name: string,
    service_link: string,
    description: string
}

export type TServicesBlock = {
    id: number,
    title: string,
    collection: number,
    service_ids: number[]
    // services?: TServicesData[]
}

export type TServicesCollection = {
    id: number,
    title: string,
    blocks: TServicesBlock[]
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

interface IGetAllServicesDiscounts {
    type: typeof GET_ALL_SERVICES_DISCOUNTS,
    payload: TDiscount[]
}

interface IGetService {
    type: typeof GET_SERVICE,
    payload: TServicesData
}

interface IGetServiceApplications {
    type: typeof GET_SERVICE_APPLICATIONS,
    payload: TServiceApplication[]
}

interface IGetBlock {
    type: typeof GET_BLOCK,
    payload: TServicesBlock
}

interface IGetBlocks {
    type: typeof GET_BLOCKS,
    payload: TServicesBlock[]
}

interface IGetCollection {
    type: typeof GET_COLLECTION,
    payload: TServicesCollection
}

interface IGetCollections {
    type: typeof GET_COLLECTIONS,
    payload: TServicesCollection[]
}

interface IServicesLoading {
    type: typeof SERVICES_LOADING,
    payload: boolean
}

interface IServiceDataUpdate {
    type: typeof SERVICE_DATA_UPDATE,
    payload: TServicesData
}

interface IServiceUpdateLink {
    type: typeof SERVICE_UPDATE_LINK,
    payload: boolean
}

interface IServiceUpdateDiscount {
    type: typeof SERVICE_UPDATE_DISCOUNT,
    payload: TDiscount
}

interface IServiceToggleHiddenStatus {
    type: typeof SERVICE_TOGGLE_HIDDEN_STATUS,
    payload: string
}

interface IUpdateBlock {
    type: typeof UPDATE_BLOCK,
    payload: TServicesBlock
}

interface IUpdateCollection {
    type: typeof UPDATE_COLLECTION,
    payload: TServicesCollection
}

// interface ICreateService {
//     type: typeof CREATE_SERVICE,
//     payload: TServicesData
// }

interface ICreateLocation {
    type: typeof CREATE_LOCATION,
    payload: TServiceLocation
}

interface ICreatePlatform {
    type: typeof CREATE_PLATFORM,
    payload: TServicePlatform
}

interface ICreateScreenshot {
    type: typeof CREATE_SCREENSHOT,
    payload: TServiceScreenshot
}

interface ICreateScreenshotWithFile {
    type: typeof CREATE_SCREENSHOT_WITH_FILE,
    payload: TServiceScreenshot[]
}

interface ICreateDiscount {
    type: typeof CREATE_DISCOUNT,
    payload: TDiscount
}

interface ICreateServiceApplication {
    type: typeof CREATE_SERVICE_APPLICATION,
    payload: TServiceApplication
}

interface ICreateBlock {
    type: typeof CREATE_BLOCK,
    payload: TServicesBlock
}

interface ICreateCollection {
    type: typeof CREATE_COLLECTION,
    payload: TServicesCollection
}

interface IDeleteAction {
    type: typeof DELETE_SERVICE | typeof DELETE_LOCATION | typeof DELETE_PLATFORM | typeof DELETE_SCREENSHOT | typeof DELETE_DISCOUNT | typeof DELETE_SERVICE_APPLICATION | typeof DELETE_BLOCK | typeof DELETE_COLLECTION,
    payload: string
}

export type servicesDispatchTypes = IGetAllServices | IGetAllServicesLocations | IGetAllServicesPlatforms | IGetAllServicesDiscounts | IGetService | IGetServiceApplications | IGetBlock | IGetBlocks | IGetCollection | IGetCollections
    | IServicesLoading | IServiceDataUpdate | IServiceUpdateLink | IServiceUpdateDiscount | IServiceToggleHiddenStatus
    | IUpdateBlock | IUpdateCollection
    | ICreateLocation | ICreatePlatform | ICreateScreenshot | ICreateScreenshotWithFile | ICreateDiscount | ICreateServiceApplication | ICreateBlock | ICreateCollection
    | IDeleteAction