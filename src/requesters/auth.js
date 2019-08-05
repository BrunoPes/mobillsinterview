import auth from '@react-native-firebase/auth';
import errorHandler from './errorHandler';
const Auth = auth();

export const register = (email, password) => {
  const request = Auth.createUserWithEmailAndPassword(email, password);
  return fetch(request);
};

export const login = async (email, password) => {
  const request = Auth.signInWithEmailAndPassword(email, password);
  return await fetch(request);
};

export const updateUser = async (profile) => {
  const request = Auth.currentUser.updateProfile(profile);
  return await fetch(request);
}

const fetch = async (request) => {
  return await request.then(res => {
    return res;
  }).catch(error => {
    console.log('Auth error: ', error);
    const { code, message } = error;
    const msg = errorHandler[code] || message;
    return { error: msg };
  });
};