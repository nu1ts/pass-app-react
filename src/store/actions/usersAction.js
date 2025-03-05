import { fetchUsersJsonServer } from "../../api/users/usersService"
import { setUsers } from "../reducers/userReducer";

export const fetchUsers = (query) => async(dispatch) => {
    const users = await fetchUsersJsonServer(query);
    console.log(query);
    console.log(users)
    dispatch(setUsers(users));
}