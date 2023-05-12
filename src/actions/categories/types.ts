export const GET_CATEGORIES = 'GET_CATEGORIES'

export enum CategoryName {
    CRMSystems = 'CRM-СИСТЕМЫ',
    OnlineAppt = 'ОНЛАЙН-ЗАПИСЬ',
    VirtualATC = 'ВИРТУАЛЬНАЯ АТС',
    Tenders = 'ТЕНДЕРЫ',
    InternetEq = 'ИНТЕРНЕТ-ЭКВАЙРИНГ',
    PriceMonitoring = 'МОНИТОРИНГ ЦЕН'
}

export type TMockCategory = {
    name: CategoryName,
    qty: number
}

export type TCategory = {
    id: number,
    name: string
}

interface IGetCategories {
    type: typeof GET_CATEGORIES,
    payload: TCategory[]
}

export type categoriesDispatchTypes = IGetCategories