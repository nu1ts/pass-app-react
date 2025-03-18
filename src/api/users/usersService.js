export const fetchUsers = async(queryParams) => {
    try {
        const response = await fetch(`api/users?` + queryParams, {
            method: 'GET',
        })
        return response;
    } catch (error) {
        console.error(error);
    }
}

export const fetchUserById = async(id) => {
    let token = localStorage.getItem('ACCESS_TOKEN');
    try {
        return await fetch(`api/users/${id}`,{
            method:'GET',
            headers: {
                'Authorization':'Bearer ' + token
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