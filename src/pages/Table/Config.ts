export interface IDataTable {
    id?: number
    status: string
    client: string
    from: string
    to: string
    invoice: string
    currency?: string
    total?: string
    date?: string
}

export const statusOptions = [
    { key: '', name: 'Status' },
    { key: 'Pending', name: 'Pending' },
    { key: 'Processing', name: 'Processing' },
    { key: 'Fullfield', name: 'Fullfield' },
]
export const clientOptions = [
    { key: '', name: 'Client' },
    { key: 'Adidas', name: 'Adidas' },
    { key: 'Avb', name: 'Avb' },
    { key: 'Powergate', name: 'Powergate' },
]
export const invoiceOptions = [
    { key: '', name: 'Invoice' },
    { key: 'Invoice 1', name: 'Invoice 1' },
    { key: 'Invoice 2', name: 'Invoice 2' },
    { key: 'Invoice 3', name: 'Invoice 3' },
    { key: 'Invoice 4', name: 'Invoice 4' },
    { key: 'Invoice 5', name: 'Invoice 5' },
]
