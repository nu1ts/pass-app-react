import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
    name: "profile",
    initialState: {
        profile: {
            fullName: '',
            email: '',
            role:'',
        }
    },
    reducers: {
        setProfile:(state, action) => {
            state.profile = {...action.payload}
        }
    }
})

export const {setProfile} = profileSlice.actions;
export default profileSlice.reducer;