import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: localStorage.getItem('ACCESS_TOKEN'),
        isAuth: Boolean(localStorage.getItem('ACCESS_TOKEN'))
    },
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload,
            state.isAuth = true,
            localStorage.setItem('ACCESS_TOKEN', action.payload);
        },
        clearToken: (state) => {
            state.token = null,
            state.isAuth = true,
            localStorage.removeItem('ACCESS_TOKEN');
        }
    }
})

export const {setToken, clearToken} = authSlice.actions;
export default authSlice.reducer;