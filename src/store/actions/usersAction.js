import { fetchAllUsers, fetchUsersJsonServer } from "../../api/users/usersService"
import { setError, setLoadUsers, setUsers } from "../reducers/userReducer";

export const fetchUsers = (query) => async(dispatch) => {
    dispatch(setLoadUsers())
    const response = await fetchAllUsers(query);
    if(response && response.ok) {
        dispatch(setUsers(await response.json()));
    } else {
        dispatch(setUsers([]));
        dispatch(setError())
    }
    
}