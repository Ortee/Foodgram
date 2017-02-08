const images = require('./images');
const uuid = require('node-uuid');
let _uuid = uuid.v1();

module.exports = {
  // Food Seeders
  foodSeeder :
    {
      login: 'fatbob',
      uuid: _uuid,
      description: 'Chai testing burger (tmp)',
      hashtags: '#chai #test #tmp',
      photo: images.foodImage
    },
  // Restaurant Seeders
  restaurantSeeder :
    {
      username: 'Test 1',
      login: 'test1',
      passwordOne: 'test1',
      passwordTwo: 'test1'
    },
  updateRestaurantSeeder :
    {
      login: 'test1',
      rest_name: 'Test One',
      address: 'Test address',
      description: 'Test description',
      avatar: images.avatarImage
    },
  changePasswordSeeder :
    {
      login: 'test1',
      oldPassword: 'test1',
      newPassword: 'test2',
      newPassword2: 'test2'
    },
  restaurantToken : ''
}
