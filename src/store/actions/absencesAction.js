import { ConstructionOutlined } from "@mui/icons-material";
import { current } from "@reduxjs/toolkit";
import { fetchAbsencesJsonServer, fetchUsersAbsences } from "../../api/absences/absencesService";
import { setAbsences, setHistory, setPagination } from "../reducers/absencesReducer";

export const fetchAbsences = (query, type) => async(dispatch) => {
    console.log(`Type: ${type}\nQuery: ${query}`);
    switch (type) {
        case 'HISTORY':
            console.log()
            dispatch(setHistory(await fetchAbsencesJsonServer(query)));
            break;
        case 'ABSENCES':
            const response = await fetchUsersAbsences(query);
            if(response.ok) {
                    const absences = await response.json();
                    dispatch(setAbsences(absences.absences))
                    dispatch(setPagination(
                        {count:absences.count, size:absences.size, current:absences.current}))
                   
                } else {
                    if(response.status === 401) {
                        dispatch(setAbsences([]));
                        return WarningToast(ERROR_401);
                    }
                    if(response.status >= 500) {
                        return ErrorToast(SERVER_ERROR)
                    }
                }
            break;
    }
    
}