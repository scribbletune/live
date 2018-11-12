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
        <div className="mb-3 p-2 controls">
          <button className="btn btn-success" onClick={play.bind(null, store.dispatch)} disabled={state.isClipPlaying}>Play</button>
          <button className="btn btn-danger" onClick={stop.bind(null, store.dispatch)} disabled={!state.isClipPlaying}>Stop</button>
          <button className="btn" disabled>Export MIDI (coming soon)</button>
        </div>
        <div className="row">
          <Rpg8rs
            idx={0}
            defaultKeyIdx={5}
            defaultScaleIdx={4}
            defaultPattern={'x-x[xx]'}
            defaultNotesCountIdx={0}
            defaultSubdivOptionsIdx={2}
            defaultNotesOrderIdx={2}
          />
          <Rpg8rs
            idx={1}
            defaultScaleIdx={8}
            defaultNotesOrderIdx={8}
          />
        </div>
      </section>
    </Provider>),
    document.getElementById('root')
  );
};


render();
store.subscribe(render);