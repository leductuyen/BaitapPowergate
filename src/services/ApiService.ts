import axios, { AxiosRequestConfig } from 'axios'

const baseUrl = `${process.env.REACT_APP_BACKEND_BASE_URL}`

const sendRequest = async (
    api: {
        method: string
        url: string
    },
    data: any,
    headers?: any,
    ...rest: any[]
) => {
    const { method, url } = api

    const axiosConfig: AxiosRequestConfig = {
        method,
        url: `${baseUrl}/${url}`,
        data: data || {},
        headers: headers || {},
        ...rest,
    }

    try {
        const response = await axios(axiosConfig)
        return response.data
    } catch (error: any) {
        throw error
    }
}
export default sendRequest
