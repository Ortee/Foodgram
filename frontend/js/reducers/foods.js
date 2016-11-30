function foods(state = [], action) {
  switch (action.type) {
  case 'ADD_FOODS' :
    if (action.res === true) {
      return [...state, {
        username: action.req.username,
        login: action.req.login,
        description: action.req.description,
        hashtags: action.req.hashtags,
        photo: action.req.photo,
        likes: 0,
        dislikes: 0,
        uuid: action.req.uuid,
      }];
    }
    return state;
  case 'SHOW_FOODS' :
    return action.payload;
  case 'UPDATE_LIKES' :
    let newArr = [];
    state.map( stateObject => {
      action.payload.map( payloadObject => {
        if (payloadObject.id === stateObject.id) {
          newArr.push(Object.assign({}, stateObject, payloadObject));
        }
      });
    });
    return newArr;
  case 'REMOVE_FOODS' :
    if (action.res === true) {
      return [
        ...state.slice(0, action.req.indexInState),
        ...state.slice(action.req.indexInState + 1),
      ];
    }
    return state;
  case 'INCREMENT_LIKE' :
    return [
      ...state.slice(0, action.index),
      {...state[action.index], likes: state[action.index].likes + 1},
      ...state.slice(action.index + 1),
    ];
  case 'DECREMENT_LIKE' :
    return [
      ...state.slice(0, action.index),
      {...state[action.index], likes: state[action.index].likes - 1},
      ...state.slice(action.index + 1),
    ];
  case 'INCREMENT_DISLIKE' :
    return [
      ...state.slice(0, action.index),
      {...state[action.index], dislikes: state[action.index].dislikes + 1},
      ...state.slice(action.index + 1),
    ];
  case 'DECREMENT_DISLIKE' :
    return [
      ...state.slice(0, action.index),
      {...state[action.index], dislikes: state[action.index].dislikes - 1},
      ...state.slice(action.index + 1),
    ];
  default:
    return state;
  }
}

export default foods;
