import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { playRow } from './actions';
import styled from 'styled-components';

const Cell = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  cursor: pointer;
  background: lightyellow;
  &:hover {
    background: lemonchiffon;
  }
`;

const Row = ({ idx, playRowHandler }) => (
  <Cell onClick={playRowHandler.bind(null, idx)}>&#9658;</Cell>
);

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    playRowHandler: playRow
  }, dispatch);
};

export default connect(null, mapDispatchToProps)(Row);