'use strict'

export async function up(queryInterface, Sequelize) {
    await queryInterface.createTable('refreshTokens', {
        id: {
            type: Sequelize.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        token: {
            type: Sequelize.DataTypes.TEXT
        },
        createdAt: {
            type: Sequelize.DataTypes.DATE,
            allowNull: false
        },
        updatedAt: {
            type: Sequelize.DataTypes.DATE,
            allowNull: false
        },
        UserId: {
            type: Sequelize.DataTypes.INTEGER,
            references: {
                model: {
                    tableName: 'users'
                },
                key: 'id'
            },
            allowNull: false
        }
    })
}
export async function down(queryInterface, Sequelize) {
    await queryInterface.dropTable('refreshTokens')
}
