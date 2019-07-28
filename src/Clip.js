import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Container, Row, Col, ButtonGroup, Button } from 'react-bootstrap';

function Clip(props) {
  const [showModal, setShowModal] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
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

    if (isPlaying) {
      return (
        <Button variant="danger" onClick={() => setIsPlaying(false)}>
          &#9632;
        </Button>
      );
    } else {
      return (
        <Button variant="success" onClick={() => setIsPlaying(true)}>
          &#9658;
        </Button>
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
          disabled={isPlaying}
          dangerouslySetInnerHTML={{
            __html: pattern ? '⚙' : '&#160;&#160;&#160;&#160;&#160;&#160;',
          }}
        />
      </ButtonGroup>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
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
