import { App } from './app'
import { db, sequelize } from './database'

const app = new App()

const connectionTest = async () => {
    try {
        await db.connect(sequelize)
        app.listen()
    } catch (error) {
        console.error("Couldn't connect to the database", error.stack)
    }
}

connectionTest()
