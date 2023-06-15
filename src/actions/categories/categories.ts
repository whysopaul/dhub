import { Dispatch } from "react";
import { GET_ALL_CATEGORIES, TMainCategory, categoriesDispatchTypes } from "./types";
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

// export const mockMainCategories: TMainCategory[] = [
//     { id: 1, name: 'Автоматизация бизнес-процессов', subcategories: [{ id: 1, name: 'CRM-системы' }, { id: 2, name: 'Онлайн-запись' }, { id: 3, name: 'Виртуальная АТС' }, { id: 4, name: 'Тендеры' }] },
//     { id: 2, name: 'Автоматизация маркетинга', subcategories: [{ id: 1, name: 'CRM-системы' }, { id: 2, name: 'Онлайн-запись' }, { id: 3, name: 'Виртуальная АТС' }, { id: 4, name: 'Тендеры' }] },
//     { id: 3, name: 'Аналитика для бизнеса', subcategories: [{ id: 1, name: 'CRM-системы' }, { id: 2, name: 'Онлайн-запись' }, { id: 3, name: 'Виртуальная АТС' }, { id: 4, name: 'Тендеры' }] },
//     { id: 4, name: 'Заработок в интернете', subcategories: [{ id: 1, name: 'CRM-системы' }, { id: 2, name: 'Онлайн-запись' }, { id: 3, name: 'Виртуальная АТС' }, { id: 4, name: 'Тендеры' }] }
// ]