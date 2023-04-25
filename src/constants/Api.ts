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
            url: 'auth/login',
        },
        register: {
            method: METHOD.POST,
            url: 'auth/register',
        },
    },
}

export default Api
