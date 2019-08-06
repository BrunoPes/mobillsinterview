import { USER_LOGIN, USER_LOGOUT } from './types';
import { login, logout } from '../../requesters/auth';

export const userSignIn = values => ({
  type: USER_LOGIN,
  payload: values
});

export const userSignOut = () => ({
  type: USER_LOGOUT,
  payload: {name: '', email: '', userId: null}
});

export const fetchUserSignIn = (email, password) => {
  return async (dispatch) => {
    return login(email, password).then(res => {
      const { error, user } = res;
      if(error) throw(error);

      const userValues = {
        name: user.displayName,
        email: user.email,
        userId: user.uid,
      };
      if(userValues) return dispatch(userSignIn(userValues));
    }).catch(err => {
      throw(err);
    });
  };
};

export const fetchUserSignOut = () => {
  return async (dispatch) => {
    return logout().then(res => {
      const { error } = res || {};
      if(error) throw(error);
      return dispatch(userSignOut());
    }).catch(err => {
      throw(err);
    });
  };
};