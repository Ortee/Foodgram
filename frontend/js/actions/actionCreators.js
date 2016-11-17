import { showFoods, addFood, removeFood } from './foodActions';
import { register, login, loginUserRequest, loginUserSuccess, logout, loginUserFailure, getUser} from './authActions';
import { incrementLike, decrementLike, incrementDislike, decrementDislike } from './likeActions';
import { addAlert, removeAlert } from './alertActions';
import { updateRestName, updateDescription, updateAddress } from './accountActions';

export {
  showFoods,
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
  updateRestName,
  updateDescription,
  updateAddress,
};
