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
    photos: {
        method: METHOD.GET,
        url: 'photos',
    },
    posts: {
        method: METHOD.GET,
        url: 'posts',
    },
    table: {
        get: {
            method: METHOD.GET,
            url: 'get-data_table',
        },
        delete: {
            method: METHOD.DELETE,
        },
    },
}

export default Api
