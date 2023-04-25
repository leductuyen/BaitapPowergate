import { useEffect, useState } from 'react'
import sendRequest from '../../services/ApiService'
import Api from '../../constants/Api'
import {
    IDataTable,
    currencyOptions,
    fundingMethodOptions,
    orderOptions,
    statusOptions,
    totalOptions,
} from './Config'
import './Product.scss'
import Select from '../../components/Select'

const Product = () => {
    const access_token = document.cookie
        .split(';')
        .map((cookie) => cookie.split('='))
        .find(([name, _]) => name.trim() === 'access_token')?.[1]
    //! State
    const [options, setOptions] = useState({
        status: '',
        currency: '',
        fundingMethod: '',
        total: '',
        order: '',
    })

    const [dataTable, setDataTable] = useState<IDataTable[]>([])

    //! Function
    const getAllProduct = async () => {
        try {
            const response = await sendRequest(Api.product.getAll, undefined, {
                Authorization: `${access_token}`,
            })
            setDataTable(response.data)
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }
    const handleOptionChange = (event: any) => {
        setOptions({ ...options, [event.target.name]: event.target.value })
    }
    const handleApply = () => {
        const filteredData = dataTable.filter((item) => {
            let shouldInclude = true
            if (options.status && options.status !== item.status) {
                shouldInclude = false
            }
            if (options.currency && options.currency !== item.currency) {
                shouldInclude = false
            }
            if (
                options.fundingMethod &&
                options.fundingMethod !== item.fundingMethod
            ) {
                shouldInclude = false
            }
            if (options.total && options.total !== item.total) {
                shouldInclude = false
            }
            if (options.order && options.order !== item.order) {
                shouldInclude = false
            }

            return shouldInclude
        })
        setDataTable(filteredData)
    }
    const handleDelete = (id: any) => {
        setDataTable(dataTable.filter((item) => item.id !== id))
    }
    useEffect(() => {
        getAllProduct()
    }, [])
    return (
        <div className="container">
            <h2 className="title">Tiêu đề</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>
                            <Select
                                id="status-select"
                                name="status"
                                value={options.status}
                                onChange={handleOptionChange}
                                selects={statusOptions}
                            />
                        </th>
                        <th>
                            <Select
                                id="currency-select"
                                name="currency"
                                value={options.status}
                                onChange={handleOptionChange}
                                selects={currencyOptions}
                            />
                        </th>
                        <th>
                            <Select
                                id="fundingMethod-select"
                                name="fundingMethod"
                                value={options.status}
                                onChange={handleOptionChange}
                                selects={fundingMethodOptions}
                            />
                        </th>
                        <th>
                            <Select
                                id="total-select"
                                name="total"
                                value={options.status}
                                onChange={handleOptionChange}
                                selects={totalOptions}
                            />
                        </th>

                        <th>
                            <Select
                                id="order-select"
                                name="order"
                                value={options.status}
                                onChange={handleOptionChange}
                                selects={orderOptions}
                            />
                        </th>

                        <td>
                            <button onClick={handleApply}>Apply</button>
                        </td>
                        <td>
                            <button>Clear</button>
                        </td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Status</td>
                        <td>Currency</td>
                        <td>FundingMethod</td>

                        <td>Total</td>
                        <td>Order</td>
                    </tr>
                    {dataTable.map((table) => (
                        <tr key={table.id}>
                            <td>{table.status}</td>
                            <td>{table?.currency}</td>
                            <td>{table?.fundingMethod}</td>
                            <td>{table?.total}</td>
                            <td>{table?.order}</td>
                            <td>
                                <button onClick={() => handleDelete(table.id)}>
                                    Delete
                                </button>
                            </td>
                            <td>
                                <button>ViewAll</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Product
