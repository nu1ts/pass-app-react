import { setProfile } from "../reducers/profileReducer"

export const fetchProfile = (profile) => async(dispatch) => {
    dispatch(setProfile(profile))
}