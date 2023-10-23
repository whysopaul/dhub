import { TUserData } from "../auth/types"

export const FEEDBACK_CREATE_FEEDBACK = 'FEEDBACK_CREATE_FEEDBACK'
export const FEEDBACK_TOGGLE_FEEDBACK_UPVOTE = 'FEEDBACK_TOGGLE_FEEDBACK_UPVOTE'
export const FEEDBACK_UPDATE_FEEDBACK = 'FEEDBACK_UPDATE_FEEDBACK'
export const FEEDBACK_GENERATE_FEEDBACK = 'FEEDBACK_GENERATE_FEEDBACK'
export const FEEDBACK_CLEAR_GENERATED_FEEDBACK = 'FEEDBACK_CLEAR_GENERATED_FEEDBACK'
export const FEEDBACK_DELETE_FEEDBACK = 'FEEDBACK_DELETE_FEEDBACK'

export const FEEDBACK_GET_USER_FEEDBACK = 'FEEDBACK_GET_USER_FEEDBACK'

export const FEEDBACK_SEARCH_FEEDBACKS = 'FEEDBACK_SEARCH_FEEDBACKS'

export const FEEDBACK_IS_LOADING = 'FEEDBACK_IS_LOADING'

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
    total_rating: number,
    service_name: string,
    service_logo: string,
    is_soup?: boolean,
    soup_name?: string
}

interface IFeedbackCreateFeedback {
    type: typeof FEEDBACK_CREATE_FEEDBACK,
    payload: TFeedback
}

interface IFeedbackToggleFeedbackUpvote {
    type: typeof FEEDBACK_TOGGLE_FEEDBACK_UPVOTE,
    payload: TFeedback
}

interface IFeedbackUpdateFeedback {
    type: typeof FEEDBACK_UPDATE_FEEDBACK,
    payload: TFeedback
}

interface IFeedbackGenerateFeedback {
    type: typeof FEEDBACK_GENERATE_FEEDBACK,
    payload: TFeedback
}

interface IFeedbackClearGeneratedFeedback {
    type: typeof FEEDBACK_CLEAR_GENERATED_FEEDBACK
}

interface IFeedbackDeleteFeedback {
    type: typeof FEEDBACK_DELETE_FEEDBACK,
    payload: string
}

interface IFeedbackGetUserFeedback {
    type: typeof FEEDBACK_GET_USER_FEEDBACK,
    payload: TFeedback[]
}

interface IFeedbackSearchFeedbacks {
    type: typeof FEEDBACK_SEARCH_FEEDBACKS,
    payload: {
        total_count: number,
        data: TFeedback[]
    }
}

interface IFeedbackIsLoading {
    type: typeof FEEDBACK_IS_LOADING,
    payload: boolean
}

export type feedbackDispatchTypes = IFeedbackCreateFeedback | IFeedbackToggleFeedbackUpvote | IFeedbackUpdateFeedback | IFeedbackGenerateFeedback | IFeedbackClearGeneratedFeedback | IFeedbackDeleteFeedback | IFeedbackGetUserFeedback | IFeedbackSearchFeedbacks | IFeedbackIsLoading