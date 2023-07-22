import { TUserData } from "../auth/types"

export const ADMIN_GET_ALL_USERS = 'ADMIN_GET_ALL_USERS'
export const ADMIN_SET_SPECIALIST = 'ADMIN_SET_SPECIALIST'

interface IAdminGetAllUsers {
    type: typeof ADMIN_GET_ALL_USERS,
    payload: TUserData[]
}

interface IAdminSetSpecialist {
    type: typeof ADMIN_SET_SPECIALIST,
    payload: TUserData
}

export type adminDispatchTypes = IAdminGetAllUsers | IAdminSetSpecialist