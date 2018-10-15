import React from 'react';
import Selector from './Selector';

const Clips = ({ progression, selectedArr, onClickHandler }) => {
  const clipsDom = [...Array(8).keys()].map((el, idx) => {
    {/*
      In the following onClickHandler the index of this current clip is being bound
      The Selector itself will bind the index of the chord progression itself
      Thus 3 pieces of information are being sent to the action:
      - dispatch (bound from index.js)
      - clip to be affected (bound from here)
      - id of the chord to be set as selected (bound from Selector.js)
    */}
    return (
      <Selector
        key={idx}
        data={progression}
        selectedIdx={selectedArr[idx]}
        onClickHandler={onClickHandler.bind(null, idx)}
      />
    );
  });
  return (
    <div className="clips">{clipsDom}</div>
  );
}

export default Clips;