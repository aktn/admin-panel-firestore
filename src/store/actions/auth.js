import { myFirebase } from "../../lib/db";
import * as actionTypes from "./actionTypes";

export const authStart = () => {
  return {
    type: actionTypes.LOGIN_REQUEST
  };
};

export const authSuccess = userId => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    userId: userId
  };
};

export const authFail = error => {
  return {
    type: actionTypes.LOGIN_FAILURE,
    error: error
  };
};

export const loginError = () => {
  return {
    type: actionTypes.LOGIN_FAILURE
  };
};

export const requestLogout = () => {
  return {
    type: actionTypes.LOGOUT_REQUEST
  };
};

export const logoutError = () => {
  return {
    type: actionTypes.LOGOUT_FAILURE
  };
};

export const verifyRequest = () => {
  return {
    type: actionTypes.VERIFY_REQUEST
  };
};

export const verifySuccess = () => {
  return {
    type: actionTypes.VERIFY_SUCCESS
  };
};

export const receiveLogout = () => {
  return {
    type: actionTypes.LOGOUT_SUCCESS
  };
};

export const loginUser = (email, password) => dispatch => {
  dispatch(authStart());
  myFirebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(user => {
      dispatch(authSuccess(user));
    })
    .catch(error => {
      dispatch(loginError());
    });
};

export const verifyAuth = () => dispatch => {
  dispatch(verifyRequest());
  myFirebase.auth().onAuthStateChanged(user => {
    if (user !== null) {
      dispatch(authSuccess(user));
    }
    dispatch(verifySuccess());
  });
};

export const logoutUser = () => dispatch => {
  dispatch(requestLogout());
  myFirebase
    .auth()
    .signOut()
    .then(() => {
      dispatch(receiveLogout());
    })
    .catch(error => {
      dispatch(logoutError());
    });
};
