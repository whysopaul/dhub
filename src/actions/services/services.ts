import { Dispatch } from "react";
import { GET_SERVICES_DATA, TServicesData, servicesDispatchTypes } from "./types";
import axios from "axios";
import { SERVER_URL } from "../../components/utils";

export const getServicesData = () => (dispatch: Dispatch<servicesDispatchTypes>) => {

    axios.get(SERVER_URL + '/getServices').then(res => {
        console.log(res.data)

        dispatch({
            type: GET_SERVICES_DATA,
            payload: res.data
        })
    })

}

// export const mockdata: TServicesData[] = new Array(10).fill('').map((e, i) => { return { id: i + 1, name: 'Boost Like ' + (i + 1), description: { text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc venenatis diam nisi, vel mattis mi rhoncus sed.' } } })

// export const mockdata: TServicesData[] = [
//     { id: 1, name: 'Boost Like', description: { text: 'hehe' } },
//     { id: 2, name: 'Boost Like 2', description: { text: 'hehehe' } },
//     { id: 3, name: 'Boost Like 3', description: { text: 'hehehehe' } },
//     { id: 4, name: 'Boost Like 4', description: { text: 'hehehehe hehe' } },
//     { id: 5, name: 'Boost Like 5', description: { text: 'hehehehe hehehe' } },
//     { id: 6, name: 'Boost Like 6', description: { text: 'hehehehe hehehehe' } },
//     { id: 7, name: 'Boost Like 7', description: { text: 'hehehehe hehehehe hehe' } },
//     { id: 8, name: 'Boost Like 8', description: { text: 'hehehehe hehehehe hehehe' } },
// ]