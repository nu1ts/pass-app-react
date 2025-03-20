import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
    name:'users', 
    initialState: {
        users: [],
        isLoading: false,
        error: false
    },
    reducers: {
        setLoadUsers:(state) => {
            state.isLoading = true;
        },
        setUsers:(state, action)=> {
            state.users = action.payload;
            state.isLoading = false;
            state.error = false;
        },
        setError:(state) => {
            state.error = true
        }
    }
})


export const {setUsers, setLoadUsers, setError} = usersSlice.actions;
export default usersSlice.reducer;