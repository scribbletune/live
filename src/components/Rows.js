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
    (el, idx) => <RowButton key={idx} idx={el} />
  );

  return (
    <div className="col-lg-1">
      <RowHeader />
      <ul className="list-unstyled">{rowsList}</ul>
    </div>
  );
};

export default Rows;
