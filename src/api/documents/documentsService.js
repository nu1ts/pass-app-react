export const uploadDocuments = async(id) => {
    let token = localStorage.getItem('ACCESS_TOKEN');
    try {
        return await fetch(`api/absences/${id}/documents`,{
            method:'POST',
            headers: {
                'Authorization':'Bearer ' + token
            }
        })
    } catch (error) {
        console.error(error)
    }
}

export const fetchDocuments = async(id) => {
    let token = localStorage.getItem('ACCESS_TOKEN');
    try {
        return await fetch(`api/absences/${id}/documents`,{
            method:'GET',
            headers: {
                'Authorization':'Bearer ' + token
            }
        })
    } catch (error) {
        console.error(error)
    }
}