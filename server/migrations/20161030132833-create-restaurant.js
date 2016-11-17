'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Restaurant', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      rest_name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false
      },
      login: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      avatar: {
        type: Sequelize.STRING,
        default: 'test.jpg'
      },
      description: {
        type: Sequelize.TEXT
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Restaurant');
  }
};
