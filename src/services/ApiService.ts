import axios, { AxiosRequestConfig } from 'axios'

const baseUrl = `${process.env.REACT_APP_BACKEND_BASE_URL}`

const sendRequest = async (
    api: {
        method: string
        url: string
    },
    data?: any,
    headers?: any,
    extraParams?: { [key: string]: string }
) => {
    const { method, url } = api

    const params = extraParams
        ? `?${new URLSearchParams(extraParams).toString()}`
        : ''

    const axiosConfig: AxiosRequestConfig = {
        method,
        url: `${baseUrl}/${url}${params}`,
        data: data || {},
        headers: headers || {},
    }

    try {
        const response = await axios(axiosConfig)
        return response.data
    } catch (error: any) {
        throw error
    }
}

export default sendRequest
