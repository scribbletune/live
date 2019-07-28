import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import Modal from 'react-bootstrap/Modal';
import { Container, Row, Col, ButtonGroup, Button } from 'react-bootstrap';
import { STOP_CLIP, PLAY_CLIP } from './gql';

function Clip(props) {
  const [showModal, setShowModal] = useState(false);
  const [pattern, setPattern] = useState(props.pattern || '');
  const [notes, setNotes] = useState(props.notes || '');
  const [randomNotes, setRandomNotes] = useState(props.randomNotes || '');
  const [subdiv, setSubdiv] = useState(props.subdiv || '4n');
  const [dur, setDur] = useState(props.dur || '4n');

  const getClipButton = () => {
    if (!pattern) {
      return (
        <Button variant="outline-secondary" onClick={() => setShowModal(true)}>
          &#x25CB;
        </Button>
      );
    }

    if (props.activeClipIdx === props.idx) {
      // Clip is playing
      return (
        <Mutation
          mutation={STOP_CLIP}
          variables={{ channelId: props.channelId }}
        >
          {stopClip => (
            <Button variant="danger" onClick={stopClip}>
              {' '}
              &#9632;
            </Button>
          )}
        </Mutation>
      );
    } else {
      // Clip is stopped
      return (
        <Mutation
          mutation={PLAY_CLIP}
          variables={{ channelId: props.channelId, clipId: props.idx }}
        >
          {playClip => (
            <Button variant="success" onClick={playClip}>
              {' '}
              &#9658;
            </Button>
          )}
        </Mutation>
      );
    }
  };

  return (
    <div className="clip">
      <ButtonGroup>
        {getClipButton()}
        <Button
          variant={pattern ? 'secondary' : 'outline-secondary'}
          onClick={() => setShowModal(true)}
          disabled={props.activeClipIdx === props.idx}
          dangerouslySetInnerHTML={{
            __html: pattern ? '⚙' : '&#160;&#160;&#160;&#160;&#160;&#160;',
          }}
        />
      </ButtonGroup>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Clip</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col md={4}>Pattern</Col>
              <Col md={8}>
                <input
                  onChange={e => setPattern(e.target.value)}
                  value={pattern}
                />
              </Col>
            </Row>
            <Row>
              <Col md={4}>Notes</Col>
              <Col md={8}>
                <textarea
                  onChange={e => setNotes(e.target.value)}
                  value={notes}
                />
              </Col>
            </Row>
            <Row>
              <Col md={4}>Random notes</Col>
              <Col md={8}>
                <input
                  onChange={e => setRandomNotes(e.target.value)}
                  value={randomNotes}
                />
              </Col>
            </Row>
          </Container>

          <Container>
            <Row>
              <Col>
                subdiv:
                <select
                  defaultValue={subdiv}
                  onChange={e => setSubdiv(e.target.value)}
                >
                  <option>1n</option>
                  <option>2n</option>
                  <option>4n</option>
                  <option>8n</option>
                  <option>16n</option>
                  <option>32n</option>
                </select>
              </Col>
              <Col>
                dur:
                <select
                  defaultValue={dur}
                  onChange={e => setDur(e.target.value)}
                >
                  <option>1n</option>
                  <option>2n</option>
                  <option>4n</option>
                  <option>8n</option>
                  <option>16n</option>
                  <option>32n</option>
                </select>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Clip;
