import req from 'superagent';
import { addAlert } from './alertActions';

export function updateRestName(login, restName) {
  const request = req.put('/api/restaurants/rest_name')
  .set('Content-type', 'application/json');
  return (dispatch) => {
    request.send([{
      login: login,
      rest_name: restName,
    }])
    .end((err, res) => {
      if (err || !res.ok) {
        dispatch(addAlert('Error!', 'danger'));
      } else {
        dispatch(editRestName(restName));
        dispatch(addAlert('Successd !', 'success'));
      }
    });
  };
}

export function updateDescription(login, description) {
  const request = req.put('/api/restaurants/description')
  .set('Content-type', 'application/json');
  return (dispatch) => {
    request.send([{
      login: login,
      description,
    }])
    .end((err, res) => {
      if (err || !res.ok) {
        dispatch(addAlert('Error!', 'danger'));
      } else {
        dispatch(editDescription(description));
        dispatch(addAlert('Successd !', 'success'));
      }
    });
  };
}

export function updateAddress(login, address) {
  const request = req.put('/api/restaurants/address')
  .set('Content-type', 'application/json');
  return (dispatch) => {
    request.send([{
      login: login,
      address,
    }])
    .end((err, res) => {
      if (err || !res.ok) {
        dispatch(addAlert('Error!', 'danger'));
      } else {
        dispatch(editAddress(address));
        dispatch(addAlert('Successd !', 'success'));
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
