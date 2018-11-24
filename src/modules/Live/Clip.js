import React from 'react';
import styled from 'styled-components';

const Cell = styled.li`
	display: flex;
	background-color: #333;
  align-items: center;
  justify-content: center;
  height: 50px;
  border: 1px solid black;
  cursor: pointer;
  &:hover {
    background: #ccc;
  }
`;

const Clip = ({ pattern, isActive, onClickPlay, onClickStop }) => {
  if (!pattern) {
    return <Cell></Cell>;
  }

  if (isActive) {
    return <Cell onClick={onClickStop}>&#9632;</Cell>
  } else {
    return <Cell onClick={onClickPlay}>&#9658;</Cell>
  }
};

export default Clip;