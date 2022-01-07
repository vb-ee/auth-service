import { Sequelize, DataTypes, Model } from 'sequelize'
import { User } from '.'
import { sequelize } from '../config/config'

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

RefreshToken.belongsTo(User)
