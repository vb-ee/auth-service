import { Database } from './database'
import { config } from '../config/config'

const { node_env } = config.environment

export const db = new Database(node_env, config)
export const testDb = new Database('test', config)

export const sequelize = db.getSequelize()
export const testSequelize = testDb.getSequelize()
