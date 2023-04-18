const METHOD = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
}

const Api = {
    auth: {
        login: {
            method: METHOD.POST,
            url: 'login',
        },
        register: {
            method: METHOD.POST,
            url: 'auth/register',
        },
    },
    location: {
        method: METHOD.GET,
        url: 'location',
    },
}

export default Api
