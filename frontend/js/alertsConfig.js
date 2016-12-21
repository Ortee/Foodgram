module.exports = {
  serverText: {
    offline: 'Sorry, offline server !',
    problem: 'Sorry, server problem !',
  },
  userText: {
    added: 'User was successfully added !',
    logIn: 'You are logged in !',
    logout: 'LOGOUT !',
    incorrect: 'Incorrect login or password !',
    passwordChanged: 'Password successfully changed',
  },
  addFoodText: {
    successAdd: 'Your food was successfully added !',
    failRemove: 'Your food wasn`t removed !',
    successRemove: 'Your food was successfully removed !',
    description: {
      length: 'Description is too short or too long (min: 2, max: 250 letters).',
      ascii: 'Description can contain only letters and numbers.',
    },
    hashtags: {
      length: 'Hashtahs is too short (min: 2, max: 250 letters).',
      ascii: 'Hashtahs can contain only letters and numbers.',
      invalid: 'Invalid hashtags!',
    },
    photo: {
      extension: 'Wrong File Extension.',
      large: 'Photo is too large.',
      loaded: 'Photo loaded correctly.',
      invalid: 'Invalid photo!',
    },
  },
  changePasswordText: {
    empty: 'Some of the fields are empty',
    short: 'New password is too short (min: 5 letters).',
    different: 'New passwords are different.',
  },
  loginText: {
    login: {
      ascii: 'Login can contain only letters and numbers.',
      enter: 'Enter your login!',
    },
    password: {
      ascii: 'Password can contain only letters and numbers.',
      enter: 'Enter your password!',
    },
  },
  registerText: {
    empty: 'Some of the fields are empty',
    matchPassword: 'The two passwords do not match!',
    username: {
      length: 'Username is too short (min: 5 letters).',
      ascii: 'Invalid input type (username)',
    },
    login: {
      length: 'Login is too short (min: 5 letters).',
      ascii: 'Login can contain only letters and numbers.',
    },
    password: {
      length: 'Password is too short (min: 5 letters).',
      ascii: 'Password can contain only letters and numbers.',
    },
  },
  updateRestaurantText: {
    empty: 'All of the fields are empty.',
    ascii: 'Invalid input type.',
    success: 'Profile successfully edited.',
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
      extension: 'Wrong File Extension.',
      large: 'Avatar is too large.',
      loaded: 'Avatar loaded correctly.',
      invalid: 'Invalid avatar!',
    },
  },
};
