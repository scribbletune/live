import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Transport from './Transport';
import Channel from './Channel';
import track from './track';

function App() {
  const [channels, setChannels] = useState(track.channels);
  return (
    <Container>
      <Row>
        <Col md={5} />
        <Col md={7}>
          <Transport />
        </Col>
      </Row>
      <Row>
        {channels.map((channel, idx) => (
          <Channel channel={channel} idx={idx} key={idx} />
        ))}
        <Col>
          {/* Draw out the buttons on the far right to trigger each row */}
          {channels[0].clips.map((el, idx) => (
            <div className="clip" key={idx}>
              <Button variant="outline-dark"> &#9658;</Button>
            </div>
          ))}
          {/* Add a button at the bottom of "row triggers" to insert a new row (scene) */}
          <div className="clip">
            <Button
              variant="outline-light"
              onClick={() => {
                const newChannels = [...channels];
                newChannels.forEach(channel => channel.clips.push({}));
                setChannels(newChannels);
              }}
            >
              <span role="img" aria-label="">
                ➕
              </span>
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
