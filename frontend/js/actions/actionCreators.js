import req from 'superagent';
import uuid from 'node-uuid';

export function showFoods() {
  const request = req
  .get('/api/foods')
  .accept('application/json');
  return (dispatch) => {
    request.then((response) => {
      dispatch({ type: 'SHOW_FOODS', payload: response.body });
    });
  }
};

export function addFood(username, description, hashtags, photo) {
  const request = req.post('/api/foods')
   .set('Content-type', 'application/json');
   let _uuid = uuid.v1();
   return (dispatch) => {
     request.send([{
       username: username, description: description, hashtags: hashtags, photo:photo, uuid:_uuid
     }])
      .end(function(err, res){
         if (err || !res.ok) {
           dispatch(addAlert('Your food wasn`t added !', 'danger'));
           dispatch({ type: 'ADD_FOODS', res: false });
         } else {
           dispatch(addAlert('Your food was successfully added !', 'success'));
           dispatch({ type: 'ADD_FOODS', res: true, req:{
             'username':username, 'description': description,'hashtags':hashtags,'photo':photo, 'uuid':_uuid
           }});
         }
     });
  }
}

export function removeFood(uuid, indexInState) {
  const request = req.del('/api/foods')
   .set('Content-type', 'application/json');
   return (dispatch) => {
     request.send([{ uuid: uuid }])
      .end(function(err, res){
         if (err || !res.ok) {
           dispatch({ type: 'REMOVE_FOODS', res: false });
           dispatch(addAlert('Your food wasn`t removed !', 'danger'));
         } else {
           dispatch(addAlert('Your food was successfully removed !', 'success'));
           dispatch({ type: 'REMOVE_FOODS', res: true, req:{ 'uuid':uuid, 'indexInState': indexInState}});
         }
     });
   }
}

export function incrementLike(index) {
  return (dispatch) => {
    dispatch({ type: 'INCREMENT_LIKE', index: index});
  }
};

export function incrementDislike(index) {
  return (dispatch) => {
    dispatch({ type: 'INCREMENT_DISLIKE', index: index});
  }
};

export function addAlert(text, style) {
  return (dispatch) => {
    dispatch({ type: 'ADD_ALERT', text: text, style: style });
  }
};

export function removeAlert(id){
  return {
    type: 'REMOVE_ALERT',
    id
  };
};
