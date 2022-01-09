import { TestHelpers } from '../test_helpers'
import { User } from '../../src/models'
import { comparePasswords, hashPassword } from '../../src/utils'

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

    describe('comparePasswords', () => {
        it('checks if the hashed password is the same as original password', async () => {
            const password = 'Test123#'
            const hashedPassword = await hashPassword(password)
            const areEqual = await comparePasswords(password, hashedPassword)
            expect(areEqual).toBe(true)
        })

        it('checks if the hashed password is not the same as original password', async () => {
            const password = 'Test123#'
            const hashedPassword = await hashPassword(password)
            const areEqual = await comparePasswords(
                password + '!',
                hashedPassword
            )
            expect(areEqual).toBe(false)
        })
    })

    describe('hooks', () => {
        it('should create the user with hashed password', async () => {
            const email = 'test@example.com'
            const password = 'Test132#'
            await User.create({ email, password })
            const users = await User.findAll()
            expect(users.length).toBe(1)
            expect(users[0].email).toEqual(email)
            expect(users[0].password).not.toEqual(password)
        })
    })
})
