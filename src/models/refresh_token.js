import { DataTypes, Model } from 'sequelize'

export const getRefreshToken = (sequelize) => {
    class RefreshToken extends Model {
        static associate(models) {
            RefreshToken.belongsTo(models['User'])
        }
    }

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
