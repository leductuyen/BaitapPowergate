module.exports = (query) => {
    if (query) {
        return {
            status: 200,
            json: {
                status: true,
                result: {
                    message: {
                        code: 200,
                        message: 'SUCCESS',
                    },
                    data: [
                        {
                            id: 1,
                            name: 'Option 1',
                            from: '2023-01-01',
                            to: '2023-02-02',
                            client: 'Adidas',
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
                        {
                            id: 5,
                            name: 'Option 5',
                            from: '2023-01-01',
                            to: '2023-02-02',
                            client: 'Avb',
                            invoice: 'Invoice 5',
                            status: 'Received',
                            currency: 'EUR',
                            total: '2,300.00',
                        },
                        {
                            id: 6,
                            name: 'Option 5',
                            from: '2023-05-05',
                            to: '2023-06-06',
                            client: 'Avb',
                            invoice: 'Invoice 5',
                            status: 'Pending',
                            currency: 'USD',
                            total: '2,300.00',
                        },
                    ],
                },
            },
        }
    }
}
