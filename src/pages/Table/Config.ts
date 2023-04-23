// interface IOption {
//     key: string
//     name: string | string[]
// }

// interface IOptions {
//     [key: string]: IOption[]
// }

// export const options: IOptions = {
//     status: [
//         { key: 'pending', name: 'Pending' },
//         { key: 'processing', name: 'Processing' },
//         { key: 'fullfield', name: 'Fullfield' },
//     ],
//     client: [
//         { key: 'adidas', name: 'ADIDAS' },
//         { key: 'avb', name: 'AVB' },
//         { key: 'powergate', name: 'POWERGATE' },
//     ],
//     invoice: [
//         { key: 'invoice 1', name: 'Invoice 1' },
//         { key: 'invoice 2', name: 'Invoice 2' },
//         { key: 'invoice 3', name: 'Invoice 3' },
//         { key: 'invoice 4', name: 'Invoice 4' },
//         { key: 'invoice 5', name: 'Invoice 5' },
//     ],
// }

export interface IDataTable {
    id: number
    status: string
    client: string
    from: string
    to: string
    invoice: string
}

export const statusOptions = [
    { key: 'Pending', name: 'Pending' },
    { key: 'Processing', name: 'Processing' },
    { key: 'Fullfield', name: 'Fullfield' },
]
export const clientOptions = [
    { key: 'Adidas', name: 'Adidas' },
    { key: 'Avb', name: 'Avb' },
    { key: 'Powergate', name: 'Powergate' },
]
export const invoiceOptions = [
    { key: 'Invoice 1', name: 'Invoice 1' },
    { key: 'Invoice 2', name: 'Invoice 2' },
    { key: 'Invoice 3', name: 'Invoice 3' },
    { key: 'Invoice 4', name: 'Invoice 4' },
    { key: 'Invoice 5', name: 'Invoice 5' },
]
export const data = [
    {
        id: 1,
        name: 'Option 1',
        from: '2023-01-01',
        to: '2023-02-02',
        client: 'Avb',
        invoice: 'Invoice 1',
        status: 'Processing',
        currency: 'USD',
        total: '2,300.00',
    },
    {
        id: 2,
        name: 'Option 2',
        from: '2023-03-03',
        to: '2023-04-04',
        client: 'Avb',
        invoice: 'Invoice 2',
        status: 'Fullfield',
        currency: 'EUR',
        total: '2,300.00',
    },
    {
        id: 3,
        name: 'Option 3',
        from: '2023-05-05',
        to: '2023-06-06',
        client: 'Powergate',
        invoice: 'Invoice 3',
        status: 'Pending',
        currency: 'USD',
        total: '2,300.00',
    },
    {
        id: 4,
        name: 'Option 4',
        from: '2023-07-07',
        to: '2023-08-08',
        client: 'Adidas',
        invoice: 'Invoice 4',
        status: 'Received',
        currency: 'USD',
        total: '2,300.00',
    },
]
