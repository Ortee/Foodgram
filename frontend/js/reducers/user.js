function user(state = {
  login: null,
  rest_name: null,
  description: null,
  avatar: null,
  address: null,
}, action) {
  switch (action.type) {
  case 'GET_USER' :
    if (action.res === true) {
      return Object.assign({}, state, {
        'login': action.payload.login,
        'rest_name': action.payload.rest_name,
        'description': action.payload.description,
        'avatar': action.payload.avatar,
        'address': action.payload.address,
      });
    }
    return state;
  default:
    return state;
  }
}

export default user;
