import request from 'supertest'
import * as config from '../src/config'
import { Database } from '../src/database'

const testDb = new Database('test', config)
export class TestHelpers {
    static async startDb() {
        await testDb.connect()
        return testDb
    }

    static async syncDb() {
        await testDb.sync()
    }

    static async stopDb() {
        await testDb.disconnect()
    }

    static getApp() {
        const App = require('../src/app').default
        return new App().getApp()
    }

    static async signupNewUser(options) {
        const { email, password, endpoint = '/signup' } = options
        return request(TestHelpers.getApp())
            .post(endpoint)
            .send({ email, password })
    }
}
