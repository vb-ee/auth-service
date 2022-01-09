import { Sequelize } from 'sequelize'
import { Database } from '../src/database/database'
import { config } from '../src/config/config'

let db = new Database('test', config)

const { username, password, host, port, database, dialect } = db.getConfig()

export const sequelize = new Sequelize(database, username, password, {
    host: host,
    dialect: dialect,
    port: port,
    logging: false,
})

export class TestHelpers {
    static async startDb() {
        await db.connect(sequelize)
    }

    static async stopDb() {
        await db.disconnect(sequelize)
    }
}
