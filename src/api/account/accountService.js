export const loginUser = async(data) => {
    try {
        const response = await fetch(`/api/account/login`, {
            method: 'POST',
            body: JSON.stringify[{
                ...data
            }]
        })
        return response
    } catch (error) {
        console.error('Login failed with: ' + error)
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