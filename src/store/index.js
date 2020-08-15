import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { getFirebase } from 'react-redux-firebase';
import rootReducer from './reducers';


const composeEnhancers =
    process.env.NODE_ENV === 'development'
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
        : compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk.withExtraArgument(getFirebase))));

export default store;