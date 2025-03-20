export const loginUser = async(data) => {
    try {
        const response = await fetch(`https://absences-api.orexi4.ru/api/account/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'accept':'application/json' },
            body: JSON.stringify({ ...data }),
            
        })
        return response
    } catch (error) {
        console.error('Login failed with: ' + error)
    }
}

export const fetchUserProfile = async() => {
    console.log(localStorage.getItem('ACCESS_TOKEN'))
    try {
        const response = await fetch(`https://absences-api.orexi4.ru/api/account/profile`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json', 'accept':'application/json',
                'Authorization':'Bearer ' + localStorage.getItem('ACCESS_TOKEN')
            }
        })
        return response;
    } catch (error) {
        console.error('Fetch profile failed with: ' + error)
    }
}

export const logoutUser = async(token) => {
    try {
        const response = await fetch(`/api/account/logout`, {
            method: 'POST',
            'Authorization': 'Bearer ' + token
        })
        return response
    } catch (error) {
        console.error('Logout failed with: ' + error)
    }
}

export const loginUserJsonServer = async() => {
    try {
        const response = await fetch(`http://localhost:3000/users`,{
            method: 'GET'
        });
        return response.json();
    } catch (error) {
        console.error(error)
    }
}