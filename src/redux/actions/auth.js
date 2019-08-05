import { USER_LOGIN } from './types';
import { login } from '../../requesters/auth';

export const userSignIn = values => ({
  type: USER_LOGIN,
  payload: values
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