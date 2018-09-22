import React from 'react';
import RowButton from './RowButton';
import styled from 'styled-components';

const RowHeader = styled.h6`
  padding: 5px;
  height: 50px;
  margin: 0;
`;

const Rows = ({ rowsCount }) => {
  const rowsList = [...Array(rowsCount).keys()].map(
    el => <RowButton idx={el} />
  );

  return (
    <div className="col-lg-1">
      <RowHeader />
      <ul class="list-unstyled">{rowsList}</ul>
    </div>
  );
};

export default Rows;
