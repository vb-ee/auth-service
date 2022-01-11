export * from './database'
import { getUser, getRefreshToken, getRole } from '../models'

const models = {}

export const registerModels = (sequelize) => {
    models = {
        User: getUser(sequelize),
        Role: getRole(sequelize),
        RefreshToken: getRefreshToken(sequelize),
        sequelize: sequelize
    }
}
