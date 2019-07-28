import React, { useState } from 'react';
import Channel from './Channel';
import { Container, Row, Col, Button } from 'react-bootstrap';
import track from './track';

function App() {
  const [channels, setChannels] = useState(track.channels);
  return (
    <Container>
      <Row>
        {channels.map((channel, idx) => (
          <Channel clips={channel.clips} channel={channel} key={idx} />
        ))}
        <Col>
          {channels[0].clips.map((el, idx) => (
            <div className="clip" key={idx}>
              <Button variant="outline-dark"> &#9658;</Button>
            </div>
          ))}
          <div className="clip">
            <Button
              variant="outline-dark"
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
