import { createSlice } from "@reduxjs/toolkit";

const rolesSlice = createSlice({
    name: 'roles',
    initialState: {
        roles: []
    },
    reducers: {
        setRoles: (state, action) => {
            state.roles = action.payload;
        }
    }
})

export const {setRoles} = rolesSlice.actions;
export default rolesSlice.reducer;