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
        }
    },
    reducers:{
        setAbsences: (state, action) => {
            state.absences = action.payload;
        },
        setHistory: (state, action) => {
            state.historyAbsences = action.payload;
        },
        setPagination: (state, action) => {
            state.pagination = {...action.payload};
        },
    }
})


export const {setAbsences, setHistory, setPagination, setCurrentPage} = absencesSlice.actions;
export default absencesSlice.reducer;
