import { configureStore } from "@reduxjs/toolkit"
import absencesReducer from "./reducers/absencesReducer"
import authReducer from "./reducers/authReducer"
import filterReducer from "./reducers/filterReducer"
import profileReducer from "./reducers/profileReducer"
import rolesReducer from "./reducers/rolesReducer"
import userReducer from "./reducers/userReducer"

export const appStore = configureStore({
    reducer: {
        filters: filterReducer,
        users: userReducer,
        profile: profileReducer,
        absences: absencesReducer,
        auth: authReducer,
        roles: rolesReducer
    }
})