import React, { Component } from 'react';

const Selector = ({ data = [], title = '', selectedIdx = 0, onClickHandler }) => {
  let selectorClassName = 'selector';
  if (title) {
    selectorClassName += ' ' + title.toLowerCase().replace(/\s/g, '-');
  }
  const liItems = data.map((el, idx) => {
    let liClassName = '';
    if (selectedIdx === idx) {
      liClassName = 'selected';
    }
    return <li key={idx} className={liClassName} onClick={onClickHandler.bind(null, {idx})}>{el}</li>
  });
  return (
    <div className={selectorClassName}>
      <h3>{title}</h3>
      <ul className="list-unstyled">{liItems}</ul>
    </div>
    );
};

export default Selector;
