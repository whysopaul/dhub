import { useDispatch } from "react-redux"
import store from "../../store"
import { useEffect } from "react"
import { getAllCategories, getCategoriesTree } from "../../actions/categories/categories"
import { getServicesData } from "../../actions/services/services"

const GetData = () => {
    const dispatch = useDispatch()

    const state = store.getState()

    useEffect(() => {
        if (state.services.services.length === 0 || state.categories.categories.length === 0) {
            dispatch(getServicesData())
            dispatch(getAllCategories())
            dispatch(getCategoriesTree())
        }
    }, [])

    return null
}

export default GetData;