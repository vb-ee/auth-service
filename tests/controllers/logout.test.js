import request from 'supertest'
import { TestHelpers } from '../test_helpers'
import { models } from '../../src/models'

describe('logout', () => {
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
            password: 'Test123#'
        })
    })

    describe('authHandler', () => {
        it('should fail if the access token is invalid', async () => {
            const response = await request(app)
                .post('/logout')
                .set('Authorization', 'Bearer invalidToken')
                .send()
                .expect(401)
            expect(response.body.message).toEqual('Invalid token')
        })
    })

    it('should logout a user successfully', async () => {
        const { accessToken } = newUser.body.data
        const response = await request(app)
            .post('/logout')
            .set('Authorization', `Bearer ${accessToken}`)
            .send()
            .expect(200)
        const { User, RefreshToken } = models
        const user = await User.findOne({
            where: { email: 'test@example.com' },
            include: RefreshToken
        })
        expect(user.RefreshToken.token).toEqual(null)
    })
})
