import bcrypt from 'bcrypt'
import { config } from '../config/config'

const { salt_rounds } = config.environment

export const hashPassword = (password) => {
    return bcrypt.hash(password, parseInt(salt_rounds))
}

export const comparePasswords = (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword)
}
