import { TFeedbackComment } from "./types";

export const mockFeedbackData: TFeedbackComment[] = new Array(4).fill({}).map((i, idx) => { return { ...i, id: idx + 1, author: { firstName: 'Константин', lastName: 'Коваленко', profilePhoto: 'https://s3-alpha-sig.figma.com/img/210c/a147/56bff084de2a4bcbbc17aeddcb441fda?Expires=1684713600&Signature=gG4V7IXvUUwPpkwF2VBjcJjZTUzHOIhkwOxVd--Xx6YXfLTiqQxiPAaBA1mVM2KFIl8qttIKW6t3O5QOuLbrYOM8oPl1zHlUgJDqVDICRTEi7vHR8BwS6U3D424jGV9bgjWHD4GygimINnXUREfXhMxXpDeKYq6FuAroj~uEMaTJMCZ3Rb0ueXf2sbBZTFFGSqkfTb7RY~yzV1wb5Jhapo3-BAZ~N5D1nJNHHlmRvVf2jV9kK-zGfqxO-bjrLtT9JeX0MtxhYHcAs44Z7c57MKJ2LP~8chsVL-RJR8a3R~E9RUql6mokjImOlkYbGlMEjOK8JvvTI8Xwrg3x6KHiGg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4' }, text: 'Я использую подобные сервисы для накрутки в телеграм. Решил и этот попробовать. Отзывам я не верю никаким, пока сам не проверю. Перво наперво смотрел по стоимости, услуга подписчики с гарантией немного дороже но она лучше работает, здесь нормально, подписчики.', points: { functionality: 5, usability: 3, customerService: 1 }, likes: 30 } })