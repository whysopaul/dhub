import { Dispatch } from "react";
import { CREATE_DISCOUNT, CREATE_LOCATION, CREATE_PLATFORM, CREATE_SCREENSHOT, CREATE_SCREENSHOT_WITH_FILE, CREATE_SERVICE, DELETE_DISCOUNT, DELETE_LOCATION, DELETE_PLATFORM, DELETE_SCREENSHOT, DELETE_SERVICE, GET_ALL_SERVICES, GET_ALL_SERVICES_DISCOUNTS, GET_ALL_SERVICES_LOCATIONS, GET_ALL_SERVICES_PLATFORMS, GET_SERVICE, SERVICES_LOADING, SERVICE_DATA_UPDATE, SERVICE_UPDATE_DISCOUNT, SERVICE_UPDATE_LINK, TDiscount, TServiceLocation, TServicePlatform, TServicesData, servicesDispatchTypes } from "./types";
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

export const getAllServicesDiscounts = () => (dispatch: Dispatch<servicesDispatchTypes>) => {
    axios.get(SERVER_URL + '/getDiscounts').then(res => {
        // console.log(res.data)

        dispatch({
            type: GET_ALL_SERVICES_DISCOUNTS,
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
        // console.log(res.data)

        dispatch({
            type: SERVICE_DATA_UPDATE,
            payload: res.data
        })

        window.location.reload()
    }).catch(error => {
        console.log(error)
    })
}

export const serviceUpdateLink = (link: string, service_id: number) => (dispatch: Dispatch<servicesDispatchTypes>) => {
    axios.post(SERVER_URL + '/updateLink', JSON.stringify({ link, service_id })).then(res => {
        // console.log(res.data)

        dispatch({
            type: SERVICE_UPDATE_LINK,
            payload: res.data
        })
    }).catch(error => {
        console.log(error)
    })
}

export const serviceUpdateDiscount = (d_token: string, discount: TDiscount) => (dispatch: Dispatch<servicesDispatchTypes>) => {
    axios.post(SERVER_URL + '/updateDiscount', JSON.stringify({ d_token, discount })).then(res => {
        // console.log(res.data)

        dispatch({
            type: SERVICE_UPDATE_DISCOUNT,
            payload: res.data
        })
    }).catch(error => {
        console.log(error)
    })
}

export const serviceToggleHiddenStatus = (d_token: string, service_id: number, is_hidden: boolean) => (dispatch: Dispatch<servicesDispatchTypes>) => {
    axios.post(SERVER_URL + '/toggleServiceHiddenStatus', JSON.stringify({ d_token, service_id, is_hidden })).then(res => {
        window.location.reload()
    }).catch(error => {
        console.log(error)
    })
}

// export const createService = (serviceData: TServicesData) => (dispatch: Dispatch<servicesDispatchTypes>) => {
//     axios.post(SERVER_URL + '/createService', JSON.stringify({ ...serviceData })).then(res => {
//         console.log(res.data)

//         // {
//         //     "id": 3838,
//         //     "name": "Не указано",
//         //     "description": {
//         //         "text": "Не указано",
//         //         "isFree": false,
//         //         "hasTrial": false,
//         //         "paymentMethod": "Не указано",
//         //         "price": "Не указано",
//         //         "locations": [],
//         //         "platforms": [],
//         //         "hasPartnership": false
//         //     },
//         //     "rating": 0,
//         //     "categories_3": [],
//         //     "categories_2": [],
//         //     "images": {
//         //         "logo": "",
//         //         "screenshots": []
//         //     },
//         //     "feedbacks": []
//         // }

//         dispatch({
//             type: CREATE_SERVICE,
//             payload: res.data
//         })
//     }).catch(error => {
//         console.log(error)
//     })
// }

export const createLocation = (name: string) => (dispatch: Dispatch<servicesDispatchTypes>) => {
    axios.post(SERVER_URL + '/createLocation', JSON.stringify({ name })).then(res => {
        // console.log(res.data)

        dispatch({
            type: CREATE_LOCATION,
            payload: res.data
        })
    }).catch(error => {
        console.log(error)
    })
}

export const createPlatform = (name: string) => (dispatch: Dispatch<servicesDispatchTypes>) => {
    axios.post(SERVER_URL + '/createPlatform', JSON.stringify({ name })).then(res => {
        // console.log(res.data)

        dispatch({
            type: CREATE_PLATFORM,
            payload: res.data
        })
    }).catch(error => {
        console.log(error)
    })
}

export const createScreenshot = (name: string, source: string, service_id: number) => (dispatch: Dispatch<servicesDispatchTypes>) => {
    axios.post(SERVER_URL + '/createScreenshot', JSON.stringify({ name, source, service_id })).then(res => {
        // console.log(res.data)

        dispatch({
            type: CREATE_SCREENSHOT,
            payload: res.data
        })
    }).catch(error => {
        console.log(error)
    })
}

export const createScreenshotWithFile = (files: File[], service_id: number) => (dispatch: Dispatch<servicesDispatchTypes>) => {
    let formData = new FormData

    files.map(f => {
        formData.append(f.name, f)
    })

    const body = JSON.stringify({ service_id })
    formData.append('body', body)

    axios.post(SERVER_URL + '/createScreenshotWithFile', formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then(res => {
        // console.log(res.data)

        dispatch({
            type: CREATE_SCREENSHOT_WITH_FILE,
            payload: res.data
        })
    }).catch(error => {
        console.log(error)
    })
}

export const createDiscount = (d_token: string, discount: TDiscount) => (dispatch: Dispatch<servicesDispatchTypes>) => {
    axios.post(SERVER_URL + '/createDiscount', JSON.stringify({ d_token, discount })).then(res => {
        // console.log(res.data)

        dispatch({
            type: CREATE_DISCOUNT,
            payload: res.data
        })
    }).catch(error => {
        console.log(error)
    })
}

export const deleteService = (id: number, d_token: string) => (dispatch: Dispatch<servicesDispatchTypes>) => {
    axios.delete(SERVER_URL + '/deleteService', { params: { id, d_token } }).then(res => {
        // console.log(res.data)

        dispatch({
            type: DELETE_SERVICE,
            payload: res.data
        })

        window.location.pathname.includes('admin') ? window.location.reload() : window.location.replace('/')
    }).catch(error => {
        console.log(error)
    })
}

export const deleteLocation = (id: number, d_token: string) => (dispatch: Dispatch<servicesDispatchTypes>) => {
    axios.delete(SERVER_URL + '/deleteLocation', { params: { id, d_token } }).then(res => {
        // console.log(res.data)

        dispatch({
            type: DELETE_LOCATION,
            payload: res.data
        })
    }).catch(error => {
        console.log(error)
    })
}

export const deletePlatform = (id: number, d_token: string) => (dispatch: Dispatch<servicesDispatchTypes>) => {
    axios.delete(SERVER_URL + '/deletePlatform', { params: { id, d_token } }).then(res => {
        // console.log(res.data)

        dispatch({
            type: DELETE_PLATFORM,
            payload: res.data
        })
    }).catch(error => {
        console.log(error)
    })
}

export const deleteScreenshot = (id: number, d_token: string) => (dispatch: Dispatch<servicesDispatchTypes>) => {
    axios.delete(SERVER_URL + '/deleteScreenshot', { params: { id, d_token } }).then(res => {
        // console.log(res.data)

        dispatch({
            type: DELETE_SCREENSHOT,
            payload: res.data
        })
    }).catch(error => {
        console.log(error)
    })
}

export const deleteDiscount = (id: number, d_token: string) => (dispatch: Dispatch<servicesDispatchTypes>) => {
    axios.delete(SERVER_URL + '/deleteDiscount', { params: { id, d_token } }).then(res => {
        // console.log(res.data)

        dispatch({
            type: DELETE_DISCOUNT,
            payload: res.data
        })
    }).catch(error => {
        console.log(error)
    })
}