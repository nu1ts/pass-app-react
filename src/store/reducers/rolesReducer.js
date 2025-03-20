import { createSlice } from "@reduxjs/toolkit";

const rolesSlice = createSlice({
    name: 'roles',
    initialState: {
        roles: Boolean(localStorage.getItem('ROLES'))?JSON.parse(localStorage.getItem('ROLES')):[]
    },
    reducers: {
        setRoles: (state, action) => {
            state.roles = action.payload;
            localStorage.setItem('ROLES', JSON.stringify(action.payload))
        }, 
        clearRoles: (state) => {
            state.roles = [];
            localStorage.removeItem('ROLES');
        }
    }
})

export const {setRoles} = rolesSlice.actions;
export default rolesSlice.reducer;