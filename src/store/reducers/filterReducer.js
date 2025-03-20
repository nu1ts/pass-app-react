import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
    name:'filters',
    initialState: {
        usersFilters: {
            fullName: '',
            role: 'student',
            group: '',
            size: 10,
            page: 1
        },
        absencesFilters: {
            fullName:'',
            sorting: 'CreateAsc',
            status: 'Pending',
            type: '',
            group: '',
            onlyMy: false,
            size: 10,
            page: 1
        },
        absencesHistoryFilters: {
            fullName:'',
            status: 'Approved',
            sorting: 'CreateAsc',
            type: '',
            group: '',
            onlyMy: false,
            size: 10,
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
        },
    }
})

export const {setUsersFilters, setAbsencesFilters, setAbsencesHistoryFilters} = filterSlice.actions;
export default filterSlice.reducer;