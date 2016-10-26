'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
      return queryInterface.bulkInsert('Food', [
        {
          username: 'AwesomeBurgers',
          description:'Very tasty',
          hashtags:'#awesome #burger #tasty #love',
          photo:'http://dfep0xlbws1ys.cloudfront.net/thumbs2d/dd/2ddd2a4753463c2f396777f0c85502e2.jpg',
          likes:83,
          dislikes:13,
          created_at:'2016-10-14T20:31:40.000Z',
          updated_at:'2016-10-14T20:31:40.000Z'
        },
        {
          username: 'NiceBurgers',
          description:'Very tasty',
          hashtags:'#nice #burger #tasty #love',
          photo:'http://dfep0xlbws1ys.cloudfront.net/thumbs2d/dd/2ddd2a4753463c2f396777f0c85502e2.jpg',
          likes:53,
          dislikes:23,
          created_at:'2016-10-14T20:31:40.000Z',
          updated_at:'2016-10-14T20:31:40.000Z'
        }
    ], {});
  },
  down: function (queryInterface, Sequelize) {
      return queryInterface.bulkDelete('Food', null, {});
  }
};
