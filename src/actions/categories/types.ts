export const GET_ALL_CATEGORIES = 'GET_ALL_CATEGORIES'
export const CREATE_CATEGORY = 'CREATE_CATEGORY'
export const CREATE_CATEGORY_RELATIONS = 'CREATE_CATEGORY_RELATIONS'

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

interface ICreateCategory {
    type: typeof CREATE_CATEGORY,
    payload: any
}

interface ICreateCategoryRelations {
    type: typeof CREATE_CATEGORY_RELATIONS,
    payload: any
}

export type categoriesDispatchTypes = IGetCategories | ICreateCategory | ICreateCategoryRelations