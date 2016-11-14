import jwtDecode from 'jwt-decode';

function auth(
  state = {
    token: null,
    login: null,
    isAuthenticated: false,
    isAuthenticating: false,
    statusText: null,
  }, action) {
  switch (action.type) {
  case 'LOGIN_USER_REQUEST':
    return Object.assign({}, state, {
      'isAuthenticating': true,
      'statusText': null,
    });
  case 'LOGIN_USER_SUCCESS':
    return Object.assign({}, state, {
      'isAuthenticating': false,
      'isAuthenticated': true,
      'token': action.payload.token,
      'rest_name': jwtDecode(action.payload.token).rest_name,
      'statusText': 'You have been successfully logged in.',
    });
  case 'LOGIN_USER_FAILURE':
    return Object.assign({}, state, {
      'isAuthenticating': false,
      'isAuthenticated': false,
      'token': null,
      'login': null,
      'statusText': `Authentication Error: ${action.payload.status} ${action.payload.statusText}`,
    });
  case 'LOGOUT_USER':
    return Object.assign({}, state, {
      'isAuthenticated': false,
      'token': null,
      'login': null,
      'statusText': 'You have been successfully logged out.',
    });
  default:
    return state;
  }
}

export default auth;
