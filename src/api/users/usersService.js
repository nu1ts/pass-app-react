export const fetchAllUsers = async(queryParams) => {
    try {
        const response = await fetch(`https://absences-api.orexi4.ru/api/users?` + queryParams, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json', 'accept':'application/json',
                'Authorization':'Bearer ' + localStorage.getItem('ACCESS_TOKEN')
            }
        })
        return response;
    } catch (error) {
        console.error(error);
    }
}

export const fetchUserById = async(id) => {
    try {
        return await fetch(`https://absences-api.orexi4.ru/api/users/${id}`,{
            method:'GET',
            headers: {
                'Content-Type': 'application/json', 'accept':'application/json',
                'Authorization':'Bearer ' + localStorage.getItem('ACCESS_TOKEN')
            }
        })
    } catch (error) {
        console.error(error);
    }
}

export const deleteUserById = async(id)=> {
    let token = localStorage.getItem('ACCESS_TOKEN');
    try {
        return await fetch(`api/users/${id}`,{
            method:'DELETE',
            headers: {
                'Authorization':'Bearer ' + token
            }
        })
    } catch (error) {
        console.error(error);
    }
}

export const updateUsersProfile = async(id)=> {
    let token = localStorage.getItem('ACCESS_TOKEN');
    try {
        return await fetch(`api/users/${id}`,{
            method:'PUT',
            headers: {
                'Authorization':'Bearer ' + token
            }
        })
    } catch (error) {
        console.error(error);
    }
}

export const changeUsersRole = async(id)=> {
    let token = localStorage.getItem('ACCESS_TOKEN');
    try {
        return await fetch(`api/users/${id}/role`,{
            method:'PATCH',
            headers: {
                'Authorization':'Bearer ' + token
            }
        })
    } catch (error) {
        console.error(error);
    }
}



export const fetchConcreteUserJsonServer = async(id) => {
    try {
        const response = await fetch(`http://localhost:3000/users?id=${id}`, {
            method: 'GET',
        })
        return response.json();
    } catch (error) {
        console.error(error);
    }
}

export const fetchUsersJsonServer = async(queryParams) => {
    try {
        const response = await fetch(`http://localhost:3000/users?` + queryParams, {
            method: 'GET',
        })
        return response.json();
    } catch (error) {
        console.error(error);
    }
}