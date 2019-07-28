import React from 'react';
import { Col } from 'react-bootstrap';
import Clip from './Clip';

function Channel({ channel }) {
  return (
    <>
      <Col>
        {channel.clips &&
          channel.clips.map((c, idx) => <Clip {...c} key={idx} />)}
        <div className="volumeSlider">
          <input type="range" orient="vertical" />
        </div>
      </Col>
    </>
  );
}

export default Channel;
