import { ADD_LOGIN_INFO, UPDATE_SCORE } from './actionType';

export const saveLogin = (info) => ({
  type: ADD_LOGIN_INFO,
  payload: info,
});

export const updateScore = (score) => ({
  type: UPDATE_SCORE,
  payload: score,
});
