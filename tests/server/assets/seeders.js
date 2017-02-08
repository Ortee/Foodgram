const images = require('./images');
const uuid = require('node-uuid');
const foodUuid = uuid.v1();
const imagestoreUuid = uuid.v1();

module.exports = {
  // Food Seeders
  foodSeeder :
    {
      uuid: foodUuid,
      description: 'Chai testing burger (tmp)',
      hashtags: '#chai #test #tmp',
      photo: images.foodImage
    },
  // Imagestore Seeders
  foodImageSeeder : {
    type: 'food',
    name: imagestoreUuid,
    photo: images.foodImage
  },
  avatarSeeder : {
    type: 'avatar',
    name: 'avatar-test',
    photo: images.avatarImage
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
