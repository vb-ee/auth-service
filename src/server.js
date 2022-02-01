import { config } from './config'
import { Database } from './database'
;(async () => {
    try {
        const db = new Database(config.environment['node_env'], config)
        await db.connect()

        const App = require('./app').default
        const app = new App()
        app.listen()
    } catch (error) {
        console.error("Couldn't connect to the database", error.stack)
    }
})()
