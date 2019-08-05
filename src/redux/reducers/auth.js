import _ from 'lodash';
import { USER_LOGIN } from '../actions/types';

const INITIAL_STATE = {
  name: '',
  email: '',
  userId: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};