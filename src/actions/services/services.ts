import { Dispatch } from "react";
import { GET_SERVICES_DATA, TServicesData, servicesDispatchTypes } from "./types";

export const getServicesData = () => (dispatch: Dispatch<servicesDispatchTypes>) => {
    dispatch({
        type: GET_SERVICES_DATA
    })
}

// const mockdata: TServicesData[] = new Array(6).fill('').map((e, i) => { return { id: i, name: 'Boost Like ' + i + 1, description: { text: 'hehe' } } })

export const mockdata: TServicesData[] = [
    { id: 1, name: 'Boost Like', description: { text: 'hehe' } },
    { id: 2, name: 'Boost Like 2', description: { text: 'hehehe' } },
    { id: 3, name: 'Boost Like 3', description: { text: 'hehehehe' } },
    { id: 4, name: 'Boost Like 4', description: { text: 'hehehehe hehe' } },
    { id: 5, name: 'Boost Like 5', description: { text: 'hehehehe hehehe' } },
    { id: 6, name: 'Boost Like 6', description: { text: 'hehehehe hehehehe' } },
]