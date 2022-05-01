import dotenv from 'dotenv'

dotenv.config()

const config = {
    development: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_DATABASE,
        dialect: process.env.DB_DIALECT
    },
    test: {
        username: process.env.DB_TEST_USERNAME,
        password: process.env.DB_TEST_PASSWORD,
        host: process.env.DB_TEST_HOST,
        port: process.env.DB_TEST_PORT,
        database: process.env.DB_TEST_DATABASE,
        dialect: process.env.DB_TEST_DIALECT
    },
    production: {
        username: process.env.DB_PROD_USERNAME,
        password: process.env.DB_PROD_PASSWORD,
        host: process.env.DB_PROD_HOST,
        port: process.env.DB_PROD_PORT,
        database: process.env.DB_PROD_DATABASE,
        dialect: process.env.DB_PROD_DIALECT
    },
    environment: {
        port: process.env.PORT,
        node_env: process.env.NODE_ENV,
        jwt_auth_token: process.env.JWT_SECRET_AUTH_TOKEN,
        jwt_refresh_token: process.env.JWT_SECRET_REFRESH_TOKEN,
        jwt_expires_in: process.env.JWT_EXPIRES_IN,
        salt_rounds: process.env.SALT_ROUNDS
    }
}

module.exports = config
