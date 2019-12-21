import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Mutation } from 'react-apollo';
import { PLAY_ROW } from './gql';
import Transport from './Transport';
import Channel from './Channel';

function App(props) {
  console.log(props);
  return (
    <Container fluid={true}>
      <Row>
        <Col md={5} />
        <Col md={7}>
          <Transport isPlaying={props.isPlaying} />
        </Col>
      </Row>
      <Row>
        {props.channels.length &&
          props.channels.map(channel => (
            <Channel channel={channel} key={channel.idx} />
          ))}
        <Col>
          {/* Draw out the buttons on the far right to trigger each row */}
          {props.channels.length &&
            props.channels[0].clips.map((el, idx) => (
              <div className="clip" key={idx}>
                <Mutation
                  mutation={PLAY_ROW}
                  variables={{ activeClipIdx: idx }}
                >
                  {playRow => (
                    <Button variant="outline-dark" onClick={playRow}>
                      {' '}
                      &#9658;
                    </Button>
                  )}
                </Mutation>
              </div>
            ))}
        </Col>
      </Row>
    </Container>
  );
}

export default App;
