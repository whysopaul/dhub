import { TServicesData } from "../services/types"

export const USER_LOGIN = 'USER_LOGIN'
export const USER_LOGOUT = 'USER_LOGOUT'
export const USER_ADD_HISTORY = 'USER_ADD_HISTORY'

export const USER_LOGIN_POPUP_STATE = 'USER_LOGIN_POPUP_STATE'

export type TUserData = {
    id: number,
    vk_id: number,
    name: string,
    photo: string,
    token: string,
    is_admin: boolean,
    d_token: string,
    history: number[], // service_id array
    history_dict: TServicesData[],
    is_specialist: boolean,
    specialist_description: string,
    specialist_services: number[]
}

interface IUserLogin {
    type: typeof USER_LOGIN,
    payload: TUserData
}

interface IUserLogout {
    type: typeof USER_LOGOUT
}

interface IUserAddHistory {
    type: typeof USER_ADD_HISTORY,
    payload: TUserData
}

interface IUserLoginPopupState {
    type: typeof USER_LOGIN_POPUP_STATE,
    payload: boolean
}

export type authDispatchTypes = IUserLogin | IUserLogout | IUserAddHistory | IUserLoginPopupState