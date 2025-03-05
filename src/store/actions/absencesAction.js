import { fetchAbsencesJsonServer } from "../../api/absences/absencesService";
import { setAbsences, setHistory } from "../reducers/absencesReducer";

export const fetchAbsences = (query, type) => async(dispatch) => {
    console.log(query)
    switch(type){
        case "ABSENCES":
            dispatch(setAbsences(await fetchAbsencesJsonServer(query)))
            return;
        case "HISTORY":
            dispatch(setHistory(await fetchAbsencesJsonServer(query)))
            return;
        default: return;
    }
}