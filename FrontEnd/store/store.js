import { configureStore } from "@reduxjs/toolkit";
import authSlice from "@/features/auth/authSlice";
import { persistReducer, persistStore } from 'redux-persist';
import autoMergeLevel2 from "reduxjs-toolkit-persist/lib/stateReconciler/autoMergeLevel2";
import {combineReducers} from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: autoMergeLevel2
}

const reducer = combineReducers({
    auth: authSlice.reducer
})

const persistedReducer = persistReducer(persistConfig, reducer)

const store = configureStore({
    reducer: persistedReducer
})

export const persistor = persistStore(store)

export default store

