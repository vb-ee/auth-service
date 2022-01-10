import { Sequelize, DataTypes, Model } from 'sequelize'
import { sequelize, testSequelize } from '../database'

export class RefreshToken extends Model {}

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
