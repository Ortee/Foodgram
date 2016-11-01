'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Restaurant', [
      {
        rest_name: 'Pastwisko',
        address: 'Jaroczyńskiego 22, Poznan',
        login: 'pastwisko',
        password: 'pastwisko',
        avatar: 'pastwisko.jpg',
        description: 'super opis pastwiska',
        created_at: '2016-10-14T20:31:40.000Z',
        updated_at: '2016-10-14T20:31:40.000Z'
      },
      {
        rest_name: 'Fat Bob Burger',
        address: 'Kramarska 21, Poznan',
        login: 'fatbob',
        password: 'fatbob',
        avatar: 'fatbob.jpg',
        description: 'super opis fat boba',
        created_at: '2016-10-14T20:31:40.000Z',
        updated_at: '2016-10-14T20:31:40.000Z'
      }
    ], {});
  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Restaurants', null, {});
  }
};


