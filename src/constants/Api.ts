const METHOD = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
}

const Api = {
    login: {
        method: METHOD.POST,
        url: 'login',
    },
    location: {
        method: METHOD.GET,
        url: 'location',
    },
}

export default Api
