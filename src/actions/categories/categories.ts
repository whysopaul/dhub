import { Dispatch } from "react";
import { CREATE_CATEGORY, CREATE_CATEGORY_RELATIONS, DELETE_CATEGORY, GET_ALL_CATEGORIES, TCategory, TNewCategory, UPDATE_CATEGORY, categoriesDispatchTypes } from "./types";
import axios from "axios";
import { SERVER_URL } from "../../components/utils";

export const getAllCategories = () => (dispatch: Dispatch<categoriesDispatchTypes>) => {
    axios.get(SERVER_URL + '/getCategories').then(res => {
        // console.log(res.data)

        dispatch({
            type: GET_ALL_CATEGORIES,
            payload: res.data
        })
    }).catch(error => {
        console.log(error)
    })
}

export const createCategory = (category: TNewCategory) => (dispatch: Dispatch<categoriesDispatchTypes>) => {
    axios.post(SERVER_URL + '/createCategory', JSON.stringify({ category })).then(res => {
        // console.log(res.data)

        dispatch({
            type: CREATE_CATEGORY,
            payload: res.data
        })

        // window.location.reload()
    }).catch(error => {
        console.log(error)
    })
}

export const createCategoryRelations = (cat_id: number, parent_id: number) => (dispatch: Dispatch<categoriesDispatchTypes>) => {
    axios.post(SERVER_URL + '/createCategoryRelations', JSON.stringify({ cat_id, parent_id })).then(res => {
        console.log(res.data)

        dispatch({
            type: CREATE_CATEGORY_RELATIONS,
            payload: res.data
        })
    }).catch(error => {
        console.log(error)
    })
}

export const updateCategory = (category: TCategory) => (dispatch: Dispatch<categoriesDispatchTypes>) => {
    axios.post(SERVER_URL + '/updateCategory', JSON.stringify({ category })).then(res => {
        console.log(res.data)

        dispatch({
            type: UPDATE_CATEGORY,
            payload: res.data
        })
    }).catch(error => {
        console.log(error)
    })
}

export const deleteCategory = (id: number, d_token: string) => (dispatch: Dispatch<categoriesDispatchTypes>) => {
    axios.delete(SERVER_URL + '/deleteCategory', { params: { id, d_token } }).then(res => {
        // console.log(res.data)

        dispatch({
            type: DELETE_CATEGORY,
            payload: res.data
        })

        window.location.reload()
    }).catch(error => {
        console.log(error)
    })
}

// export const mockMainCategories: TMainCategory[] = [
//     { id: 1, name: 'Автоматизация бизнес-процессов', subcategories: [{ id: 1, name: 'CRM-системы' }, { id: 2, name: 'Онлайн-запись' }, { id: 3, name: 'Виртуальная АТС' }, { id: 4, name: 'Тендеры' }] },
//     { id: 2, name: 'Автоматизация маркетинга', subcategories: [{ id: 1, name: 'CRM-системы' }, { id: 2, name: 'Онлайн-запись' }, { id: 3, name: 'Виртуальная АТС' }, { id: 4, name: 'Тендеры' }] },
//     { id: 3, name: 'Аналитика для бизнеса', subcategories: [{ id: 1, name: 'CRM-системы' }, { id: 2, name: 'Онлайн-запись' }, { id: 3, name: 'Виртуальная АТС' }, { id: 4, name: 'Тендеры' }] },
//     { id: 4, name: 'Заработок в интернете', subcategories: [{ id: 1, name: 'CRM-системы' }, { id: 2, name: 'Онлайн-запись' }, { id: 3, name: 'Виртуальная АТС' }, { id: 4, name: 'Тендеры' }] }
// ]