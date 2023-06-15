import { GET_ALL_CATEGORIES, TCategory, categoriesDispatchTypes } from "../../actions/categories/types"

interface IDefaultState {
    categories: TCategory[],
}

const defaultState: IDefaultState = {
    categories: [],
}

export const categoriesReducer = (state: IDefaultState = defaultState, action: categoriesDispatchTypes) => {
    switch (action.type) {
        case GET_ALL_CATEGORIES:
            return {
                ...state,
                categories: action.payload
            }
        default:
            return state
    }
}