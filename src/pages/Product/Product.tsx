import { useEffect, useState } from 'react'
import Select from '../../components/Select'
import Api from '../../constants/Api'
import sendRequest from '../../services/ApiService'
import {
    IDataTable,
    currencyOptions,
    fundingMethodOptions,
    orderOptions,
    statusOptions,
    totalOptions,
} from './Config'
import './Product.scss'
import { Link } from 'react-router-dom'

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

    const [originalData, setOriginalData] = useState<IDataTable[]>([])

    //! Function
    const getAllProduct = async () => {
        try {
            const response = await sendRequest(Api.product.getAll, undefined, {
                Authorization: `${access_token}`,
            })
            setDataTable(response.data)
            setOriginalData(response.data)
        } catch (error) {
            console.log(error)
        }
    }
    const handleOptionChange = (event: any) => {
        setOptions({ ...options, [event.target.name]: event.target.value })
    }

    const handleStatusChange = async (event: any, tableId: any) => {
        const status = event.target.value

        const newDataTable = dataTable.map((table) =>
            table.id === tableId ? { ...table, status: status } : table
        )

        setDataTable(newDataTable)
        const selectedTable = newDataTable.find((table) => table.id === tableId)
        const requestBody = {
            id: tableId,
            order: selectedTable?.order,
            status: status,
            total: selectedTable?.total,
            currency: selectedTable?.currency,
            fundingMethod: selectedTable?.fundingMethod,
        }
        try {
            await sendRequest(
                Api.product.update,

                requestBody,
                {
                    Authorization: `${access_token}`,
                }
            )
        } catch (error) {
            console.log(error)
        }
    }

    const handleTotalChange = async (event: any, tableId: any) => {
        const total = event.target.value
        const newDataTable = dataTable.map((table) =>
            table.id === tableId
                ? { ...table, total: event.target.value }
                : table
        )
        setDataTable(newDataTable)
        const selectedTable = newDataTable.find((table) => table.id === tableId)
        const requestBody = {
            id: tableId,
            order: selectedTable?.order,
            status: selectedTable?.status,
            total: total,
            currency: selectedTable?.currency,
            fundingMethod: selectedTable?.fundingMethod,
        }
        try {
            await sendRequest(
                Api.product.update,

                requestBody,
                {
                    Authorization: `${access_token}`,
                }
            )
        } catch (error) {
            console.log(error)
        }
    }

    const handleApply = () => {
        const filteredData = originalData.filter((item) => {
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
    const handleClear = () => {
        setDataTable(originalData)
        setOptions({
            status: '',
            currency: '',
            fundingMethod: '',
            total: '',
            order: '',
        })
    }
    const handleDelete = async (id: any) => {
        try {
            await sendRequest(Api.product.delete(id), undefined, {
                Authorization: `${access_token}`,
            })
        } catch (error) {
            console.log(error)
        }

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
                                value={options.currency}
                                onChange={handleOptionChange}
                                selects={currencyOptions}
                            />
                        </th>
                        <th>
                            <Select
                                id="fundingMethod-select"
                                name="fundingMethod"
                                value={options.fundingMethod}
                                onChange={handleOptionChange}
                                selects={fundingMethodOptions}
                            />
                        </th>
                        <th>
                            <Select
                                id="total-select"
                                name="total"
                                value={options.total}
                                onChange={handleOptionChange}
                                selects={totalOptions}
                            />
                        </th>

                        <th>
                            <Select
                                id="order-select"
                                name="order"
                                value={options.order}
                                onChange={handleOptionChange}
                                selects={orderOptions}
                            />
                        </th>

                        <td>
                            <button onClick={handleApply}>Apply</button>
                        </td>
                        <td>
                            <button onClick={handleClear}>Clear</button>
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
                            <td>
                                <Select
                                    id="status-select"
                                    name="status"
                                    value={table.status}
                                    onChange={(e: any) =>
                                        handleStatusChange(e, table.id)
                                    }
                                    selects={statusOptions}
                                />
                            </td>
                            <td>{table?.currency}</td>
                            <td>{table?.fundingMethod}</td>
                            <td>
                                <Select
                                    id="total-select"
                                    name="total"
                                    value={table.total}
                                    onChange={(e: any) =>
                                        handleTotalChange(e, table.id)
                                    }
                                    selects={totalOptions}
                                />
                            </td>
                            <td>{table.order}</td>
                            <td>
                                <button onClick={() => handleDelete(table.id)}>
                                    Delete
                                </button>
                            </td>
                            <td>
                                <Link to={`/product/${table.id}`}>
                                    <button>ViewAll</button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Product
