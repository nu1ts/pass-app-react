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