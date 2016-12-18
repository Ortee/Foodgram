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
    },
    hashtags: {
      length: 'Hashtahs is too short (min: 2, max: 250 letters).',
    },
  }
};
