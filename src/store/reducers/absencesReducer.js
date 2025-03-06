import { createSlice } from "@reduxjs/toolkit";

const absencesSlice = createSlice({
    name:'absences',
    initialState:{
        absences: [],
        historyAbsences: []
    },
    reducers:{
        setAbsences: (state, action) => {
            state.absences = action.payload;
        },
        setHistory: (state, action) => {
            state.historyAbsences = action.payload;
        }
    }
})


export const {setAbsences, setHistory} = absencesSlice.actions;
export default absencesSlice.reducer;
