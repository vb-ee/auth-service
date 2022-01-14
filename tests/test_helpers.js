import { config } from '../src/config'
import { Database } from '../src/database'
import { App } from '../src/app'

const testDb = new Database('test', config)
export class TestHelpers {
    static async startDb() {
        await testDb.connect()
    }

    static async syncDb() {
        await testDb.sync()
    }

    static async stopDb() {
        await testDb.disconnect()
    }

    static getApp() {
        return new App().getApp()
    }
}
