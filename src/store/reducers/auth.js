import * as actionTypes from "../actions/actionTypes";

const initialState = {
  authError: null,
  loading: false,
  newImage: null,
};

const authStart = (state, action) => {
  return {
    ...state,
    authError: null,
    loading: true,
  };
};

const loginSucess = (state, action) => {
  return {
    ...state,
    authError: null,
    loading: false,
  };
};

const loginError = (state, action) => {
  return {
    ...state,
    authError: action.err.message,
    loading: false,
  };
};

const signUpSuccess = (state, action) => {
  return {
    ...state,
    authError: null,
    loading: false,
  };
};

const signUpError = (state, action) => {
  return {
    ...state,
    authError: action.err.message,
    loading: false,
  };
};

const signOut = (state, action) => {
  return {
    ...state,
    loading: false,
  };
};

const resendEmailSuccess = (state, action) => {
  return {
    ...state,
    loading: false,
  };
};

const changeProfileSuccess = (state, action) => {
  return {
    ...state,
    loading: false,
    authError: null,
    newImage: null,
  };
};

const changeProfileError = (state, action) => {
  return {
    ...state,
    loading: false,
    authError: action.err.message,
    newImage: null,
  };
};

const deleteAccountSuccess = (state, action) => {
  return {
    ...state,
    loading: false,
  };
};

const deleteAccountError = (state, action) => {
  return {
    ...state,
    loading: false,
    authError: action.err.message,
  };
};

const recoverSuccess = (state, action) => {
  return {
    ...state,
    authError: null,
    loading: false,
  };
};

const recoverError = (state, action) => {
  return {
    ...state,
    authError: action.err.message,
    loading: false,
  };
};

const addNewImage = (state, action) => {
  return {
    ...state,
    newImage: action.image,
  };
};

const cleanUp = () => {
  return initialState;
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
    case actionTypes.DELETEACCOUNT_ERROR:
      return deleteAccountError(state, action);
    case actionTypes.RECOVERPASSWORD_ERROR:
      return recoverError(state, action);
    case actionTypes.RECOVERPASSWORD_SUCCESS:
      return recoverSuccess(state, action);
    case actionTypes.ADD_NEW_IMAGE:
      return addNewImage(state, action);
    case actionTypes.CLEANUP:
      return cleanUp();
    default:
      return state;
  }
};

export default authReducer;
