import { Sequelize } from 'sequelize'
import { registerModels } from '.'
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
            port: port,
            logging: this.isTestEnv ? false : console.log
        })

        await this.connection.authenticate()

        if (!this.isTestEnv)
            console.log('Successfully connected to the database')

        registerModels(this.connection)

        await this.connection.sync({
            force: this.isTestEnv,
            logging: false
        })

        if (!this.isTestEnv) console.log('Models synchronized succesfully!')
    }

    async disconnect() {
        await this.connection.close()
    }
}
