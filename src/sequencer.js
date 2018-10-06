import React from 'react';
import ReactDOM from 'react-dom';
import SequencerApp from './components/SequencerApp';

const render = () => {
  ReactDOM.render(<SequencerApp />, document.getElementById('root'));
};

render();
