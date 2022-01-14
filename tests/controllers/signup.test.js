import request from 'supertest'
import { TestHelpers } from '../test_helpers'
import { models } from '../../src/models'

describe('signup', () => {
    let app

    beforeAll(async () => {
        TestHelpers.startDb()
        app = TestHelpers.getApp()
    })

    afterAll(async () => {
        TestHelpers.stopDb()
    })

    beforeEach(async () => {
        TestHelpers.syncDb()
    })

    it('should signup a new user', async () => {
        await request(app)
            .post('/signup')
            .send({ email: 'test@example.com', password: 'Test123#' })
            .expect(200)
        const { User } = models
        const users = await User.findAll()
        expect(users.length).toEqual(1)
        expect(users[0].email).toEqual('test@example.com')
    })
})
