import { Sequelize, DataTypes, Model } from 'sequelize'
import { sequelize, testSequelize } from '../database'

export const getRefreshToken = (sequelize) => {
    class RefreshToken extends Model {}

    RefreshToken.init(
        {
            token: {
                type: DataTypes.TEXT
            }
        },
        {
            sequelize,
            tableName: 'refreshTokens'
        }
    )

    return RefreshToken
}
