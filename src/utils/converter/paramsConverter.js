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
        queryStr += `fullName=${params.fullName}&`;
    }
    if(params.role) {
        queryStr +=`role=${params.role}&`;
    }
    if(params.group) {
        queryStr +=`group=${params.group}&`;
    }
    return queryStr;
}

const getAbsencesParamQuery = (params) => {
    let queryStr = '';
    if(params.fullName) {
        queryStr += `fullName=${params.fullName}&`;
    }
    if(params.date) {
        queryStr +=`date=${params.date}&`;
    }
    if(params.group) {
        queryStr +=`group=${params.group}&`;
    }
    queryStr+='status=Pending'
    return queryStr;
}

const getHistoryParamQuery = (params) => {
    let queryStr = '';
    if(params.fullName) {
        queryStr += `fullName=${params.fullName}&`;
    }
    if(params.status && params.status !== 'all') {
        queryStr +=`status=${params.status}&`;
    } else {
        queryStr +=`status=Approved&status=Rejected`
    }  
    if(params.group) {
        queryStr +=`group=${params.group}&`;
    }
    return queryStr;
}