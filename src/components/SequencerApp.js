import React from 'react';
import Controls from './Controls';
import Steps from './Steps';

const SequencerApp = () => {
  return (
    <div>
      <h1>SequencerApp</h1>
      <Controls />
      <Steps totalSteps={16} note="c3" />
      <Steps totalSteps={7} note="eb3" />
      <Steps totalSteps={3} note="g2" />
    </div>
  );
};

export default SequencerApp;
