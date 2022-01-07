import { Sequelize, DataTypes, Model } from 'sequelize'
import { User } from '.'
import { sequelize } from '../config/config'

export class Role extends Model {}

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

Role.belongsTo(User)
