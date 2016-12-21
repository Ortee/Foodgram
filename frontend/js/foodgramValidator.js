import { addFoodText } from './alertsConfig';
import validator from 'validator';

class FoodgramValidator {
  isHashTag(string) {
    if (new RegExp(/^(#[a-zA-Z0-9]+)(\s#[a-zA-Z0-9]+)*$/).test(string)) {
      return true;
    }
    return false;
  }

  isPhoto(string) {
    if (new RegExp(/^data:image.(jpeg|jpg|png);base64/).test(string)) {
      return true;
    }
    return false;
  }

  checkPhotoSize(base64) {
    if (Buffer.byteLength(base64, 'utf8') < 2097152) {
      return true;
    }
    return false;
  }

  addFood(image, description, hashTags, addAlert) {
    return new Promise(
      (resolve, reject) => {
        if (image === null) {
          addAlert(addFoodText.photo.invalid, 'danger');
        } else {
          if (this.isHashTag(hashTags)) {
            if (!validator.isLength(description, {min: 2, max: 250})) {
              addAlert(addFoodText.description.length, 'danger');
            } else if (!validator.isLength(hashTags, {min: 2, max: 250})) {
              addAlert(addFoodText.hashtags.length, 'danger');
            } else if (!validator.isAscii(hashTags)) {
              addAlert(addFoodText.hashtags.ascii, 'danger');
            } else if (!validator.isAscii(description)) {
              addAlert(addFoodText.description.ascii, 'danger');
            } else {
              resolve(true);
            }
          } else {
            addAlert(addFoodText.hashtags.invalid, 'danger');
          }
        }
        reject(false);
      }
    );
  }
}

export default new FoodgramValidator();
