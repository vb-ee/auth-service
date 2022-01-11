import { config } from '../src/config'
import { Database } from '../src/database'

const testDb = new Database('test', config)
export class TestHelpers {
    static async startDb() {
        await testDb.connect()
    }

    static async stopDb() {
        await testDb.disconnect()
    }
}
