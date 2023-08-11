import { TUserData } from "../auth/types"

export const ADMIN_GET_ALL_USERS = 'ADMIN_GET_ALL_USERS'
export const ADMIN_SET_SPECIALIST = 'ADMIN_SET_SPECIALIST'
export const ADMIN_UPDATE_SPECIALIST_CONNECTIONS = 'ADMIN_UPDATE_SPECIALIST_CONNECTIONS'

interface IAdminGetAllUsers {
    type: typeof ADMIN_GET_ALL_USERS,
    payload: TUserData[]
}

interface IAdminSetSpecialist {
    type: typeof ADMIN_SET_SPECIALIST,
    payload: TUserData
}

interface IAdminUpdateSpecialistConnections {
    type: typeof ADMIN_UPDATE_SPECIALIST_CONNECTIONS,
    payload: TUserData
}

export type adminDispatchTypes = IAdminGetAllUsers | IAdminSetSpecialist | IAdminUpdateSpecialistConnections