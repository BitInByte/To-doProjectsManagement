import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

import authReducer from './auth';
import todoReducer from './toDo';
// import projectReducer from './project';

const rootReducer = combineReducers({
    auth: authReducer,
    todo: todoReducer,
    // project: projectReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer,
});

export default rootReducer;

