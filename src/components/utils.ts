export const SERVER_URL = 'https://api.vtargete.pro/api/digital_hub'
export const URL = window.location.href.includes('localhost') ? 'http://localhost:8080' : 'https://digital-hub-3505b.web.app'

export const createServiceLink = (name: string): string => {
    return name.split(' ').join('').split('.').join('').toLocaleLowerCase()
}

export const getScreen = (path: string): string => {
    return path
}

export const feedbacksLength = (feedbacks_length: number): string => {
    let m = feedbacks_length % 10

    if (feedbacks_length === 0) {
        return 'Нет отзывов'
    }
    if (feedbacks_length < 10 && m === 1 || feedbacks_length > 20 && m === 1) {
        return feedbacks_length + ' отзыв'
    }
    if (feedbacks_length < 10 && m > 1 && m < 5 || feedbacks_length > 20 && m > 1 && m < 5) {
        return feedbacks_length + ' отзыва'
    }
    if (feedbacks_length < 10 && m >= 5 || feedbacks_length > 20 && m >= 5) {
        return feedbacks_length + ' отзывов'
    }
    if (feedbacks_length >= 10 && feedbacks_length >= 20) {
        return feedbacks_length + ' отзывов'
    }
}