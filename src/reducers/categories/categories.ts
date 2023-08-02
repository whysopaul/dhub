import { CREATE_CATEGORY, DELETE_CATEGORY, GET_ALL_CATEGORIES, TCategory, UPDATE_CATEGORY, categoriesDispatchTypes } from "../../actions/categories/types"

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
        case CREATE_CATEGORY:
            return {
                ...state,
                categories: [...state.categories, action.payload]
            }
        case UPDATE_CATEGORY:
            return {
                ...state,
                categories: [
                    ...state.categories.map(c => {
                        if (c.id === action.payload.id) {
                            return action.payload
                        }
                        return c
                    })
                ]
            }
        case DELETE_CATEGORY:
            return {
                ...state,
                categories: [...state.categories.filter(category => category.id !== parseInt(action.payload))]
            }
        default:
            return state
    }
}