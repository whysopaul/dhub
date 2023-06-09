export const GET_ALL_CATEGORIES = 'GET_ALL_CATEGORIES'
export const GET_CATEGORY_RELATIONS = 'GET_CATEGORY_RELATIONS'

export type TMainCategory = {
    id: number,
    name: string,
    subcategories: TCategory[]
}

export type TCategory = {
    id: number,
    name: string,
    index: number
}

export type TCategoryRelations = {
    id: number,
    child: number,
    parent: number
}

interface IGetCategories {
    type: typeof GET_ALL_CATEGORIES,
    payload: TCategory[]
}

interface IGetCategoryRelations {
    type: typeof GET_CATEGORY_RELATIONS,
    payload: TCategoryRelations[]
}

export type categoriesDispatchTypes = IGetCategories | IGetCategoryRelations