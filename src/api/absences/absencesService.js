export const createAbsence = async(data) => {
    let token = localStorage.getItem('ACCESS_TOKEN');
    try {
        return await fetch(`api/absences`,{
            method:'POST',
            headers: {
                'Authorization':'Bearer ' + token
            }, 
            body: JSON.stringify({
                ...data
            })
        })
    } catch (error) {
        console.error(error);
    }
}

export const fetchAbsences = async(queryParams) => {
    let token = localStorage.getItem('ACCESS_TOKEN');
    try {
        return await fetch(`api/absences?${queryParams}`,{
            method:'GET',
            headers: {
                'Authorization':'Bearer ' + token
            }
        })
    } catch (error) {
        console.error(error);
    }
}

export const editAbsence = async(data) => {
    let token = localStorage.getItem('ACCESS_TOKEN');
    try {
        return await fetch(`api/absences/${data.id}`,{
            method:'PUT',
            headers: {
                'Authorization':'Bearer ' + token
            },
            body: JSON.stringify({
                ...data
            })
        })
    } catch (error) {
        console.error(error);
    }
}

export const exportAbsences = async(queryParams) => {
    let token = localStorage.getItem('ACCESS_TOKEN');
    try {
        return await fetch(`api/absences/export?${queryParams}`,{
            method:'GET',
            headers: {
                'Authorization':'Bearer ' + token
            }
        })
    } catch (error) {
        console.error(error);
    }
}

export const approveAbsence = async(id) => {
    let token = localStorage.getItem('ACCESS_TOKEN');
    try {
        return await fetch(`api/absences/${id}/approve`,{
            method:'PATCH',
            headers: {
                'Authorization':'Bearer ' + token
            }
        })
    } catch (error) {
        console.error(error)
    }
}

export const rejectAbsence = async(id) => {
    let token = localStorage.getItem('ACCESS_TOKEN');
    try {
        return await fetch(`api/absences/${id}/reject`,{
            method:'PATCH',
            headers: {
                'Authorization':'Bearer ' + token
            }
        })
    } catch (error) {
        console.error(error)
    }
}

export const extendAbsence = async(id) => {
    let token = localStorage.getItem('ACCESS_TOKEN');
    try {
        return await fetch(`api/absences/${id}/extend`,{
            method:'PATCH',
            headers: {
                'Authorization':'Bearer ' + token
            }
        })
    } catch (error) {
        console.error(error)
    }
}


export const fetchAbsencesJsonServer = async(queryParams) => {
    try {
        const response = await fetch(`http://localhost:3000/absences?`+ queryParams,{
            method: 'GET'
        });
        return response.json();
    } catch (error) {
        console.error(error);
    }
}
