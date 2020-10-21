import { createStore, combineReducers, applyMiddleware  } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from "redux-logger";
import hardSet from "redux-persist/es/stateReconciler/hardSet";

import { addDoctorReducer } from './reducers';

const rootReducers = combineReducers({
    addDoctor: addDoctorReducer
});
const persistConfig = {
    key: 'root',
    storage,
    keyPrefix: '',
    stateReconciler: hardSet
};

const pReducer = persistReducer(persistConfig, rootReducers)
export const store = createStore(
    pReducer,
    undefined,
    applyMiddleware(logger)
)

export const persistor = persistStore(store)
// export default () => {
//     let store = createStore(pReducer)
//     let persistor = persistStore(store)
//     return { store, persistor }
//   }