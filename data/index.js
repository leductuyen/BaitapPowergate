/* eslint-disable @typescript-eslint/no-var-requires */
const jsonServer = require('json-server')
const path = require('path')

/* import handle */
const login = require('./login')

const getDataTable = require('./getDataTable')

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

        if (endPoint.includes('/get-data_table')) {
            const result = getDataTable(req.query)
            const { status, json } = result
            res.status(status).json(json)
            return
        }

        next()
    }
})

server.use(router)

server.listen(3001, () => {
    console.log('JSON Server is running')
})
