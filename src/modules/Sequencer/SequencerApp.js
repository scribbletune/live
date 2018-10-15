import React from 'react';
import Controls from './Controls';
import Steps from './Steps';

const SequencerApp = () => {
  return (
    <div>
      <h1>SequencerApp</h1>
      <Controls />
      <Steps totalSteps={8} note="c3" />
      <Steps totalSteps={8} note="eb3" />
      <Steps totalSteps={6} note="g2" />
      {/*<Steps totalSteps={4} sample="/sounds/hits/normal-kick.wav" />
      <Steps totalSteps={4} sample="/sounds/hits/ch.wav" />
      <Steps totalSteps={8} sample="/sounds/hits/snare.wav" />*/}
    </div>
  );
};

export default SequencerApp;
