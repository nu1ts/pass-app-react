import { configureStore } from "@reduxjs/toolkit"
import filterReducer from "./reducers/filterReducer"
import userReducer from "./reducers/userReducer"

export const appStore = configureStore({
    reducer: {
        filters: filterReducer,
        users: userReducer
    }
})