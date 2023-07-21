import { TUserData } from "../auth/types"

export const ADMIN_GET_ALL_USERS = 'ADMIN_GET_ALL_USERS'

interface IAdminGetAllUsers {
    type: typeof ADMIN_GET_ALL_USERS,
    payload: TUserData[]
}

export type adminDispatchTypes = IAdminGetAllUsers