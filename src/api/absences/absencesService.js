export const createAbsence = async(data) => {
   
    try {
        return await fetch(`https://absences-api.orexi4.ru/api/absences`,{
            method:'POST',
            headers: {
                
                'Authorization':'Bearer ' + localStorage.getItem('ACCESS_TOKEN')
            }, 
            body: data
        })
        
    } catch (error) {
        console.error(error);
    }
}

export const fetchUsersAbsences = async(queryParams) => {
    let token = localStorage.getItem('ACCESS_TOKEN');
    try {
        return await fetch(`https://absences-api.orexi4.ru/api/absences?${queryParams}`,{
            method:'GET',
            headers: {
                'Content-Type': 'application/json', 'accept':'application/json',
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
        return await fetch(`https://absences-api.orexi4.ru/api/absences/${data.id}`,{
            method:'PUT',
            headers: {
                'Content-Type': 'application/json', 'accept':'application/json',
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

    console.log(queryParams)
    try {
        return await fetch(`https://absences-api.orexi4.ru/api/absences/export?${queryParams}`,{
            method:'GET',
            headers: {
                'accept':'*/*',
                'Authorization':'Bearer ' + localStorage.getItem('ACCESS_TOKEN')
            }
        })
    } catch (error) {
        console.error(error);
    }
}

export const approveAbsence = async(id) => {
    try {
        return await fetch(`https://absences-api.orexi4.ru/api/absences/${id}/approve`,{
            method:'PATCH',
            headers: {
                'Content-Type': 'application/json', 'accept':'application/json',
                'Authorization':'Bearer ' + localStorage.getItem('ACCESS_TOKEN')
            }
        })
    } catch (error) {
        console.error(error)
    }
}

export const rejectAbsence = async(id, reason) => {

    try {
        return await fetch(`https://absences-api.orexi4.ru/api/absences/${id}/reject`,{
            method:'PATCH',
            headers: {
                'Content-Type': 'application/json', 'accept':'application/json',
                'Authorization':'Bearer ' + localStorage.getItem('ACCESS_TOKEN')
            },
            body: reason ? JSON.stringify({
                reason: reason
            }) : null
        })
    } catch (error) {
        console.error(error)
    }
}

export const extendAbsence = async(id) => {
    
    try {
        return await fetch(`https://absences-api.orexi4.ru/api/absences/${id}/extend`,{
            method:'PATCH',
            headers: {
                'Content-Type': 'application/json', 'accept':'application/json',
                'Authorization':'Bearer ' + localStorage.getItem('ACCESS_TOKEN')
            }
        })
    } catch (error) {
        console.error(error)
    }
}


export const fetchAbsenceById = async(id)=> {
    try {
        return await fetch(`https://absences-api.orexi4.ru/api/absences/${id}`,{
            method:'GET',
            headers: {
                'Content-Type': 'application/json', 'accept':'application/json',
                'Authorization':'Bearer ' + localStorage.getItem('ACCESS_TOKEN')
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
