import { TestHelpers } from '../test_helpers'
import { User } from '../../src/models'

describe('User', () => {
    beforeAll(async () => {
        await TestHelpers.startDb()
    })

    afterAll(async () => {
        await TestHelpers.stopDb()
    })

    describe('hashPassword', () => {
        it('should encrypt the password', async () => {
            const password = 'Test123#'
            const hashedPassword = await hashPassword(password)
            expect(hashedPassword).toEqual(expect.any(String))
            expect(hashedPassword).not.toEqual(password)
        })
    })
})
