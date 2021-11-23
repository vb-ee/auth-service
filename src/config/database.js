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
    }
}
