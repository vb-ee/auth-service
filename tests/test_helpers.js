import { Database } from '../src/database/database'
import { config } from '../src/config/config'

let db

export class TestHelpers {
    static async startDb() {
        db = new Database('test', config)
        await db.connect()
    }

    static async stopDb() {
        await db.disconnect()
    }

    static async syncDb() {
        await db.sync()
    }
}
