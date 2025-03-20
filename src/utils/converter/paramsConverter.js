export const getStringQuery = (params, type) => {
    switch (type) {
        case 'USERS':
            return getUsersParamQuery(params);
        case 'ABSENCES':
            return getAbsencesParamQuery(params);
        case 'HISTORY':
            return getHistoryParamQuery(params);
    }
}

const getUsersParamQuery = (params) => {
    let queryStr = '';
    if(params.fullName) {
        queryStr += `name=${params.fullName}&`;
    }
    if(params.group) {
        queryStr +=`group=${params.group}&`;
    }
    if(params.role) {
        queryStr +=`role=${params.role}&`;
    }
    return queryStr;
}

const getAbsencesParamQuery = (params) => {
    let queryStr = '';
    if(params.fullName) {
        queryStr += `StudentName=${params.fullName}&`;
    }
    if(params.type) {
        queryStr +=`Type=${params.type}&`;
    }
    if(params.group) {
        queryStr +=`Group=${params.group}&`;
    }
    if(params.sorting) {
        queryStr +=`sorting=${params.sorting}&`;
    }
    if(params.onlyMy) {
        queryStr +=`onlyMy=${params.onlyMy}&`;
    }
    queryStr+='status=Pending'
    return queryStr;
}

const getHistoryParamQuery = (params) => {
    let queryStr = '';
    if(params.fullName) {
        queryStr += `StudentName=${params.fullName}&`;
    }
    if(params.status && params.status !== 'all') {
        queryStr +=`status=${params.status}&`;
    } else {
        queryStr +=`status=Approved&status=Rejected&`
    }  
    if(params.group) {
        queryStr +=`Group=${params.group}&`;
    }
    if(params.sorting) {
        queryStr +=`sorting=${params.sorting}&`;
    }
    if(params.type) {
        queryStr +=`Type=${params.type}&`;
    }
    return queryStr;
}