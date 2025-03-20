import { createSlice } from "@reduxjs/toolkit";

const absencesSlice = createSlice({
    name:'absences',
    initialState:{
        absences: [],
        historyAbsences: [],
        pagination: {
            count: 0,
            size: 10,
            current: 1
        },
        isLoading:false
    },
    reducers:{
        setAbsences: (state, action) => {
            state.absences = action.payload;
            state.isLoading = false
        },
        setHistory: (state, action) => {
            state.historyAbsences = action.payload;
            state.isLoading = false
        },
        setPagination: (state, action) => {
            state.pagination = {...action.payload};
        },
        setLoadAbsences:(state) => {
            state.isLoading = true;
        },
    }
})


export const {setAbsences, setHistory, setPagination, setCurrentPage, setLoadAbsences} = absencesSlice.actions;
export default absencesSlice.reducer;
