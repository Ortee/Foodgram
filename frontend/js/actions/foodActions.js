import req from 'superagent';
import uuid from 'uuid';
import config from '../config';
import { browserHistory } from 'react-router';
import { addAlert } from './alertActions';

export function showFoods() {
  const request = req
  .get(config.url + '/api/foods')
  .accept('application/json');
  return (dispatch) => {
    request.then((response) => {
      dispatch({ type: 'SHOW_FOODS', payload: response.body });
    });
  };
}

export function updateLikes() {
  const request = req
  .get(config.url + '/api/foods/likes/update')
  .accept('application/json');
  return (dispatch) => {
    request.then((response) => {
      dispatch({ type: 'UPDATE_LIKES', payload: response.body });
    });
  };
}

export function getSingleFood(_uuid) {
  const request = req
  .get(config.url + '/api/foods/' + _uuid)
  .accept('application/json');
  return (dispatch) => {
    request.then((response) => {
      dispatch({ type: 'SHOW_FOODS', payload: response.body });
    });
  };
}

export function addFood(_login, _username, food, token) {
  const request = req.post(config.url + '/api/foods')
  .set('Content-type', 'application/json')
  .set('Authorization', 'Bearer ' + token);
  const _uuid = uuid.v1();
  return (dispatch) => {
    request.send([{
      login: _login,
      description: food.description,
      hashtags: food.hashTags,
      photo: food.image,
      uuid: _uuid,
    }])
    .end((err, res) => {
      if (err || !res.ok) {
        dispatch(addAlert('Your food wasn`t added !', 'danger'));
        dispatch({ type: 'ADD_FOODS', res: false });
      } else {
        dispatch(addAlert('Your food was successfully added !', 'success'));
        dispatch({ type: 'ADD_FOODS', res: true, req: {
          'description': food.description,
          'hashtags': food.hashTags,
          'photo': food.image,
          'uuid': _uuid,
          'login': _login,
          'username': _username,
        }});
        browserHistory.push('/profile/' + _login);
      }
    });
  };
}

export function removeFood(_uuid, indexInState, token) {
  const request = req.del(config.url + '/api/foods')
  .set('Content-type', 'application/json')
  .set('Authorization', 'Bearer ' + token);
  return (dispatch) => {
    request.send([{ uuid: _uuid }])
    .end((err, res) => {
      if (err || !res.ok) {
        dispatch({ type: 'REMOVE_FOODS', res: false });
        dispatch(addAlert('Your food wasn`t removed !', 'danger'));
      } else {
        dispatch(addAlert('Your food was successfully removed !', 'success'));
        dispatch({ type: 'REMOVE_FOODS', res: true, req: { 'uuid': uuid, 'indexInState': indexInState}});
      }
    });
  };
}
