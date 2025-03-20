import { ConstructionOutlined } from "@mui/icons-material";
import { current } from "@reduxjs/toolkit";
import { fetchAbsencesJsonServer, fetchUsersAbsences } from "../../api/absences/absencesService";
import { setAbsences, setHistory, setLoadAbsences, setPagination } from "../reducers/absencesReducer";

export const fetchAbsences = (query, type) => async(dispatch) => {
    console.log(`Type: ${type}\nQuery: ${query}`);
    dispatch(setLoadAbsences(true))
    let response = null;
    switch (type) {
        case 'HISTORY':
            console.log()
            response = await fetchUsersAbsences(query);
            if(response.ok) {
                    const absences = await response.json();
                    dispatch(setHistory(absences.absences))
                    console.log(absences.absences)
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
        case 'ABSENCES':
            response = await fetchUsersAbsences(query);
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