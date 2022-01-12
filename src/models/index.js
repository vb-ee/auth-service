import { getUser } from './user'
import { getRole } from './role'
import { getRefreshToken } from './refresh_token'

let models = {}

export const registerModels = (sequelize) => {
    models = {
        User: getUser(sequelize),
        Role: getRole(sequelize),
        RefreshToken: getRefreshToken(sequelize),
        sequelize: sequelize
    }

    Object.keys(models).forEach((modelName) => {
        if (models[modelName].associate) {
            models[modelName].associate(models)
        }
    })
}

export { models }
