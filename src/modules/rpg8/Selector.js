import React, { Component } from 'react';

const Selector = ({ data = [], title = '', selectedIdx = 0, onClickHandler }) => {
  const liItems = data.map((el, idx) => {
    let className = '';
    if (selectedIdx === idx) {
      className = 'selected';
    }
    return <li key={idx} className={className} onClick={onClickHandler.bind(null, {idx})}>{el}</li>
  });
  return (
    <div>
      <h3>{title}</h3>
      <ul>{liItems}</ul>
    </div>
    );
};

export default Selector;
