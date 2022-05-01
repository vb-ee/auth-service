import express from 'express'
import morgan from 'morgan'
import * as config from './config'
import { errorMiddleware } from './middlewares/error_handler'
import { router } from './controllers'

const { node_env, port } = config.environment

export default class App {
    constructor() {
        this.app = express()
        this.app.use(morgan('dev', { skip: (req, res) => node_env === 'test' }))
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))
        this.setRoutes()
    }

    setRoutes() {
        this.app.use('/', router)
        this.app.use(errorMiddleware)
    }

    getApp() {
        return this.app
    }

    listen() {
        this.app.listen(port, () => {
            console.log(`Listening on port ${port}`)
        })
    }
}
