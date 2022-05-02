'use strict'

export async function up(queryInterface, Sequelize) {
    await queryInterface.createTable('roles', {
        id: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        role: {
            type: Sequelize.DataTypes.STRING
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
    await queryInterface.dropTable('roles')
}
