import { combineReducers } from "redux";
import servicesReducer from "./services/services";
import { categoriesReducer } from "./categories/categories";
import authReducer from "./auth/auth";

const RootReducer = combineReducers({
    auth: authReducer,
    services: servicesReducer,
    categories: categoriesReducer
});

export default RootReducer