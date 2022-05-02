import { DataTypes, Model } from 'sequelize'
import { hashPassword } from '../utils'

export const getUser = (sequelize) => {
    class User extends Model {
        static associate(models) {
            User.hasMany(models['Role'])
            User.hasOne(models['RefreshToken'])
        }
    }

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
            firstname: {
                type: DataTypes.STRING,
                validate: {
                    len: {
                        args: [0, 50],
                        msg: 'First name has too many characters'
                    }
                }
            },
            lastname: {
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

    return User
}
