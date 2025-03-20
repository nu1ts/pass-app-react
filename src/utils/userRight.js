import { jwtDecode } from "jwt-decode";

export const isTeacher = (roles) => {
    return roles.find(role => role === 'Teacher');
}

export const isDean = (roles) => {
    return roles.find(role => role === 'DeanOffice');
}

export const getHighestRole = (roles) => {
    console.log(roles)
    if(roles.includes('DeanOffice')) {
        return 'Декан'
    }
    if(roles.includes('Teacher')) {
        return 'Преподаватель'
    } else {
        return 'Студент'
    }
}


export const getRoles = (token) => {
    let roleKey = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';
    let decodedToken = jwtDecode(localStorage.getItem('ACCESS_TOKEN'), { payload: true });
    return decodedToken[roleKey];
}