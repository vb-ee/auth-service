import bcrypt from 'bcrypt'
import { environement } from '../config'

const { salt_rounds } = environement
export class PasswordUtils {
    static saltRound = salt_rounds

    static async hashPassword(password) {
        return bcrypt.hash(password, this.saltRound)
    }

    static async comparePasswords(password, hashedPassword) {
        return bcrypt.compare(password, hashedPassword)
    }
}
