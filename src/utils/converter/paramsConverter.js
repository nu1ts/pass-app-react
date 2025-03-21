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
    if(params.page) {
        queryStr +=`page=${params.page}&`;
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
        queryStr +=`Status=${params.status}&`;
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
    if(params.page) {
        queryStr +=`page=${params.page}&`;
    }
    if(params.onlyMy) {
        queryStr +=`onlyMy=${params.onlyMy}&`;
    }
    return queryStr;
}

export const getExportQuery= async(params)=> {
    console.log(params);
    let queryStr = '';
    if(params.Status) {
        queryStr +=`Status=${params.Status}&`;
    } 
    if(params.GroupId) {
        queryStr +=`Group=${params.GroupId}&`;
    }
    if(params.Type) {
        queryStr +=`Type=${params.Type}&`;
    }
    if(params.StartDate) {
        queryStr +=`StartDate=${params.StartDate +'T03:57:33.951Z'}&`;
    }
    if(params.EndDate) {
        queryStr +=`EndDate=${params.EndDate + 'T03:57:33.951Z'}&`;
    }
    if(params.studentIds) {
        for(let i=0;i<params.studentIds.length;i++) {
            queryStr+=`studentIds=${params.studentIds[i].id}&`;
        }
    } 
    return queryStr;
}