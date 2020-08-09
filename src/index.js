// Package imports
import React from 'react';
import ReactDOM from 'react-dom';
// import * as serviceWorker from './serviceWorker';

// Component imports
import App from './App';

// Styles imports
import './index.scss';
import './styles/shared.scss';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
