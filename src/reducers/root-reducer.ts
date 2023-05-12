import { combineReducers } from "redux";
import servicesReducer from "./services/services";
import { categoriesReducer } from "./categories/categories";

const RootReducer = combineReducers({
    services: servicesReducer,
    categories: categoriesReducer
});

export default RootReducer