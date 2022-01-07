import { Sequelize, DataTypes, Model } from 'sequelize'
import { sequelize } from '../config/config'
import { hashPassword } from '../utils'
import { Role } from './role'

export class User extends Model {}

User.init(
    {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: {
                    msg: 'Not a valid email address'
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            unique: true
        },
        firstName: {
            type: DataTypes.STRING,
            validate: {
                len: {
                    args: [0, 50],
                    msg: 'First name has too many characters'
                }
            }
        },
        lastName: {
            type: DataTypes.STRING,
            validate: {
                len: {
                    args: [0, 50],
                    msg: 'Last name has too many characters'
                }
            }
        }
    },
    {
        sequelize,
        tableName: 'users'
    }
)

User.beforeCreate(async (user, options) => {
    const hashedPassword = await hashPassword(user.password)
    user.password = hashedPassword
})

User.hasMany(Role)
User.hasOne(RefreshToken)
