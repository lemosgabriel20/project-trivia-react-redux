import { ADD_LOGIN_INFO, UPDATE_SCORE, UPDATE_ASSERTS } from './actionType';

export const saveLogin = (info) => ({
  type: ADD_LOGIN_INFO,
  payload: info,
});

export const updateScore = (score) => ({
  type: UPDATE_SCORE,
  payload: score,
});

export const updateAssertions = () => ({
  type: UPDATE_ASSERTS,
});
