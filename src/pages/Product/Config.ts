export interface IDataTable {
    id?: number
    status: string

    currency?: string
    fundingMethod?: string
    total?: string
    order?: string
    date?: string
}

export const statusOptions = [
    { key: 'Pending', name: 'Pending' },
    { key: 'Processing', name: 'Processing' },
    { key: 'Fullfield', name: 'Fullfield' },
]

export const currencyOptions = [
    { key: 'USD', name: 'USD' },
    { key: 'VN', name: 'VN' },
]

export const fundingMethodOptions = [
    { key: 'Cash', name: 'Cash' },
    { key: 'Cash1', name: 'Cash1' },
    { key: 'Cash2', name: 'Cash2' },
]

export const totalOptions = [
    { key: '10', name: '10' },
    { key: '20', name: '20' },
    { key: '30', name: '30' },
    { key: '40', name: '40' },
    { key: '50', name: '50' },
    { key: '60', name: '60' },
    { key: '70', name: '70' },
    { key: '80', name: '80' },
    { key: '90', name: '90' },
]

export const orderOptions = [
    { key: 'order', name: 'order' },
    { key: 'order1', name: 'order1' },
    { key: 'order2', name: 'order2' },
    { key: 'order3', name: 'order3' },
    { key: 'order4', name: 'order4' },
    { key: 'order5', name: 'order5' },
    { key: 'order6', name: 'order6' },
]
