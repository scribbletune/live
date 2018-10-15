import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from './store/reducer';
import App from './App';

const store = createStore(rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const render = () => {
  ReactDOM.render(
    (<Provider store={store}>
      <App />
    </Provider>),
    document.getElementById('root')
  );
};

render();
