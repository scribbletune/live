import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { rootReducer } from './reducer';
import { initApp, changeKey, changeScale, changeArpLengthOption } from './actions';
import Selector from './Selector';

const store = createStore(rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const updateState = () => {

};
const render = () => {
  const state = store.getState();
  ReactDOM.render(
    (<section>
      <h1>Hello World</h1>
      {/*KEYS*/}
      <Selector
        title="Key"
        data={state.keys}
        selectedIdx={state.selectedKeyIdx}
        onClickHandler={changeKey.bind(null, store.dispatch)}
      />

      {/*SCALES*/}
      <Selector
        title="Scale"
        data={state.scales}
        selectedIdx={state.selectedScaleIdx}
        onClickHandler={changeScale.bind(null, store.dispatch)}
      />

    {/*ARP LENGTH OPTIONS*/}
      <Selector
        title="Arp length"
        data={state.arpLengthOptions}
        selectedIdx={state.selectedArpLengthOptionIdx}
        onClickHandler={changeArpLengthOption.bind(null, store.dispatch)}
      />
    </section>),
    document.getElementById('root')
  );
};

store.subscribe(render);
initApp(store.dispatch);
