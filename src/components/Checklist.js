import React, { Component } from 'react';

const Checklist = ({ name, data, selected=[], onChangeHandler }) => {
  const list = data.map((el, idx) => { 
    return (
      <li key={idx}>
        <input type="checkbox" value={el} onChange={onChangeHandler.bind(this)} /> {el}
      </li>
    )
  });
  return (
    <div className="col">
      <h3>{name}</h3>
      <ul className="list-unstyled">
        {list}
      </ul>
    </div>
  );
}

export default Checklist;