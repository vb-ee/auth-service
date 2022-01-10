import { Sequelize } from 'sequelize'
export class Database {
    constructor(environment, dbConfig) {
        this.environment = environment
        this.dbConfig = dbConfig
        this.isTestEnv = this.environment === 'test'
    }

    getSequelize() {
        const { username, password, host, port, database, dialect } =
            this.dbConfig[this.environment]

        return new Sequelize(database, username, password, {
            host: host,
            dialect: dialect,
            port: port,
            logging: this.isTestEnv ? false : console.log
        })
    }

    async connect() {
        await this.getSequelize().authenticate()

        if (!this.isTestEnv)
            console.log('Successfully connected to the database')

        await this.getSequelize().sync({
            force: this.isTestEnv,
            logging: false
        })

        if (!this.isTestEnv) console.log('Models synchronized succesfully!')
    }

    async disconnect() {
        await this.getSequelize().close()
    }
}
