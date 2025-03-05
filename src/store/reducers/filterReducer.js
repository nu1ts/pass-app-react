import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
    name:'filters',
    initialState: {
        usersFilters: {
            fullName: '',
            role: 'student',
            group: '',
            size: 5,
            page: 1
        },
        absencesFilters: {
            fullName:'',
            date: '',
            group: '',
            size: 5,
            page: 1
        },
        absencesHistoryFilters: {
            fullName:'',
            status: 'all',
            group: '',
            size: 5,
            page: 1
        }
    }, 
    reducers: {
        setUsersFilters: (state, action)=> {
            state.usersFilters = action.payload
        },
        setAbsencesFilters: (state, action) => {
            state.absencesFilters = action.payload
        },
        setAbsencesHistoryFilters: (state, action) => {
            state.absencesHistoryFilters = action.payload
        }
    }
})

export const {setUsersFilters, setAbsencesFilters, setAbsencesHistoryFilters} = filterSlice.actions;
export default filterSlice.reducer;