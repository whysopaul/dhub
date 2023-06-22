import { TUserData } from "../auth/types"

export const FEEDBACK_CREATE_FEEDBACK = 'FEEDBACK_CREATE_FEEDBACK'
export const FEEDBACK_TOGGLE_FEEDBACK_UPVOTE = 'FEEDBACK_TOGGLE_FEEDBACK_UPVOTE'
export const FEEDBACK_DELETE_FEEDBACK = 'FEEDBACK_DELETE_FEEDBACK'

type TFeedbackPoints = 1 | 2 | 3 | 4 | 5

export type TFeedbackComment = {
    id: number,
    author: {
        id?: number,
        firstName: string,
        lastName: string,
        profilePhoto?: string
    },
    serviceId?: number,
    text: string,
    points: {
        functionality: TFeedbackPoints,
        usability: TFeedbackPoints,
        customerService: TFeedbackPoints
    },
    totalRating?: number,
    likes: number
}

export type TFeedback = {
    id: number,
    user: TUserData,
    service: number,
    text: string,
    functionality: number,
    usability: number,
    customer_service: number,
    likes: number[], // vk_id array
    total_rating: number
}

interface IFeedbackCreateFeedback {
    type: typeof FEEDBACK_CREATE_FEEDBACK,
    payload: TFeedback
}

interface IFeedbackToggleFeedbackUpvote {
    type: typeof FEEDBACK_TOGGLE_FEEDBACK_UPVOTE,
    payload: TFeedback
}

interface IFeedbackDeleteFeedback {
    type: typeof FEEDBACK_DELETE_FEEDBACK,
    payload: number
}

export type feedbackDispatchTypes = IFeedbackCreateFeedback | IFeedbackToggleFeedbackUpvote | IFeedbackDeleteFeedback