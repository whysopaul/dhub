import { Dispatch } from "react";
import { CategoryName, GET_ALL_CATEGORIES, TMockCategory, categoriesDispatchTypes } from "./types";
import axios from "axios";
import { SERVER_URL } from "../../components/utils";

export const mockCatData: TMockCategory[] = [
    { name: CategoryName.CRMSystems, qty: 43 },
    { name: CategoryName.OnlineAppt, qty: 2 },
    { name: CategoryName.VirtualATC, qty: 13 },
    { name: CategoryName.Tenders, qty: 30 },
    { name: CategoryName.InternetEq, qty: 30 },
    { name: CategoryName.PriceMonitoring, qty: 30 },
]

export const getAllCategories = () => (dispatch: Dispatch<categoriesDispatchTypes>) => {
    axios.get(SERVER_URL + '/getCategories').then(res => {
        console.log(res.data)

        dispatch({
            type: GET_ALL_CATEGORIES,
            payload: res.data
        })
    })
}