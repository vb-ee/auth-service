import { DataTypes, Model } from 'sequelize'
import { hashPassword, JwtUtils } from '../utils'

export const getUser = (sequelize) => {
    class User extends Model {
        static associate(models) {
            User.hasMany(models['Role'])
            User.hasOne(models['RefreshToken'])
        }

        static async createUser(userAttributes) {
            return sequelize.transaction(async () => {
                const {
                    email,
                    password,
                    username,
                    firstname,
                    lastname,
                    roles
                } = userAttributes
                const newUser = await User.create({ email, password })
                const jwtPayload = { email }
                const accessToken = JwtUtils.generateAccessToken(jwtPayload)
                const refreshToken = JwtUtils.generateRefreshToken(jwtPayload)
                await newUser.createRefreshToken({ token: refreshToken })

                if (roles && Array.isArray(roles)) {
                    for (const role of roles) {
                        await newUser.createRole({ role })
                    }
                }

                return { accessToken, refreshToken }
            })
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
