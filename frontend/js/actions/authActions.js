import jwtDecode from 'jwt-decode';
import { browserHistory } from 'react-router';
import req from 'superagent';
import { addAlert } from './alertActions';
import cookie from 'react-cookie';
import config from '../config';
import { serverText, userText } from '../alertsConfig';

export function register(_username, _login, _password, _passwordTwo) {
  const request = req.post(config.url + '/api/register')
  .set('Content-type', 'application/json');
  return (dispatch) => {
    request.send([{
      username: _username, login: _login, passwordOne: _password, passwordTwo: _passwordTwo,
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
        dispatch(addAlert(userText.added, 'success'));
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
        dispatch(addAlert(serverText.offline, 'danger'));
      } else if (res.status === 404) {
        dispatch(loginUserFailure(err));
        dispatch(addAlert(serverText.problem, 'danger'));
      } else if (res.status === 400) {
        dispatch(loginUserFailure(err));
        dispatch(addAlert(userText.incorrect, 'danger'));
      } else if (err || !res.ok) {
        dispatch(loginUserFailure(err));
        dispatch(addAlert(serverText.problem, 'danger'));
      } else if (res.status === 200) {
        dispatch(loginUserSuccess(JSON.parse(res.text).token));
        dispatch(addAlert(userText.logIn, 'success'));
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
    dispatch(addAlert(userText.logout, 'success'));
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
