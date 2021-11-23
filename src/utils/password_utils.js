import bcrypt from 'bcrypt'

export class PasswordUtils {
    static saltRound = process.env.SALT_ROUNDS

    static async hashPassword(password) {
        return bcrypt.hash(password, this.saltRound)
    }

    static async comparePasswords(password, hashedPassword) {
        return bcrypt.compare(password, hashedPassword)
    }
}
