import { App } from './app'
import { config } from './config'
import { Database } from './database'

const db = new Database(config.environment['node_env'], config)

const app = new App()

const connection = async () => {
    try {
        await db.connect()
        app.listen()
    } catch (error) {
        console.error("Couldn't connect to the database", error.stack)
    }
}

connection()
