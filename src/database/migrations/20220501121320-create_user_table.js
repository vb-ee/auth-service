'use strict'

export async function up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
        await queryInterface.createTable(
            'users',
            {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.DataTypes.INTEGER
                },
                email: {
                    type: Sequelize.DataTypes.STRING,
                    allowNull: false,
                    unique: true
                },
                password: {
                    type: Sequelize.DataTypes.STRING,
                    allowNull: false
                },
                username: {
                    type: Sequelize.DataTypes.STRING(50),
                    unique: true
                },
                firstname: {
                    type: Sequelize.DataTypes.STRING(70)
                },
                lastname: {
                    type: Sequelize.DataTypes.STRING(70)
                },
                createdAt: {
                    type: Sequelize.DataTypes.DATE,
                    allowNull: false
                },
                updatedAt: {
                    type: Sequelize.DataTypes.DATE,
                    allowNull: false
                }
            },
            { transaction }
        )
        await transaction.commit()
    } catch (error) {
        await transaction.rollback()
        throw error
    }
}
export async function down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users')
}
