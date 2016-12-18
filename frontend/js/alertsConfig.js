module.exports = {
  addFoodText: {
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
      ascii: 'Username can contain only letters and numbers.',
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
};
