function foods(state = [], action) {
  switch(action.type) {
      case 'ADD_FOODS' :
        if(action.res === true){
          return [...state,{
            username: action.req.username,
            description: action.req.description,
            hashtags: action.req.hashtags,
            photo: action.req.photo,
            likes: 0,
            dislikes: 0
          }];
        }
        return state;
      case 'SHOW_FOODS' :
        return action.payload;
      case 'REMOVE_FOOD' :
        if(action.res === true){
          return [
            ...state.slice(0,action.req.indexInState),
            ...state.slice(action.req.indexInState + 1)
          ]
        }
        return state;
      default:
        return state;
    }
}

export default foods;
