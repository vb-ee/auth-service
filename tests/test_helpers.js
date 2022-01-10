import { testDb } from '../src/database'

export class TestHelpers {
    static async startDb() {
        await testDb.connect()
    }

    static async stopDb() {
        await testDb.disconnect()
    }
}
