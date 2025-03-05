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