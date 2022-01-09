import { Sequelize } from 'sequelize'
import { Database } from './database'
import { config } from '../config/config'

const { node_env } = config.environment

export const db = new Database(node_env, config)
const { username, password, host, port, database, dialect } = db.getConfig()

export const sequelize = new Sequelize(database, username, password, {
    host: host,
    dialect: dialect,
    port: port,
    logging: node_env === 'test' ? false : console.log,
})
