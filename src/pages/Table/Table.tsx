import React, { useEffect, useState } from 'react'
import Select from '../../components/Select'
import moment from 'moment'

import './Table.scss'
import {
    IDataTable,
    clientOptions,
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
            const response = await sendRequest(Api.table.get)
            setDataTable(response?.result.data)
        } catch (error) {}
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
            if (options.client && options.client !== item.client) {
                shouldInclude = false
            }
            if (options.invoice && options.invoice !== item.invoice) {
                shouldInclude = false
            }
            if (
                options.from &&
                !moment(item.date).isSameOrAfter(options.from)
            ) {
                shouldInclude = false
            }
            if (options.to && !moment(item.date).isSameOrBefore(options.to)) {
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
                        <th>
                            <label htmlFor="from-date-select">From</label>
                            <input
                                type="date"
                                id="from-date-select"
                                name="from"
                                value={options.from}
                                onChange={handleOptionChange}
                            />
                        </th>
                        <th>
                            <label htmlFor="to-date-select">To</label>
                            <input
                                type="date"
                                id="to-date-select"
                                name="to"
                                value={options.to}
                                onChange={handleOptionChange}
                            />
                        </th>

                        <th>
                            <Select
                                id="invoice-select"
                                name="invoice"
                                value={options.invoice}
                                onChange={handleOptionChange}
                                selects={invoiceOptions}
                            />
                        </th>
                        <th></th>
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
                        <td>Date</td>
                        <td>Client</td>
                        <td>Currentcy</td>
                        <td>Total</td>
                        <td>Invocie</td>
                    </tr>
                    {dataTable.map((table) => (
                        <tr key={table.id}>
                            <td>{table.status}</td>
                            <td>{table.client}</td>
                            <td>{table.from}</td>
                            <td>{table.currency}</td>
                            <td>{table.total}</td>
                            <td>{table.invoice}</td>
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

export default Table
