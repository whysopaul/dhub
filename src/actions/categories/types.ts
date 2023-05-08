export enum CategoryName {
    CRMSystems = 'CRM-СИСТЕМЫ',
    OnlineAppt = 'ОНЛАЙН-ЗАПИСЬ',
    VirtualATC = 'ВИРТУАЛЬНАЯ АТС',
    Tenders = 'ТЕНДЕРЫ',
    InternetEq = 'ИНТЕРНЕТ-ЭКВАЙРИНГ',
    PriceMonitoring = 'МОНИТОРИНГ ЦЕН'
}

export type TCategory = {
    name: CategoryName,
    qty: number
}