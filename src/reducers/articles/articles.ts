import { ARTICLES_CREATE_POST, ARTICLES_DELETE_POST, ARTICLES_GET_POST, ARTICLES_GET_POSTS, ARTICLES_UPDATE_POST, TArticlesData, articlesDispatchTypes } from "../../actions/articles/types";

interface IDefaultState {
    articles: TArticlesData[],
    currentArticle: TArticlesData
}

const defaultState: IDefaultState = {
    articles: [],
    currentArticle: null
}

const articlesReducer = (state: IDefaultState = defaultState, action: articlesDispatchTypes) => {
    switch (action.type) {
        case ARTICLES_GET_POSTS:
            return {
                ...state,
                articles: action.payload
            }
        case ARTICLES_GET_POST:
            return {
                ...state,
                currentArticle: action.payload
            }
        case ARTICLES_CREATE_POST:
            return {
                ...state,
                articles: [...state.articles, action.payload]
            }
        case ARTICLES_UPDATE_POST:
            return {
                ...state,
                currentArticle: state.currentArticle?.id === action.payload.id ? action.payload : state.currentArticle
            }
        case ARTICLES_DELETE_POST:
            return {
                ...state,
                articles: [...state.articles.filter(article => article.id !== parseInt(action.payload))],
                currentArticle: null
            }
        default:
            return state
    }
}

export default articlesReducer