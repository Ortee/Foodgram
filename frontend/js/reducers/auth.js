import jwtDecode from 'jwt-decode';

function auth(
  state = {
    token: null,
    login: null,
    rest_name: null,
    description: null,
    avatar: null,
    address: null,
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
    const token = jwtDecode(action.payload.token);
    return Object.assign({}, state, {
      'isAuthenticating': false,
      'isAuthenticated': true,
      'token': action.payload.token,
      'login': token.login,
      'rest_name': token.rest_name,
      'description': token.description,
      'avatar': token.avatar,
      'address': token.address,
      'statusText': 'You have been successfully logged in.',
    });
  case 'LOGIN_USER_FAILURE':
    return Object.assign({}, state, {
      'isAuthenticating': false,
      'isAuthenticated': false,
      'token': null,
      'login': null,
      'rest_name': null,
      'description': null,
      'avatar': null,
      'address': null,
      'statusText': `Authentication Error: ${action.payload.status} ${action.payload.statusText}`,
    });
  case 'LOGOUT_USER':
    return Object.assign({}, state, {
      'isAuthenticated': false,
      'token': null,
      'login': null,
      'rest_name': null,
      'description': null,
      'avatar': null,
      'address': null,
      'statusText': 'You have been successfully logged out.',
    });
  default:
    return state;
  }
}

export default auth;
