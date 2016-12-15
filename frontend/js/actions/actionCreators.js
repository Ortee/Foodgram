import { showFoods, updateLikes, getSingleFood, addFood, removeFood } from './foodActions';
import { register, login, loginUserRequest, loginUserSuccess, logout, loginUserFailure, getUser} from './authActions';
import { incrementLike, decrementLike, incrementDislike, decrementDislike } from './likeActions';
import { addAlert, removeAlert } from './alertActions';
import { update, updatePassword } from './accountActions';

export {
  showFoods,
  updateLikes,
  getSingleFood,
  addFood,
  register,
  removeFood,
  login,
  loginUserRequest,
  loginUserSuccess,
  logout,
  loginUserFailure,
  getUser,
  incrementLike,
  decrementLike,
  incrementDislike,
  decrementDislike,
  addAlert,
  removeAlert,
  update,
  updatePassword,
};
