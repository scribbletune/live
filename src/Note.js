import React, { useState } from 'react';

const Note = () => {
  const [ptn, setPtn] = useState('-');
  const onClickHandler = () => {
    setPtn(ptn === '-' ? 'x' : '-');
  };
  const comp =
    ptn === '-' ? (
      <div onClick={onClickHandler} className="noteCel noteOn"></div>
    ) : (
      <div onClick={onClickHandler} className="noteCel noteOff"></div>
    );
  return comp;
};

export default Note;
