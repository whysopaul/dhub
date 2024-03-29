import { Dispatch } from "react";
import { USER_ADD_HISTORY, USER_LOGIN, USER_LOGIN_POPUP_STATE, USER_LOGOUT, authDispatchTypes } from "./types";
import axios from "axios";
import { SERVER_URL, URL } from '../../components/utils'

export const connectVkAccount = () => (dispatch: Dispatch<authDispatchTypes>) => {

    const client_id = '51648679'

    const redirect_uri = URL + '/loginVk'

    const auth = 'https://oauth.vk.com/authorize?client_id=' + client_id + '&redirect_uri=' + redirect_uri + '&scope=notify,offline&response_type=token&v=5.131'

    window.location.replace(auth)

}

export const extractToken = () => (dispatch: Dispatch<authDispatchTypes>) => {

    const queryString = '?' + window.location.href.split('#')[1];
    // console.log(queryString)
    const urlParams = new URLSearchParams(queryString);

    const access_token = urlParams.get('access_token')
    console.log(access_token);

    const user_id = urlParams.get('user_id')
    console.log(user_id);

    axios.post(SERVER_URL + '/login', { vk_id: parseInt(user_id), token: access_token }).then(res => {
        console.log(res.data)

        dispatch({
            type: USER_LOGIN,
            payload: res.data
        })

        window.location.replace('/')
    }).catch(error => {
        console.log(error)
    })
}

export const userLogout = () => (dispatch: Dispatch<authDispatchTypes>) => {
    dispatch({
        type: USER_LOGOUT
    })

    window.location.replace('/')
}

export const userAddHistory = (d_token: string, service_id: number) => (dispatch: Dispatch<authDispatchTypes>) => {
    axios.post(SERVER_URL + '/addHistory', JSON.stringify({ d_token, service_id })).then(res => {
        // console.log(res.data)

        dispatch({
            type: USER_ADD_HISTORY,
            payload: res.data
        })
    }).catch(error => {
        console.log(error)
    })
}

export const userShowLoginPopup = () => (dispatch: Dispatch<authDispatchTypes>) => {
    dispatch({
        type: USER_LOGIN_POPUP_STATE,
        payload: true
    })
}

export const userHideLoginPopup = () => (dispatch: Dispatch<authDispatchTypes>) => {
    dispatch({
        type: USER_LOGIN_POPUP_STATE,
        payload: false
    })
}