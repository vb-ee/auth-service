import { DataTypes, Model } from 'sequelize'

export const getRole = (sequelize) => {
    class Role extends Model {
        static associate(models) {
            Role.belongsTo(models['User'])
        }
    }

    Role.init(
        {
            role: {
                type: DataTypes.STRING
            }
        },
        {
            sequelize,
            tableName: 'roles'
        }
    )

    return Role
}
