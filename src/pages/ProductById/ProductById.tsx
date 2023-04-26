import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Api from '../../constants/Api'
import sendRequest from '../../services/ApiService'
import { IProductById } from './Config'
import './ProductById.scss'
const ProductById = () => {
    const { id } = useParams()
    const access_token = document.cookie
        .split(';')
        .map((cookie) => cookie.split('='))
        .find(([name, _]) => name.trim() === 'access_token')?.[1]

    const [productById, setProductById] = useState<IProductById>()

    const getProductById = async () => {
        const response = await sendRequest(Api.product.getById(id), undefined, {
            Authorization: `${access_token}`,
        })
        setProductById(response?.data)
    }

    useEffect(() => {
        getProductById()
    }, [])
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Status</th>
                    <th>Currency</th>
                    <th>FundingMethodOptions</th>
                    <th>Total</th>
                    <th>Order</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{productById?.status}</td>
                    <td>{productById?.currency}</td>
                    <td>{productById?.fundingMethod}</td>
                    <td>{productById?.total}</td>
                    <td>{productById?.order}</td>
                </tr>
            </tbody>
        </table>
    )
}

export default ProductById
