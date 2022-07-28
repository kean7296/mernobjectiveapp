const API_URL = '/api/objectives/'


const create = (objectiveData, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token
    
    const config = {
        method: 'post',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(objectiveData)
    }

    return fetch(API_URL, config)
    .then(res => res.json())
    .catch(err => {
        const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
        return thunkAPI.rejectWithValue(message)
    })
}

const get = (objectiveData, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token
    
    const config = {
        method: 'get',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(objectiveData)
    }

    return fetch(API_URL, config)
    .then(res => res.json())
    .catch(err => {
        const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
        return thunkAPI.rejectWithValue(message)
    })
}


const remove = (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token
    
    const config = {
        method: 'delete',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    }

    return fetch(`${API_URL}/${id}`, config)
    .then(res => res.json())
    .catch(err => {
        const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
        return thunkAPI.rejectWithValue(message)
    })
}

const objectiveService = {
    create,
    get,
    remove
}

export default objectiveService