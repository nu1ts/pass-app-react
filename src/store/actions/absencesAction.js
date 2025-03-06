import { ConstructionOutlined } from "@mui/icons-material";
import { fetchAbsencesJsonServer } from "../../api/absences/absencesService";
import { setAbsences, setHistory } from "../reducers/absencesReducer";

export const fetchAbsences = (query, type) => async(dispatch) => {
    console.log(`Type: ${type}\nQuery: ${query}`);
    switch (type) {
        case 'HISTORY':
            dispatch(setHistory(await fetchAbsencesJsonServer(query)));
            break;
        case 'ABSENCES':
            dispatch(setAbsences(await fetchAbsencesJsonServer(query)));
            break;
    }
    
}