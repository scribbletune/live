import React, { useCallback } from 'react';
import { Col, Button } from 'react-bootstrap';

// TODO: DRY, move to utils
const jsxLoop = function* jsxLoop(count, callback) {
  for (let i = 0; i < count; i += 1) yield callback(i);
};

// Sub-Component
const RowPlayButton = ({ idx, playRow }) => {
  // Pattern: "avoid binding arrow functions in render"
  const onClick = useCallback(
    () => playRow?.({ variables: { activeClipIdx: idx } }),
    [playRow, idx] // Array of dependencies for which the memoization should update
  );

  return (
    <div className="clip">
      <Button variant="outline-dark" onClick={onClick}>
        {' '}
        &#9658;
      </Button>
    </div>
  );
};

// Draw out buttons to trigger play of all clips in whole row
function Master({ count, playRow }) {
  // console.log('REDRAW: Master');
  return (
    <>
      <Col>
        {[...jsxLoop(count, (idx) => <RowPlayButton key={idx} idx={idx} playRow={playRow} />)]}
        <div className="volume-slider" />
        <h6 className="text-center">MASTER</h6>
      </Col>
    </>
  );
}

export default Master;
