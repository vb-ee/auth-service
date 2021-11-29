import dotenv from 'dotenv'

dotenv.config()

module.exports = {
    development: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_DATABASE,
        dialect: 'postgres'
    },
    test: {
        username: process.env.DB_TEST_USERNAME,
        password: process.env.DB_TEST_PASSWORD,
        host: process.env.DB_TEST_HOST,
        port: process.env.DB_TEST_PORT,
        database: process.env.DB_TEST_DATABASE,
        dialect: 'postgres'
    },
    environment: {
        port = process.env.PORT,
        nodeEnv = process.env.NODE_ENV,
        jwt_auth_token = process.env.JWT_SECRET_AUTH_TOKEN,
        jwt_refresh_token = process.env.JWT_SECRET_REFRESH_TOKEN,
        jwt_expires_in = process.env.JWT_EXPIRES_IN,
        saltRounds = process.env.SALT_ROUNDS 
    }
}
