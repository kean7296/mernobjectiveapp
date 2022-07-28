const API_URL = '/api/users/'


const register = (user, thunkAPI) => {
    return fetch(API_URL + 'register', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
        localStorage.setItem('user', JSON.stringify(data))
    })
    .catch(err => {
        const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
        return thunkAPI.rejectWithValue(message)
    })
}

const login = (user, thunkAPI) => {
    return fetch(API_URL + 'login', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => { 
        localStorage.setItem('user', JSON.stringify(data))
    })
    .catch(err => {
        const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
        return thunkAPI.rejectWithValue(message)
    })
}

const logout = () => {
    localStorage.removeItem('user')
}

const authService = {
    register,
    login,
    logout,
}

export default authService
