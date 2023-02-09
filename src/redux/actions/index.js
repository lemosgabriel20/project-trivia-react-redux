import { ADD_LOGIN_INFO } from './actionType';

export const saveLogin = (info) => ({
  type: ADD_LOGIN_INFO,
  payload: info,
});
