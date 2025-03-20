import { useNavigate } from "react-router-dom";
import { fetchAllUsers, fetchUsersJsonServer } from "../../api/users/usersService"
import { ERROR_401, SERVER_ERROR } from "../../utils/constants/errorCode";
import { ErrorToast, WarningToast } from "../../utils/notifications/notifications";
import { setError, setLoadUsers, setUsers } from "../reducers/userReducer";

export const fetchUsers = (query) => async(dispatch) => {
    dispatch(setLoadUsers())
    const response = await fetchAllUsers(query);
    if(response.ok) {
        dispatch(setUsers(await response.json()));
    } else {
        if(response.status === 401) {
            dispatch(setUsers([]));
            return WarningToast(ERROR_401);
        }
        if(response.status >= 500) {
            return ErrorToast(SERVER_ERROR)
        }
    } 
}