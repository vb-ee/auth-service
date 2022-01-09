export class Database {
    constructor(environment, dbConfig) {
        this.environment = environment
        this.dbConfig = dbConfig
        this.isTestEnv = this.environment === 'test'
    }

    getConfig() {
        return this.dbConfig[this.environment]
    }

    async connect(connection) {
        await connection.authenticate()

        if (!this.isTestEnv)
            console.log('Successfully connected to the database')

        await connection.sync({
            force: this.isTestEnv,
            logging: false,
        })

        if (!this.isTestEnv) console.log('Models synchronized succesfully!')
    }

    async disconnect(connection) {
        await connection.close()
    }
}
