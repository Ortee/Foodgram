import req from 'superagent';
import store from 'store';
import config from '../config';

export function incrementLike(_uuid, index) {
  const request = req.put(config.url + '/api/foods/likes')
  .set('Content-type', 'application/json');
  return (dispatch) => {
    request.send([{ uuid: _uuid }])
    .end((err, res) => {
      if (err || !res.ok) {
        dispatch({ type: 'INCREMENT_LIKE', res: false});
      } else {
        store.set(_uuid, 'like');
        dispatch({ type: 'INCREMENT_LIKE', res: true, index: index});
      }
    });
  };
}

export function decrementLike(_uuid, index) {
  const request = req.put(config.url + '/api/foods/likes/decrement')
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
  const request = req.put(config.url + '/api/foods/dislikes')
  .set('Content-type', 'application/json');
  return (dispatch) => {
    request.send([{ uuid: _uuid }])
    .end((err, res) => {
      if (err || !res.ok) {
        dispatch({ type: 'INCREMENT_DISLIKE', res: false});
      } else {
        store.set(_uuid, 'dislike');
        dispatch({ type: 'INCREMENT_DISLIKE', res: true, index: index});
      }
    });
  };
}

export function decrementDislike(_uuid, index) {
  const request = req.put(config.url + '/api/foods/dislikes/decrement')
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
