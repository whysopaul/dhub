import { Dispatch } from "react";
import { LOGIN, authDispatchTypes } from "./types";
import axios from "axios";
import { SERVER_URL } from '../../components/utils'

export const connectVkAccount = () => (dispatch: Dispatch<authDispatchTypes>) => {

    const client_id = '51648679'

    const redirect_uri = 'http://localhost:8080/loginVk'

    const auth = 'https://oauth.vk.com/authorize?client_id=' + client_id + '&redirect_uri=' + redirect_uri + '&scope=notify,offline&response_type=token&v=5.131'

    window.location.replace(auth)

}

export const extractToken = () => (dispatch: Dispatch<authDispatchTypes>) => {

    const queryString = '?' + window.location.href.split('#')[1];
    console.log(queryString)
    const urlParams = new URLSearchParams(queryString);


    const access_token = urlParams.get('access_token')
    console.log(access_token);

    const user_id = urlParams.get('user_id')
    console.log(user_id);

    axios.post(SERVER_URL + '/login', { vk_id: parseInt(user_id), token: access_token }).then(res => {
        console.log(res.data)

        dispatch({
            type: LOGIN,
            payload: res.data
        })

        window.location.replace('/')
    })
}