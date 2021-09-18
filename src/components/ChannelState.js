import React from 'react';
import { Container, Col, Row, OverlayTrigger, Tooltip } from 'react-bootstrap';
import Spinner from 'react-bootstrap/spinner';
import { TiWarning } from 'react-icons/all';

const ChannelStateIcon = ({ state, error }) => {
  switch (state) {
    case 'loading':
      return (
        <Spinner animation="border" role="status" className="channel-state-loading">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      );
    case 'error':
      return (
        <OverlayTrigger
          key="top"
          placement="top"
          overlay={<Tooltip id="tooltip">{error?.message || 'Error loading (details not provided)'}</Tooltip>}
        >
          <div>
            <TiWarning title="Load Error" className="channel-state-error" />
          </div>
        </OverlayTrigger>
      );
    case 'loaded':
    default:
      return null;
  }
};
function ChannelState({ state, error }) {
  return (
    <Container as={Row} className="channel-state">
      <Col md={12}>
        <ChannelStateIcon state={state} error={error} />
      </Col>
    </Container>
  );
}

export default ChannelState;
