const images = require('./images');

module.exports = {
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
