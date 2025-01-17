import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";

import authReducer from "./auth";
import todoReducer from "./toDo";

const rootReducer = combineReducers({
  auth: authReducer,
  todo: todoReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
});

export default rootReducer;
