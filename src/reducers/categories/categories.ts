import { CATEGORIES_LOADING, CREATE_CATEGORY, DELETE_CATEGORY, GET_ALL_CATEGORIES, TCategory, UPDATE_CATEGORY, categoriesDispatchTypes } from "../../actions/categories/types"

interface IDefaultState {
    categories: TCategory[],
    is_loading: boolean
}

const defaultState: IDefaultState = {
    categories: [],
    is_loading: false
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
        case CATEGORIES_LOADING:
            return {
                ...state,
                is_loading: action.payload
            }
        default:
            return state
    }
}