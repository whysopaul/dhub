export const SERVER_URL = 'https://api.vtargete.pro/api/digital_hub'
export const URL = window.location.href.includes('localhost') ? 'http://localhost:8080' : 'https://digital-hub-3505b.web.app'

export const createServiceLink = (name: string): string => {
    return name.split(' ').join('').split('.').join('').toLocaleLowerCase()
}

export const openPopup = (setState: { (value: React.SetStateAction<boolean>): void; (arg0: boolean): void; }) => {
    setState(true)
    document.body.style.overflow = 'hidden'
}

export const closePopup = (setState: { (value: React.SetStateAction<boolean>): void; (arg0: boolean): void; }) => {
    setState(false)
    document.body.style.overflow = ''
}