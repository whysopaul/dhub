import { FEEDBACK_CREATE_FEEDBACK, FEEDBACK_DELETE_FEEDBACK, FEEDBACK_TOGGLE_FEEDBACK_UPVOTE, TFeedback, TFeedbackComment, feedbackDispatchTypes } from "./types";
import MockFeedbackUserPhoto from '../../static/images/feedback_user_mock_photo.webp';
import { Dispatch } from "react";
import axios from "axios";
import { SERVER_URL } from "../../components/utils";

export const feedbackCreateFeedback = (d_token: string, feedback: TFeedback) => (dispatch: Dispatch<feedbackDispatchTypes>) => {
    axios.post(SERVER_URL + '/createFeedback', JSON.stringify({ d_token, feedback })).then(res => {
        console.log(res.data)

        dispatch({
            type: FEEDBACK_CREATE_FEEDBACK,
            payload: res.data
        })
    }).catch(error => {
        console.log(error)
    })
}

export const feedbackToggleFeedbackUpvote = (d_token: string, id: number) => (dispatch: Dispatch<feedbackDispatchTypes>) => {
    axios.post(SERVER_URL + '/toggleFeedbackUpvote', JSON.stringify({ d_token, id })).then(res => {
        console.log(res.data)

        dispatch({
            type: FEEDBACK_TOGGLE_FEEDBACK_UPVOTE,
            payload: res.data
        })
    }).catch(error => {
        console.log(error)
    })
}

export const feedbackDeleteFeedback = (d_token: string, id: number) => (dispatch: Dispatch<feedbackDispatchTypes>) => {
    axios.delete(SERVER_URL + '/deleteFeedback', { params: { d_token, id } }).then(res => {
        console.log(res.data)

        dispatch({
            type: FEEDBACK_DELETE_FEEDBACK,
            payload: res.data
        })
    }).catch(error => {
        console.log(error)
    })
}

export const mockFeedbackData: TFeedbackComment[] = new Array(4).fill({}).map((i, idx) => { return { ...i, id: idx + 1, author: { firstName: 'Константин', lastName: 'Коваленко', profilePhoto: MockFeedbackUserPhoto }, text: 'Я использую подобные сервисы для накрутки в телеграм. Решил и этот попробовать. Отзывам я не верю никаким, пока сам не проверю. Перво наперво смотрел по стоимости, услуга подписчики с гарантией немного дороже но она лучше работает, здесь нормально, подписчики.', points: { functionality: 5, usability: 3, customerService: 1 }, likes: 30 + idx } })