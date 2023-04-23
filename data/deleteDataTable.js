const getDataTable = require('./getDataTable')

module.exports = (id) => {
    const dataTable = getDataTable()

    const recordIndex = dataTable.data.findIndex((record) => record.id === id)

    if (recordIndex === -1) {
        return {
            status: 404,
            json: {
                status: false,
                message: `Record with id ${id} not found`,
            },
        }
    }

    dataTable.data.splice(recordIndex, 1)

    return {
        status: 200,
        json: {
            status: true,
            message: `Record with id ${id} has been deleted`,
        },
    }
}
