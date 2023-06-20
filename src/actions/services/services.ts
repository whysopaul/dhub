import { Dispatch } from "react";
import { GET_ALL_SERVICES, GET_ALL_SERVICES_LOCATIONS, GET_ALL_SERVICES_PLATFORMS, GET_SERVICE, SERVICES_LOADING, SERVICE_DATA_UPDATE, TServiceLocation, TServicePlatform, TServicesData, servicesDispatchTypes } from "./types";
import axios from "axios";
import { SERVER_URL } from "../../components/utils";
import { GET_ALL_CATEGORIES, TCategory, categoriesDispatchTypes } from "../categories/types";

export const getServicesData = () => (dispatch: Dispatch<servicesDispatchTypes | categoriesDispatchTypes>) => {

    dispatch({
        type: SERVICES_LOADING,
        payload: true
    })

    axios.get(SERVER_URL + '/getServices').then(res => {
        // console.log(res.data)

        let services: TServicesData[] = res.data.services
        const categories: TCategory[] = res.data.categories
        const locations: TServiceLocation[] = res.data.locations
        const platforms: TServicePlatform[] = res.data.platforms

        let s_c_2 = {}
        let s_c_3 = {}
        let s_l = {}
        let s_p = {}

        categories.map(c => {
            c.connections.map(cat => {
                if (c.index === 2) {
                    s_c_2[cat.service] = s_c_2[cat.service] ? [...s_c_2[cat.service], { ...c, connections: [] }] : [{ ...c, connections: [] }]
                }
                if (c.index === 3) {
                    s_c_3[cat.service] = s_c_3[cat.service] ? [...s_c_3[cat.service], { ...c, connections: [] }] : [{ ...c, connections: [] }]
                }
            })
        })

        locations.map(l => {
            l.connections.map(loc => {
                s_l[loc.service] = s_l[loc.service] ? [...s_l[loc.service], { ...l, connections: [] }] : [{ ...l, connections: [] }]
            })
        })

        platforms.map(p => {
            p.connections.map(pl => {
                s_p[pl.service] = s_p[pl.service] ? [...s_p[pl.service], { ...p, connections: [] }] : [{ ...p, connections: [] }]
            })
        })

        services = services.map(s => {
            return {
                ...s,
                categories_2: s_c_2[s.id],
                categories_3: s_c_3[s.id],
                description: {
                    ...s.description,
                    locations: s_l[s.id],
                    platforms: s_p[s.id]
                }
            }
        })

        s_c_2 = {}
        s_c_3 = {}
        s_l = {}
        s_p = {}

        dispatch({
            type: SERVICES_LOADING,
            payload: false
        })

        dispatch({
            type: GET_ALL_SERVICES,
            payload: services
        })

        dispatch({
            type: GET_ALL_CATEGORIES,
            payload: categories.map(c => {
                return {
                    ...c,
                    connections: []
                }
            })
        })

        dispatch({
            type: GET_ALL_SERVICES_LOCATIONS,
            payload: locations.map(l => {
                return {
                    ...l,
                    connections: []
                }
            })
        })

        dispatch({
            type: GET_ALL_SERVICES_PLATFORMS,
            payload: platforms.map(p => {
                return {
                    ...p,
                    connections: []
                }
            })
        })
    }).catch(error => {
        console.log(error)

        dispatch({
            type: SERVICES_LOADING,
            payload: false
        })
    })

}

export const getAllServicesLocations = () => (dispatch: Dispatch<servicesDispatchTypes>) => {
    axios.get(SERVER_URL + '/getLocations').then(res => {
        // console.log(res.data)

        dispatch({
            type: GET_ALL_SERVICES_LOCATIONS,
            payload: res.data
        })
    }).catch(error => {
        console.log(error)
    })
}

export const getAllServicesPlatforms = () => (dispatch: Dispatch<servicesDispatchTypes>) => {
    axios.get(SERVER_URL + '/getPlatforms').then(res => {
        // console.log(res.data)

        dispatch({
            type: GET_ALL_SERVICES_PLATFORMS,
            payload: res.data
        })
    }).catch(error => {
        console.log(error)
    })
}

export const getService = (service_id: number) => (dispatch: Dispatch<servicesDispatchTypes>) => {
    axios.get(SERVER_URL + '/getService', { params: { id: service_id } }).then(res => {
        // console.log(res.data)

        dispatch({
            type: GET_SERVICE,
            payload: res.data
        })
    }).catch(error => {
        console.log(error)
    })
}

export const serviceDataUpdate = (serviceData: TServicesData) => (dispatch: Dispatch<servicesDispatchTypes>) => {
    axios.post(SERVER_URL + '/updateService', JSON.stringify({ service: serviceData })).then(res => {
        console.log(res.data)

        dispatch({
            type: SERVICE_DATA_UPDATE,
            payload: res.data
        })
    }).catch(error => {
        console.log(error)
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