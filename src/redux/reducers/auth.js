import _ from 'lodash';
import { USER_LOGIN, USER_LOGOUT } from '../actions/types';

const INITIAL_STATE = {
  name: '',
  email: '',
  userId: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return { ...state, ...action.payload };
    case USER_LOGOUT:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};