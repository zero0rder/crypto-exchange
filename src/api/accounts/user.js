const baseURL = process.env.REACT_APP_BASE_URL;
const userUrl = `${ baseURL }/users`;

export const fetchUser = async (id) => {
    const opts = {
        method: 'GET',
    };

    return await fetchCryptoData(`${userUrl}/${id}`, opts).then(res => res)
};

export const createUser = async (user) => {
    const opts = {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {'Content-type': 'application/json; charset=UTF-8'},
    };

    return await fetchCryptoData(userUrl, opts).then(res => res);
}

export const deleteUser = async (id) => {
    const opts = {
        method: 'DELETE',
    };

    return await fetchCryptoData(`${userUrl}/${id}`, opts).then(res => res);
} 


export const updateUser = async (id, user) => {
    const opts = {
        method: 'PATCH',
        body: JSON.stringify(user),
        headers: {'Content-type': 'application/json; charset=UTF-8'},
    };

    return await fetchCryptoData(`${userUrl}/${id}`, opts).then(res => res);
}

export const addPurchase = async (user) => {
    const opts = {
        method: 'PATCH',
        body: JSON.stringify(user),
        headers: {'Content-type': 'application/json; charset=UTF-8'},
    };

    return await fetchCryptoData(`${userUrl}/purchase`, opts).then(res => res);
}

async function fetchCryptoData(url, opts){
    const response = await fetch(url, opts).then(res => {
        if(res.ok)
            return res.json();
        
        throw res;
    
    }).then(data => data).catch(err => {
        console.log('error in api', err);
    });

    return  response;
}
