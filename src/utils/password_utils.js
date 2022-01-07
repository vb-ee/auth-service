import bcrypt from 'bcrypt'
import { environement } from '../config'

const { salt_rounds } = environement

export const hashPassword = (password) => {
    return bcrypt.hash(password, salt_rounds)
}

export const comparePasswords = (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword)
}
