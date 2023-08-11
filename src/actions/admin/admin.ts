import { Dispatch } from "react";
import { ADMIN_GET_ALL_USERS, ADMIN_SET_SPECIALIST, ADMIN_UPDATE_SPECIALIST_CONNECTIONS, adminDispatchTypes } from "./types";
import axios from "axios";
import { SERVER_URL } from "../../components/utils";
import store from "../../store";

export const adminGetAllUsers = () => (dispatch: Dispatch<adminDispatchTypes>) => {
    axios.get(SERVER_URL + '/getAllUsers', withToken()).then(res => {
        console.log(res.data)

        dispatch({
            type: ADMIN_GET_ALL_USERS,
            payload: res.data
        })
    }).catch(error => {
        console.log(error)
    })
}

export const adminSetSpecialist = (d_token: string, user_id: number, is_specialist: boolean, specialist_description: string) => (dispatch: Dispatch<adminDispatchTypes>) => {
    axios.post(SERVER_URL + '/setSpecialist', JSON.stringify({ d_token, user_id, is_specialist, specialist_description })).then(res => {
        console.log(res.data)

        dispatch({
            type: ADMIN_SET_SPECIALIST,
            payload: res.data
        })
    }).catch(error => {
        console.log(error)
    })
}

export const adminUpdateSpecialistConnections = (d_token: string, user_id: number, service_ids: number[]) => (dispatch: Dispatch<adminDispatchTypes>) => {
    axios.post(SERVER_URL + '/updateSpecialistConnections', JSON.stringify({ d_token, user_id, service_ids })).then(res => {
        console.log(res.data)

        dispatch({
            type: ADMIN_UPDATE_SPECIALIST_CONNECTIONS,
            payload: res.data
        })
    }).catch(error => {
        console.log(error)
    })
}

export const withToken = () => {
    const state = store.getState()
    const d_token = state.auth.user?.d_token

    return {
        params: {
            d_token
        }
    }
}