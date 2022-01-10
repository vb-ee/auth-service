import { App } from './app'
import { db } from './database'

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
