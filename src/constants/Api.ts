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
    profile: {
        user: {
            method: METHOD.GET,
            url: 'user',
        },
        upload: {
            method: METHOD.PUT,
            url: 'user',
        },
    },
    product: {
        getAll: {
            method: METHOD.GET,
            url: 'product',
        },
        delete: (id: number) => {
            return {
                method: METHOD.DELETE,
                url: `product/${id}`,
            }
        },
    },
}

export default Api
