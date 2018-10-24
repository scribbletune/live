import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { rootReducer } from './reducer';
import { initApp,
  changeKey,
  changeScale,
  changeArpLength,
  changeArpOrder,
  changeSubdivOption,
  changeClipChord,
  changePattern,
  play,
  stop,
  saveMidi
} from './actions';
import Selector from './Selector';
import Clips from './Clips';

const store = createStore(rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const updateState = () => {

};
const render = () => {
  const state = store.getState();
  ReactDOM.render(
    (<section>
      <div className="menu">
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
      </div>
      <div className="menu">
        {/*ARP LENGTH OPTIONS*/}
        <Selector
          title="Arp length"
          data={state.arpLengthOptions}
          selectedIdx={state.selectedArpLengthOptionIdx}
          onClickHandler={changeArpLength.bind(null, store.dispatch)}
        />

        {/*ARP NOTES ORDER OPTIONS*/}
        <Selector
          title="Arp order"
          data={state.arpNotesOrderOptions}
          selectedIdx={state.selectedArpNotesOrderOptionsIdx}
          onClickHandler={changeArpOrder.bind(null, store.dispatch)}
        />

        {/*NOTE LENGTH OPTIONS 1/2 1/4 1/8 1/16*/}
        <Selector
          title="Note length"
          data={state.subdivOptions}
          selectedIdx={state.selectedSubdivOption}
          onClickHandler={changeSubdivOption.bind(null, store.dispatch)}
        />
      </div>
      {/*PROGRESSION*/}
      <Clips
        progression={state.arpChordProgression}
        selectedArr={state.arpClipSelectedChord}
        onClickHandler={changeClipChord.bind(null, store.dispatch)}
      />
      {/*PATTERN*/}
      <div>
        <h3>Pattern</h3>
        <input type="text" value={state.pattern} onChange={(e) => changePattern.bind(null, store.dispatch, e.target.value)()}/> 
        Use x and - only!
      </div>
      <div className="controls">
        <button onClick={play.bind(null, store.dispatch)} disabled={state.isClipPlaying}>Play</button>
        <button onClick={stop.bind(null, store.dispatch)} disabled={!state.isClipPlaying}>Stop</button>
        <button onClick={saveMidi.bind(null, store.dispatch)}>MIDI</button>
      </div>

    </section>),
    document.getElementById('root')
  );
};

store.subscribe(render);
initApp(store.dispatch);
