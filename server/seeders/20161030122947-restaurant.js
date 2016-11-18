'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Restaurant', [
      {
        rest_name: 'Pastwisko',
        address: 'Jaroczyńskiego 22, Poznan',
        login: 'pastwisko',
        password: 'pastwisko',
        avatar: 'http://images.franchising.pl/5de/48d/bb-logo.png',
        description: 'super opis pastwiska',
      },
      {
        rest_name: 'Fat Bob Burger',
        address: 'Kramarska 21, Poznan',
        login: 'fatbob',
        password: 'fatbob',
        avatar: 'https://s-media-cache-ak0.pinimg.com/736x/0c/a1/a9/0ca1a9e8436a2d50f669825487217b40.jpg',
        description: 'super opis fat boba'
      }
    ], {});
  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Restaurant', null, {});
  }
};
