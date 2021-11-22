import bcrypt from 'bcrypt'

export class PasswordUtils {
    private static saltRound: any = process.env.SALT_ROUNDS

    static async hashPassword(password: string) {
        return bcrypt.hash(password, this.saltRound)
    }

    static async comparePasswords(password: string, hashedPassword: string) {
        return bcrypt.compare(password, hashedPassword)
    }
}
