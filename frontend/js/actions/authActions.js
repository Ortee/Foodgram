import jwtDecode from 'jwt-decode';
import { browserHistory } from 'react-router';
import req from 'superagent';
import { addAlert } from './alertActions';
import cookie from 'react-cookie';
import config from '../config';

export function register(_username, _login, _password) {
  const request = req.post(config.url + '/api/register')
  .set('Content-type', 'application/json');
  return (dispatch) => {
    request.send([{
      username: _username, login: _login, password: _password,
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
  const request = req.post(config.url + '/api/login')
  .set('Accept', 'application/json');
  return (dispatch) => {
    dispatch(loginUserRequest());
    request.type('form')
    .send({
      username: _login,
      password: _password,
    })
    .end((err, res) => {
      if (res.status > 500) {
        dispatch(loginUserFailure(err));
        dispatch(addAlert('Sorry, offline server !', 'danger'));
      } else if (res.status === 404) {
        dispatch(loginUserFailure(err));
        dispatch(addAlert('Sorry, server problem !', 'danger'));
      } else if (res.status === 400) {
        dispatch(loginUserFailure(err));
        dispatch(addAlert('Incorrect login or password !', 'danger'));
      } else if (err || !res.ok) {
        dispatch(loginUserFailure(err));
        dispatch(addAlert('Sorry, server problem !', 'danger'));
      } else if (res.status === 200) {
        dispatch(loginUserSuccess(JSON.parse(res.text).token));
        dispatch(addAlert('You are logged in !', 'success'));
      }
    });
  };
}

export function loginUserRequest() {
  return (dispatch) => {
    dispatch({ type: 'LOGIN_USER_REQUEST' });
  };
}

export function loginUserSuccess(token) {
  browserHistory.pushState(`/profile/${jwtDecode(token).rest_name.replace(' ', '').toLowerCase()}`);
  cookie.save('token', token);
  return (dispatch) => {
    dispatch({ type: 'LOGIN_USER_SUCCESS', payload: { token: token }});
  };
}

export function logout() {
  cookie.remove('token');
  browserHistory.push('/');
  return (dispatch) => {
    dispatch(addAlert('LOGOUT !', 'success'));
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
  .get(config.url + '/api/restaurants/' + _login)
  .accept('application/json');
  return (dispatch) => {
    request.then((response) => {
      dispatch({ type: 'GET_USER', payload: response.body });
    });
  };
}
