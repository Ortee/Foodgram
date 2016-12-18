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
};
