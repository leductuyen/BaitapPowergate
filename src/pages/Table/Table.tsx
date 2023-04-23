import React, { useEffect, useState } from 'react'
import Select from '../../components/Select'
import './Table.scss'
import {
    IDataTable,
    clientOptions,
    data,
    invoiceOptions,
    statusOptions,
} from './Config'
import sendRequest from '../../services/ApiService'
import Api from '../../constants/Api'

function Table() {
    const [options, setOptions] = useState({
        status: '',
        client: '',
        date: '',
        invoice: '',
        from: '',
        to: '',
    })
    const [dataTable, setDataTable] = useState<IDataTable[]>([])
    const getDataTable = async () => {
        try {
            const response = await sendRequest(Api.table)
            setDataTable(response?.result.data)
        } catch (error) {}
    }
    const handleOptionChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setOptions({ ...options, [event.target.name]: event.target.value })
    }
    const handleApply = () => {
        const filteredData = data.filter((item) => {
            let shouldInclude = true
            if (options.status && options.status !== item.status) {
                shouldInclude = false
            }
            if (options.client && options.client !== item.client) {
                shouldInclude = false
            }
            if (
                options.date &&
                (item.from < options.from || item.to > options.to)
            ) {
                shouldInclude = false
            }
            if (options.invoice && options.invoice !== item.invoice) {
                shouldInclude = false
            }
            return shouldInclude
        })
        setDataTable(filteredData)
    }
    useEffect(() => {
        getDataTable()
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
                                id="client-select"
                                name="client"
                                value={options.client}
                                onChange={handleOptionChange}
                                selects={clientOptions}
                            />
                        </th>
                        <th>From</th>
                        <th>To</th>
                        <th>
                            <Select
                                id="invoice-select"
                                name="invoice"
                                value={options.invoice}
                                onChange={handleOptionChange}
                                selects={invoiceOptions}
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
                        <td>Client</td>
                        <td>From</td>
                        <td>To</td>
                        <td>Invoice</td>
                    </tr>
                    {dataTable.map((table) => (
                        <tr key={table.id}>
                            <td>{table.status}</td>
                            <td>{table.client}</td>
                            <td>{table.from}</td>
                            <td>{table.to}</td>
                            <td>{table.invoice}</td>
                            <td>
                                <button>Delete</button>
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

export default Table
