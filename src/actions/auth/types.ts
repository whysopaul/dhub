export const LOGIN = 'LOGIN'

export type TUserData = {
    vk_id: number,
    name: string,
    photo: string,
    token: string
}

interface ILogin {
    type: typeof LOGIN,
    payload: TUserData
}

export type authDispatchTypes = ILogin