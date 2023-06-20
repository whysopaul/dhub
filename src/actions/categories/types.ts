export const GET_ALL_CATEGORIES = 'GET_ALL_CATEGORIES'

// export type TMainCategory = {
//     id: number,
//     name: string,
//     subcategories: TCategory[]
// }

export type TCategory = {
    id: number,
    name: string,
    index: number,
    parent: number,
    connections: {
        id: number,
        service: number,
        category: number
    }[]
}

interface IGetCategories {
    type: typeof GET_ALL_CATEGORIES,
    payload: TCategory[]
}

export type categoriesDispatchTypes = IGetCategories