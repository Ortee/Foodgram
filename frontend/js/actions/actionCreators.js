import req from 'superagent';
import uuid from 'node-uuid';
import cookie from 'react-cookie';
import { browserHistory } from 'react-router';
import jwtDecode from 'jwt-decode';

export function showFoods() {
  const request = req
  .get('/api/foods')
  .accept('application/json');
  return (dispatch) => {
    request.then((response) => {
      dispatch({ type: 'SHOW_FOODS', payload: response.body });
    });
  };
}

export function addFood(username, description, hashtags, photo) {
  const request = req.post('/api/foods')
  .set('Content-type', 'application/json');
  const _uuid = uuid.v1();
  return (dispatch) => {
    request.send([{
      username: username, description: description, hashtags: hashtags, photo: photo, uuid: _uuid,
    }])
    .end((err, res) => {
      if (err || !res.ok) {
        dispatch(addAlert('Your food wasn`t added !', 'danger'));
        dispatch({ type: 'ADD_FOODS', res: false });
      } else {
        dispatch(addAlert('Your food was successfully added !', 'success'));
        dispatch({ type: 'ADD_FOODS', res: true, req: {
          'username': username, 'description': description, 'hashtags': hashtags, 'photo': photo, 'uuid': _uuid,
        }});
      }
    });
  };
}

export function removeFood(_uuid, indexInState) {
  const request = req.del('/api/foods')
  .set('Content-type', 'application/json');
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

export function incrementLike(_uuid, index) {
  const request = req.put('/api/foods/likes')
  .set('Content-type', 'application/json');
  return (dispatch) => {
    request.send([{ uuid: _uuid }])
    .end((err, res) => {
      if (err || !res.ok) {
        dispatch({ type: 'INCREMENT_LIKE', res: false});
      } else {
        cookie.save(_uuid, 'like');
        dispatch({ type: 'INCREMENT_LIKE', res: true, index: index});
      }
    });
  };
}

export function decrementLike(_uuid, index) {
  const request = req.put('/api/foods/likes/decrement')
  .set('Content-type', 'application/json');
  return (dispatch) => {
    request.send([{ uuid: _uuid }])
    .end((err, res) => {
      if (err || !res.ok) {
        dispatch({ type: 'DECREMENT_LIKE', res: false});
      } else {
        dispatch({ type: 'DECREMENT_LIKE', res: true, index: index});
      }
    });
  };
}

export function incrementDislike(_uuid, index) {
  const request = req.put('/api/foods/dislikes')
  .set('Content-type', 'application/json');
  return (dispatch) => {
    request.send([{ uuid: _uuid }])
    .end((err, res) => {
      if (err || !res.ok) {
        dispatch({ type: 'INCREMENT_DISLIKE', res: false});
      } else {
        cookie.save(_uuid, 'dislike');
        dispatch({ type: 'INCREMENT_DISLIKE', res: true, index: index});
      }
    });
  };
}

export function decrementDislike(_uuid, index) {
  const request = req.put('/api/foods/dislikes/decrement')
  .set('Content-type', 'application/json');
  return (dispatch) => {
    request.send([{ uuid: _uuid }])
    .end((err, res) => {
      if (err || !res.ok) {
        dispatch({ type: 'DECREMENT_DISLIKE', res: false});
      } else {
        dispatch({ type: 'DECREMENT_DISLIKE', res: true, index: index});
      }
    });
  };
}

export function register(_email, _username, _login, _password) {
  const request = req.post('/api/register')
  .set('Content-type', 'application/json');
  return (dispatch) => {
    request.send([{
      email: _email, username: _username, login: _login, password: _password,
    }])
    .end((err, res) => {
      if (err || !res.ok) {
        dispatch(addAlert('User wasn`t added !', 'danger'));
      } else {
        dispatch(addAlert('User was successfully added !', 'success'));
      }
    });
  };
}

export function login(_login, _password) {
  const request = req.post('/login')
  .set('Accept', 'application/json');
  return (dispatch) => {
    dispatch(loginUserRequest());
    request.type('form')
    .send({
      username: _login,
      password: _password,
    })
    .end((err, res) => {
      if (err || !res.ok) {
        dispatch(loginUserFailure(err));
        dispatch(addAlert('Incorrect login or password !', 'danger'));
      } else {
        dispatch(loginUserSuccess(JSON.parse(res.text).token));
        dispatch(addAlert('You are logged in !', 'success'));
      }
    });
  };
}

export function addAlert(text, style) {
  return (dispatch) => {
    dispatch({ type: 'ADD_ALERT', text: text, style: style });
  };
}

export function removeAlert(id) {
  return {
    type: 'REMOVE_ALERT',
    id,
  };
}

export function loginUserRequest() {
  return (dispatch) => {
    dispatch({ type: 'LOGIN_USER_REQUEST' });
  };
}

export function loginUserSuccess(token) {
  browserHistory.pushState(`/profile/${jwtDecode(token).rest_name.replace(' ', '').toLowerCase()}`);
  return (dispatch) => {
    dispatch({ type: 'LOGIN_USER_SUCCESS', payload: { token: token }});
  };
}

export function logout() {
  browserHistory.push('/');
  return (dispatch) => {
    dispatch({ type: 'LOGOUT_USER' });
  };
}

export function loginUserFailure(error) {
  return (dispatch) => {
    dispatch({ type: 'LOGIN_USER_FAILURE', payload: {
      status: error.response.status,
      statusText: error.response.statusText,
    },
    });
  };
}

export function getUser(_login) {
  const request = req
  .get('/api/restaurants/' + _login)
  .accept('application/json');
  return (dispatch) => {
    request.then((response) => {
      dispatch({ type: 'GET_USER', payload: response.body });
    });
  };
}
