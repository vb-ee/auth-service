import { Sequelize } from 'sequelize'

export class Database {
    constructor(environment, dbConfig) {
        this.environment = environment
        this.dbConfig = dbConfig
        this.isTestEnv = this.environment === 'test'
    }

    async connect() {
        const { username, password, host, port, database, dialect } =
            this.dbConfig[this.environment]

        this.connection = new Sequelize(database, username, password, {
            host: host,
            dialect: dialect,
            logging: this.isTestEnv ? false : console.log
        })

        await this.connection.authenticate()

        if (!this.isTestEnv)
            console.log('Connection has been established successfully!')

        await this.connection.sync({ force: this.isTestEnv, logging: false })
        if (!this.isTestEnv) console.log('Models synchronized succesfully!')
    }

    async sync() {
        await this.connection.sync({
            force: this.isTestEnvironment,
            logging: false
        })

        if (!this.isTestEnvironment) {
            console.log('Models synchronized successfully')
        }
    }

    async disconnect() {
        await this.connection.close()
    }
}
