import { Sequelize, DataTypes, Model } from 'sequelize'
import { sequelize } from '../database'

export class Role extends Model {}

Role.init(
    {
        role: {
            type: DataTypes.STRING,
        },
    },
    {
        sequelize,
        tableName: 'roles',
    }
)
