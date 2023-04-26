import { useEffect, useState } from 'react'
import Select from '../../components/Select'
import Api from '../../constants/Api'
import sendRequest from '../../services/ApiService'
import {
    IDataTable,
    IValues_Options,
    currencyOptions,
    fundingMethodOptions,
    initialValues_Options,
    orderOptions,
    statusOptions,
    totalOptions,
} from './Config'
import './Product.scss'

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
    const [formValues, setFormValues] = useState<IValues_Options>(
        initialValues_Options
    )
    console.log(formValues)
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
    const handleInputChange = (e: any) => {
        const { value, name } = e.target
        setFormValues({ ...formValues, [name]: value })
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
    const handleDelete = async (id: any) => {
        try {
            const response = await sendRequest(
                Api.product.delete(id),
                undefined,
                {
                    Authorization: `${access_token}`,
                }
            )
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
                            <input
                                onChange={handleInputChange}
                                value={formValues.status}
                                id={`status-${table.id}`}
                                name={`status-${table.id}`}
                            />
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
