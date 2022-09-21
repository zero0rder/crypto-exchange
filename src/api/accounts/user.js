import { fetchData } from '../index'

const baseURL = process.env.REACT_APP_BASE_URL
const userUrl = `${ baseURL }/users`

export const fetchUser = async (id) => {
    const opts = {
        method: 'GET',
    }

    return await fetchData(`${userUrl}/${id}`, opts).then(res => res)
}

export const createUser = async (user) => {
    const opts = {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {'Content-type': 'application/json; charset=UTF-8'},
    }

    return await fetchData(userUrl, opts).then(res => res)
}

export const deleteUser = async (id) => {
    const opts = {
        method: 'DELETE',
    }

    return await fetchData(`${userUrl}/${id}`, opts).then(res => res)
} 

export const updateUser = async (id, user) => {
    const opts = {
        method: 'PATCH',
        body: JSON.stringify(user),
        headers: {'Content-type': 'application/json; charset=UTF-8'},
    }

    return await fetchData(`${userUrl}/${id}`, opts).then(res => res)
}

export const addPurchase = async (user) => {
    const opts = {
        method: 'PATCH',
        body: JSON.stringify(user),
        headers: {'Content-type': 'application/json; charset=UTF-8'},
    }

    return await fetchData(`${userUrl}/purchase`, opts).then(res => res)
}
