import { ADD_LOGIN_INFO, UPDATE_SCORE, UPDATE_ASSERTS,
  CLEAR_STATE } from '../actions/actionType';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  gravatarImage: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_LOGIN_INFO:
    return {
      ...state,
      name: action.payload.name,
      gravatarEmail: action.payload.email,
      gravatarImage: action.payload.image,
    };
  case UPDATE_SCORE:
    return {
      ...state,
      score: action.payload,
    };
  case UPDATE_ASSERTS:
    return {
      ...state,
      assertions: state.assertions + 1,
    };
  case CLEAR_STATE:
    return {
      ...state,
      score: 0,
      assertions: 0,
    };
  default:
    return state;
  }
};

export default player;
