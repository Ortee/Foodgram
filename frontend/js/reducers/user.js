function user(state = {
  login: null,
  rest_name: null,
  description: null,
  avatar: null,
  address: null,
  foods: [],
}, action) {
  switch (action.type) {
  case 'GET_USER' :
    return Object.assign({}, state, {
      'login': action.payload.login,
      'rest_name': action.payload.rest_name,
      'description': action.payload.description,
      'avatar': action.payload.avatar,
      'address': action.payload.address,
      'foods': action.payload.foods,
    });
  default:
    return state;
  }
}

export default user;
