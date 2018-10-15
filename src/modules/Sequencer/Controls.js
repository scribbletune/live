import React from 'react';

const Controls = () => {

  const onClickStart = () => {
    Tone.Transport.start();
  };

  const onClickStop = () => {
    Tone.Transport.stop();
  };
  
  return (
    <div>
      <button onClick={onClickStart}>Start</button>
      <button onClick={onClickStop}>Stop</button>
    </div>
  );
};

export default Controls;
