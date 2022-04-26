import request from 'supertest'
import { TestHelpers } from '../test_helpers'
import { models } from '../../src/models'

describe('token', () => {
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

    describe('authHandler', () => {
        it('should fail if the refresh token is invalid', async () => {
            const response = await request(app)
                .post('/token')
                .set('Authorization', 'Bearer invalidToken')
                .send()
                .expect(401)
            expect(response.body.message).toEqual('Invalid token')
        })

        it('should fail if the no authorization header provided', async () => {
            const response = await request(app)
                .post('/token')
                .send()
                .expect(401)
            expect(response.body.message).toEqual(
                'Authorization header not found'
            )
        })

        it('should fail if the authorization header is malformed', async () => {
            const response = await request(app)
                .post('/token')
                .set('Authorization', 'Malformed')
                .send()
                .expect(401)
        })
    })

    it('should get a new acess token successfully', async () => {
        const refreshToken = newUser.body.data.refreshToken
        const response = await request(app)
            .post('/token')
            .set('Authorization', `Bearer ${refreshToken}`)
            .send()
            .expect(200)
        expect(response.body.data).toEqual({ accessToken: expect.any(String) })
    })

    it('should return 401 if there is no saved refresh token for the user', async () => {
        const { RefreshToken } = models
        const { refreshToken } = newUser.body.data
        await RefreshToken.destroy({ where: { token: refreshToken } })
        const response = await request(app)
            .post('/token')
            .set('Authorization', `Bearer ${refreshToken}`)
            .send()
            .expect(401)
        expect(response.body.message).toEqual('You are not logged in')
    })
})
