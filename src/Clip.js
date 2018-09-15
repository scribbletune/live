import React from 'react';
import styled from 'styled-components';

const Cell = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  border: 1px solid black;
  cursor: pointer;
  &:hover {
    background: #ccc;
  }
`;

const Clip = ({ pattern, isActive, id }) => {
  if (!pattern) {
    return <Cell></Cell>;
  }

  const onClickPlay = () => {
    console.log('play', id);
  }

  const onClickStop = () => {
    console.log('stop', id);
  }

  if (isActive) {
    return <Cell onClick={onClickStop}>&#9632;</Cell>
  } else {
    return <Cell onClick={onClickPlay}>&#9658;</Cell>
  }
};

export default Clip;