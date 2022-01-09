import express from 'express'
import morgan from 'morgan'
import { config } from './config/config'

const { node_env, port } = config.environment

export class App {
    constructor() {
        this.app = express()
        this.app.use(morgan('dev', { skip: (req, res) => node_env === 'test' }))
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))
        this.setRoutes()
    }

    setRoutes() {}

    getApp() {
        return this.app
    }

    listen() {
        this.app.listen(port, () => {
            console.log(`Listening on port ${port}`)
        })
    }
}
