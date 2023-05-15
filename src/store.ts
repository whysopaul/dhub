import { applyMiddleware, legacy_createStore as createStore } from "redux";
import { persistReducer } from "redux-persist";
import { composeWithDevTools } from '@redux-devtools/extension';
import thunk from "redux-thunk";
import RootReducer from "./reducers/root-reducer";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";

export const config = {
    key: 'root',
    storage: storage,
    blacklist: [],
    stateReconciler: autoMergeLevel2
}

const middleware = [thunk];
const persisted = persistReducer<RootStore>(config, RootReducer)
export type RootStore = ReturnType<typeof RootReducer>

const store = createStore(
    persisted,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store