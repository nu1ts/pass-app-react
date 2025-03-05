import { fetchUsersJsonServer } from "../../api/users/usersService"
import { setUsers } from "../reducers/userReducer";

export const fetchUsers = (query) => async(dispatch) => {
    const users = await fetchUsersJsonServer(query);
    dispatch(setUsers(users));
}