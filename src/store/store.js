import { configureStore } from "@reduxjs/toolkit"
import filterReducer from "./reducers/filterReducer"
import profileReducer from "./reducers/profileReducer"
import userReducer from "./reducers/userReducer"

export const appStore = configureStore({
    reducer: {
        filters: filterReducer,
        users: userReducer,
        profile: profileReducer
    }
})