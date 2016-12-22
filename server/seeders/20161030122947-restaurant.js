'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Restaurant', [
      {
        rest_name: 'Pastwisko',
        address: 'Jaroczyńskiego 22, Poznan',
        login: 'pastwisko',
        password: '$2a$10$Q3eye/etGK0G/OcqhKmFo.hdzsjiAaVPgCaYT82k/1NlcAqc8f7SO',
        avatar: false,
        description: 'super opis pastwiska',
      },
      {
        rest_name: 'Fat Bob Burger',
        address: 'Kramarska 21, Poznan',
        login: 'fatbob',
        password: '$2a$10$FOk46QdElNrJVAM6Z6phc.NRHsw8i5/aU.A2vS0rk4g52Nl.G58iW',
        avatar: false,
        description: 'super opis fat boba'
      }
    ], {});
  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Restaurant', null, {});
  }
};
