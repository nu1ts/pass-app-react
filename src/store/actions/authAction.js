import { clearToken, setToken } from "../reducers/authReducer";
import { setRoles } from "../reducers/rolesReducer";
import { setUserRoles } from "./rolesAction";

export const setAuth = (token) => async(dispatch) => {
    await dispatch(setToken(token));
    await setUserRoles();
}

export const clearSession = () => async(dispatch) => {
    dispatch(clearToken());
    dispatch(setRoles([]))
}