import { combineReducers } from "redux";
import servicesReducer from "./services/services";

const RootReducer = combineReducers({
    services: servicesReducer
});

export default RootReducer