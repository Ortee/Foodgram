'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Food', [
      {
        restaurant_id: 1,
        uuid: 'dfa3fa30-9b83-11e6-84da-212055eb89db',
        description: 'Very good',
        hashtags: '#awesome #good',
        likes: 3,
        dislikes: 5,
        created_at: '2016-10-15T20:31:40.000Z',
        updated_at: '2016-10-15T20:31:40.000Z'
      },
      {
        restaurant_id: 1,
        uuid: 'efa3fa30-9b83-11e6-84da-212055eb89db',
        description: 'Very nice',
        hashtags: '#tasty #love',
        likes: 8,
        dislikes: 3,
        created_at: '2016-10-16T20:31:40.000Z',
        updated_at: '2016-10-16T20:31:40.000Z'
      },
      {
        restaurant_id: 1,
        uuid: 'ffa3fa30-9b83-11e6-84da-212055eb89db',
        description: 'Nice',
        hashtags: '#love',
        likes: 10,
        dislikes: 13,
        created_at: '2016-10-17T20:31:40.000Z',
        updated_at: '2016-10-17T20:31:40.000Z'
      },
      {
        restaurant_id: 1,
        uuid: 'cfa3fa30-9b83-11e6-84da-212055eb89db',
        description: 'Very tasty',
        hashtags: '#awesome #burger #tasty #love',
        likes: 83,
        dislikes: 13,
        created_at: '2016-10-14T20:31:40.000Z',
        updated_at: '2016-10-14T20:31:40.000Z'
      },
      {
        restaurant_id: 2,
        uuid: 'x7dafa30-9b83-11e6-84da-212055eb89db',
        description: 'Very tasty',
        hashtags: '#nice #burger #tasty #love #secondburger',
        likes: 53,
        dislikes: 23,
        created_at: '2010-10-14T20:31:40.000Z',
        updated_at: '2010-10-14T20:31:40.000Z'
      }
    ], {});
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Food', null, {});
  }
};
