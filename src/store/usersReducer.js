import axios from 'axios'

export const createUser = (user) => {
    return (dispatch) => {
        axios.post('/api/users', user)
        .then(res => {
            console.log(res.data)
            console.log('new user created')
        })
        .catch(ex => console.log(ex))
    }
}

export const updateUser = (user) => {
    return (dispatch) => {
        axios.put(`/api/users/${userId}`, updatedUser)
        .then(res => {
            console.log(res.data)
            console.log('user updated')
        })
        .catch(ex => console.log(ex))
    }
}
