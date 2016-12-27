import req from 'superagent';
import { addAlert } from './alertActions';
import { serverText, userText, updateRestaurantText } from '../alertsConfig';
import config from '../config';

export function update(login, data, token) {
  const request = req.put(config.url + '/api/restaurants/update')
  .set('Content-type', 'application/json')
  .set('Authorization', 'Bearer ' + token);
  return (dispatch) => {
    request.send([{
      login: login,
      rest_name: data.restName,
      address: data.address,
      description: data.description,
      avatar: data.avatar,
    }])
    .end((err, res) => {
      if (res.status > 500) {
        dispatch(addAlert(serverText.offline, 'danger'));
      } else if (res.status === 404) {
        dispatch(addAlert(serverText.problem, 'danger'));
      } else if (res.status === 413) {
        dispatch(addAlert(updateRestaurantText.avatar.size, 'danger'));
      } else if (res.status === 400) {
        dispatch(addAlert(res.text, 'danger'));
      } else if (err || !res.ok) {
        dispatch(addAlert(serverText.problem, 'danger'));
      } else {
        if (data.restName !== null) dispatch(editRestName(data.restName));
        if (data.address !== null) dispatch(editAddress(data.address));
        if (data.avatar !== null) dispatch(editAvatar(config.url + '/api/images/avatar/' + login + '.png'));
        if (data.description !== null) dispatch(editDescription(data.description));
        dispatch(addAlert(updateRestaurantText.success, 'success'));
      }
    });
  };
}

export function updatePassword(login, data, token) {
  const request = req.put(config.url + '/api/restaurants/password')
  .set('Content-type', 'application/json')
  .set('Authorization', 'Bearer ' + token);
  return (dispatch) => {
    request.send([{
      login: login,
      newPassword: data.newPassword,
      newPassword2: data.newPassword2,
      oldPassword: data.oldPassword,
    }])
    .end((err, res) => {
      if (res.status > 500) {
        dispatch(addAlert(serverText.offline, 'danger'));
      } else if (res.status === 404) {
        dispatch(addAlert(serverText.problem, 'danger'));
      } else if (res.status === 400) {
        dispatch(addAlert(res.text, 'danger'));
      } else if (err || !res.ok) {
        dispatch(addAlert(serverText.problem, 'danger'));
      } else if (res.status === 200) {
        dispatch(addAlert(userText.passwordChanged, 'success'));
      }
    });
  };
}

function editRestName(restName) {
  return (dispatch) => {
    dispatch({
      type: 'EDIT_RESTNAME', payload: { rest_name: restName },
    });
  };
}

function editDescription(description) {
  return (dispatch) => {
    dispatch({
      type: 'EDIT_DESCRIPTION', payload: { description },
    });
  };
}

function editAddress(address) {
  return (dispatch) => {
    dispatch({
      type: 'EDIT_ADDRESS', payload: { address },
    });
  };
}

function editAvatar(avatar) {
  return (dispatch) => {
    dispatch({
      type: 'EDIT_AVATAR', payload: { avatar },
    });
  };
}
