import { Database } from './database/database.js'
import { config } from './config/config.js'
import { App } from './app'

const app = new App()

const { node_env } = config.environment

const connectionTest = async () => {
    try {
        const db = new Database(node_env, config)
        await db.connect()
        app.listen()
    } catch (error) {
        console.error("Couldn't connect to the database", error.stack)
    }
}

connectionTest()
