import { ConstructionOutlined } from "@mui/icons-material";
import { fetchAbsencesJsonServer, fetchUsersAbsences } from "../../api/absences/absencesService";
import { setAbsences, setHistory } from "../reducers/absencesReducer";

export const fetchAbsences = (query, type) => async(dispatch) => {
    console.log(`Type: ${type}\nQuery: ${query}`);
    switch (type) {
        case 'HISTORY':
            console.log()
            dispatch(setHistory(await fetchAbsencesJsonServer(query)));
            break;
        case 'ABSENCES':
            const response = await fetchUsersAbsences(query);
            if(response) {
                if(response.ok) {
                    const absences = await response.json();
                    dispatch(setAbsences(absences.absences))
                }
            }
            console.log(await response.json())
            dispatch(setAbsences(await fetchAbsencesJsonServer(query)));
            break;
    }
    
}