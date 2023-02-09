import { ADD_LOGIN_INFO } from '../actions/actionType';

const INITIAL_STATE = {
  name: '',
  assertions: '',
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
  default:
    return state;
  }
};

export default player;
