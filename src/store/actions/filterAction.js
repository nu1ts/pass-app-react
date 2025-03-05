import { setAbsencesFilters, setAbsencesHistoryFilters, setUsersFilters } from "../reducers/filterReducer";

export const setUsersFilterParams = (params = {}) => async(dispatch)=> {
    dispatch(setUsersFilters(params));
}

export const setAbsencesFiltersParams = (params={}) => async(dispatch) => {
    dispatch(setAbsencesFilters(params));
}

export const setAbsencesHistoryFiltersParams = (params={}) => async(dispatch) => {
    dispatch(setAbsencesHistoryFilters(params));
}