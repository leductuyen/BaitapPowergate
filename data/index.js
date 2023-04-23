/* eslint-disable @typescript-eslint/no-var-requires */
const jsonServer = require('json-server')
const path = require('path')

/* import handle */
const login = require('./login')
const getBranchInfo = require('./getBranchInfo')
const getDataTable = require('./getDataTable')
const deleteDataTable = require('./deleteDataTable')

const server = jsonServer.create()
const router = jsonServer.router(path.join(__dirname, 'db.json'))
const middlewares = jsonServer.defaults()

server.use(jsonServer.bodyParser)
server.use(middlewares)

server.use((req, res, next) => {
    if (req.method === 'POST') {
        const endPoint = req.originalUrl
        if (endPoint === '/login') {
            const result = login(req.body)
            const { status, json } = result
            res.status(status).json(json)
            return
        }

        res.json({ message: 'User created successfully', name: req.body.name })
    }

    if (req.method === 'GET') {
        const endPoint = req.originalUrl

        if (endPoint.includes('/get-branch_info')) {
            const result = getBranchInfo(req.query)
            const { status, json } = result
            res.status(status).json(json)
            return
        }
        if (endPoint.includes('/get-data_table')) {
            const result = getDataTable(req.query)
            const { status, json } = result
            res.status(status).json(json)
            return
        }

        next()
    }
    if (req.method === 'DELETE') {
        const endPoint = req.originalUrl
        if (endPoint.includes('/delete-data_table')) {
            const id = req.query.id
            const result = deleteDataTable(id)
            const { status, json } = result
            res.status(status).json(json)
            return
        }
    }
})

server.use(router)

server.listen(3001, () => {
    console.log('JSON Server is running')
})
