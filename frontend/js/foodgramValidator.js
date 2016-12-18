module.exports = {
  isHashTag: (string) => {
    if (new RegExp(/^(#[a-zA-Z0-9]+)(\s#[a-zA-Z0-9]+)*$/).test(string)) {
      return true;
    }
    return false;
  },

  isPhoto: (string) => {
    if (new RegExp(/^data:image.(jpeg|jpg|png);base64/).test(string)) {
      return true;
    }
    return false;
  },

  checkPhotoSize: (base64) => {
    if (Buffer.byteLength(base64, 'utf8') < 2097152) {
      return true;
    }
    return false;
  },
};
