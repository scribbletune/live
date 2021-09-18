import React, { useCallback } from 'react';
import { ButtonGroup, Button, Col } from 'react-bootstrap';

function Transport({ isPlaying, startStopTrack }) {
  // console.log('REDRAW: Transport');

  const onStop = useCallback(() => startStopTrack?.({ variables: { isPlaying: false } }), [startStopTrack]);
  const onStart = useCallback(() => startStopTrack?.({ variables: { isPlaying: true } }), [startStopTrack]);

  return (
    <Col className="transport">
      <ButtonGroup>
        <Button variant="dark" onClick={onStop} disabled={!isPlaying}>
          {' '}
          &#9632;
        </Button>
        <Button variant={isPlaying ? 'success' : 'dark'} onClick={onStart} disabled={isPlaying}>
          {' '}
          &#9658;
        </Button>
      </ButtonGroup>
    </Col>
  );
}

export default Transport;
