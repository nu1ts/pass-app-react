export const isTeacher = (roles) => {
    return roles.find(role => role === 'Teacher');
}

export const isDean = (roles) => {
    return roles.find(role => role === 'DeanOffice');
}

