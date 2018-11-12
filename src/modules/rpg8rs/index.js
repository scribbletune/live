import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from './reducer';
import {
  play,
  stop,
  saveMidi
} from './actions';
import Rpg8rs from './rpg8rs';

const store = createStore(rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const render = () => {
  const state = store.getState();
  ReactDOM.render(
    (<Provider store={store}>
      <section>
        <div className="row">
          <Rpg8rs idx={0} />
          <Rpg8rs idx={1} />
        </div>
        <div>
          <button onClick={play.bind(null, store.dispatch)} disabled={state.isClipPlaying}>Play</button>
          <button onClick={stop.bind(null, store.dispatch)} disabled={!state.isClipPlaying}>Stop</button>
        </div>
      </section>
    </Provider>),
    document.getElementById('root')
  );
};


render();
store.subscribe(render);