import * as actionTypes from "../actions/actionTypes";
// import { deleteAccount } from "../actions";

const initialState = {
  authError: null,
  loading: false,
  newImage: null,
};

const authStart = (state, action) => {
  console.log("authStarted");
  console.log(action);
  return {
    ...state,
    authError: null,
    loading: true,
  };
};

const loginSucess = (state, action) => {
  console.log("login success");
  console.log(action);
  return {
    ...state,
    authError: null,
    loading: false,
  };
};

const loginError = (state, action) => {
  console.log("login failed");
  console.log(action);
  return {
    ...state,
    // authError: 'Login failed',
    authError: action.err.message,
    loading: false,
  };
};

const signUpSuccess = (state, action) => {
  console.log("signup success");
  console.log(action);
  return {
    ...state,
    authError: null,
    loading: false,
  };
};

const signUpError = (state, action) => {
  console.log("signup error");
  return {
    ...state,
    authError: action.err.message,
    loading: false,
  };
};

const signOut = (state, action) => {
  console.log("signout success");
  return {
    ...state,
    loading: false,
  };
};

const resendEmailSuccess = (state, action) => {
  console.log("Email successfuly sent");
  return {
    ...state,
    loading: false,
  };
};

const changeProfileSuccess = (state, action) => {
  console.log("Changes made with success!");
  return {
    ...state,
    loading: false,
    authError: null,
    newImage: null,
  };
};

const changeProfileError = (state, action) => {
  console.log("Changes error!");
  return {
    ...state,
    loading: false,
    authError: action.err.message,
    // newImage: null,
  };
};

const deleteAccountSuccess = (state, action) => {
  return {
    ...state,
    loading: false,
  };
};

const addNewImage = (state, action) => {
  console.log("@@@@@@@@@@@@@@@@@@@@Image action");
  console.log(action);
  return {
    ...state,
    newImage: action.image,
  };
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.LOGIN_SUCCESS:
      return loginSucess(state, action);
    case actionTypes.LOGIN_ERROR:
      return loginError(state, action);
    case actionTypes.SIGNUP_SUCCESS:
      return signUpSuccess(state, action);
    case actionTypes.SIGNUP_ERROR:
      return signUpError(state, action);
    case actionTypes.SIGNOUT_SUCCESS:
      return signOut(state, action);
    case actionTypes.RESENDEMAIL_SUCCESS:
      return resendEmailSuccess(state, action);
    case actionTypes.CHANGEPROFILE_SUCCESS:
      return changeProfileSuccess(state, action);
    case actionTypes.CHANGEPROFILE_ERROR:
      return changeProfileError(state, action);
    case actionTypes.DELETEACCOUNT_SUCCESS:
      return deleteAccountSuccess(state, action);
    case actionTypes.ADD_NEW_IMAGE:
      return addNewImage(state, action);
    default:
      return state;
  }
};

export default authReducer;
