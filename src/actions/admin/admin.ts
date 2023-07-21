import { Dispatch } from "react";
import { ADMIN_GET_ALL_USERS, adminDispatchTypes } from "./types";
import axios from "axios";
import { SERVER_URL } from "../../components/utils";
import store from "../../store";

export const adminGetAllUsers = () => (dispatch: Dispatch<adminDispatchTypes>) => {

    const state = store.getState()
    const d_token = state.auth.user?.d_token

    axios.get(SERVER_URL + '/getAllUsers', { params: { d_token } }).then(res => {
        console.log(res.data)

        dispatch({
            type: ADMIN_GET_ALL_USERS,
            payload: res.data
        })
    }).catch(error => {
        console.log(error)
    })
}