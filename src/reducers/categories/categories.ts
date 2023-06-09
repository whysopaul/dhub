import { GET_ALL_CATEGORIES, GET_CATEGORY_RELATIONS, TCategory, TCategoryRelations, categoriesDispatchTypes } from "../../actions/categories/types"

interface IDefaultState {
    categories: TCategory[],
    categories_relations: TCategoryRelations[]
}

const defaultState: IDefaultState = {
    categories: [],
    categories_relations: []
}

export const categoriesReducer = (state: IDefaultState = defaultState, action: categoriesDispatchTypes) => {
    switch (action.type) {
        case GET_ALL_CATEGORIES:
            return {
                ...state,
                categories: action.payload
            }
        case GET_CATEGORY_RELATIONS:
            return {
                ...state,
                categories_relations: action.payload
            }
        default:
            return state
    }
}