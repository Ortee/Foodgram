'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Restaurant', [
      {
        rest_name: 'Pastwisko',
        address: 'Jaroczyńskiego 22, Poznan',
        login: 'pastwisko',
        password: 'pastwisko',
        avatar: false,
        description: 'super opis pastwiska',
      },
      {
        rest_name: 'Fat Bob Burger',
        address: 'Kramarska 21, Poznan',
        login: 'fatbob',
        password: 'fatbob',
        avatar: false,
        description: 'super opis fat boba'
      }
    ], {});
  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Restaurant', null, {});
  }
};
