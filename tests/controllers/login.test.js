import request from 'supertest'
import { TestHelpers } from '../test_helpers'
import { models } from '../../src/models'

describe('login', () => {
    let app
    let newUser

    beforeAll(async () => {
        await TestHelpers.startDb()
        app = TestHelpers.getApp()
    })

    afterAll(async () => {
        await TestHelpers.stopDb()
    })

    beforeEach(async () => {
        await TestHelpers.syncDb()
        newUser = await TestHelpers.signupNewUser({
            email: 'test@example.com',
            password: 'Test123#',
        })
    })

    it('should login the user', async () => {
        const response = await request(app)
            .post('/login')
            .send({ email: 'test@example.com', password: 'Test123#' })
            .expect(200)
        const { refreshToken } = response.body.data
        const { RefreshToken } = models
        const savedRefreshToken = await RefreshToken.findOne({
            where: { token: refreshToken },
        })
        expect(savedRefreshToken).toBeDefined()
        expect(savedRefreshToken.token).toEqual(refreshToken)
    })

    it('should return 401 if the user not found', async () => {
        await request(app)
            .post('/login')
            .send({ email: 'invalid@example.com', password: 'Test123#' })
            .expect(401)
    })

    it('should return 401 if the password is invalid', async () => {
        await request(app)
            .post('/login')
            .send({ email: 'test@example.com', password: 'invalid' })
            .expect(401)
    })

    it('should return the same refresh token if the user is logged in', async () => {
        const response = await request(app)
            .post('/login')
            .send({ email: 'test@example.com', password: 'Test123#' })
            .expect(200)
        expect(response.body.data.refreshToken).toEqual(
            newUser.body.data.refreshToken
        )
    })
})
