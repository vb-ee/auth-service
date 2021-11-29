import { Database } from './database'
import config from './config/config'

const connectionTest = async () => {
    try {
        const db = new Database(config[environment].node_env, config)
        await db.connect()
    } catch (error) {
        console.error("Couldn't connect to the database", error.stack)
    }
}

connectionTest()
