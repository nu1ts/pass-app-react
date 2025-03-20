import { fetchUserProfile } from "../../api/account/accountService"
import { setRoles } from "../reducers/rolesReducer";

export const setUserRoles = () => async(dispatch)=> {
    let response = await fetchUserProfile();
    if(response.ok) {
        const profile = await response.json()
        dispatch(setRoles(profile.roles));
    } else {
        dispatch(setRoles([]));
    }
}