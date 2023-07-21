import { combineReducers } from "redux";
import servicesReducer from "./services/services";
import { categoriesReducer } from "./categories/categories";
import authReducer from "./auth/auth";
import feedbackReducer from "./feedback/feedback";
import adminReducer from "./admin/admin";

const RootReducer = combineReducers({
    admin: adminReducer,
    auth: authReducer,
    services: servicesReducer,
    categories: categoriesReducer,
    feedback: feedbackReducer
});

export default RootReducer