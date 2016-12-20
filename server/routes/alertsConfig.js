module.exports = {
  register: {
    match: 'The two passwords do not match!',
    empty: 'Some of the fields are empty',
    use: 'Login already in use',
    username: {
      length: 'Username is too short (min: 5 letters).',
      ascii: 'Username can contain only letters and numbers.',
      forbidden: 'Username contains forbidden characters.',
    },
    login: {
      length: 'Login is too short (min: 5 letters).',
      ascii: 'Login can contain only letters and numbers.',
      forbidden: 'Login contains forbidden characters.',
    },
    password: {
      length: 'Password is too short (min: 5 letters).',
      ascii: 'Password can contain only letters and numbers.',
    }
  },
  changePassword: {
    match: 'Old password doesnt match',
    different: 'New passwords are different.',
    length: 'New password is too short (min: 5 letters).',
    empty: 'Some of the fields are empty',
  },
  addFood: {
    description: {
      length: 'Description is too short or too long (min: 2, max: 250 letters).',
      ascii: 'Description can contain only letters and numbers.',
    },
    hashtags: {
      length: 'Hashtags is too short (min: 2, max: 250 letters).',
      ascii: 'Hashtags can contain only letters and numbers.',
      valid: 'Hashtags should be separated by space',
    },
    photo: {
      extension: 'Wrong File Extension',
      size: 'Photo is too large!',
    },
  },
  updateRestaurant: {
    ascii: 'Invalid input type.',
    rest_name: {
      length: 'Restaurant length is invalid (5-25 letters)',
    },
    address: {
      length: 'Address length is invalid (5-100 letters)',
    },
    description: {
      length: 'Description length is invalid (5-200 letters)',
    },
    avatar: {
      extension: 'Wrong File Extension',
      size: 'Avatar is too large!',
    },
  }
};
