import React from 'react';
import ReactDOM from 'react-dom';
import Rpg8rs from './rpg8rs';

const render = () => {
  ReactDOM.render(
    (<div className="row">
      <Rpg8rs />
      <Rpg8rs />
    </div>),
    document.getElementById('root')
  );
};


render();