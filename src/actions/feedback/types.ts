type TFeedbackPoints = 1 | 2 | 3 | 4 | 5

export type TFeedbackComment = {
    id: number,
    author: string,
    authorsId: number,
    serviceId: number,
    text: string,
    points: {
        functionality: TFeedbackPoints,
        usability: TFeedbackPoints,
        customerService: TFeedbackPoints
    },
    totalRating: number,
    likes: number
}