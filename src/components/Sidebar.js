/* eslint-disable react/jsx-no-bind */ // TODO: Fix arrow function props
/* eslint-disable react/jsx-props-no-spreading */

import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import AppLogo from './AppLogo';
import './Sidebar.css';

function Sidebar({ onMenu, appInfo, children }) {
  const [showSidebar, setShowSidebar] = useState(false);

  const onSidebarClose = () => setShowSidebar(false);
  const onSidebarOpen = () => setShowSidebar(true);
  // eslint-disable-next-line no-unused-vars
  const onMenuClick = (eventKey, event) => {
    const id = eventKey;
    setShowSidebar(false);
    onMenu?.(id);
  };

  return (
    <>
      <Offcanvas show={showSidebar} onHide={onSidebarClose}>
        <Container fluid>
          <Row md={12} className="mb-0">
            <Col md={12}>
              <Navbar bg="primary" variant="dark" className="toolbar">
                {/* <Button onClick={onSidebarClose} className="navbar-toggler-custom btn-sidebar-close">
                  <span className="navbar-toggler-icon" />
                </Button> */}
                <AppLogo appInfo={appInfo} onClick={onSidebarClose} />
                <Navbar.Text>{appInfo.version}</Navbar.Text>
              </Navbar>
            </Col>
          </Row>
          <Row>
            <Col className="me-1">
              <p className="text-start fst-italic text-muted">
                <small>{appInfo.copyright}</small>
              </p>
            </Col>
            <Col className="me-1">
              <p className="text-end fst-italic text-muted">
                <small>{appInfo.release}</small>
              </p>
            </Col>
          </Row>
        </Container>
        <Offcanvas.Body>
          <ListGroup variant="flush" onSelect={onMenuClick}>
            {children}
          </ListGroup>
        </Offcanvas.Body>
      </Offcanvas>
      {/* <Button onClick={onSidebarOpen} className="navbar-toggler-custom btn-sidebar-open">
        <span className="navbar-toggler-icon" />
      </Button> */}
      <AppLogo appInfo={appInfo} onClick={onSidebarOpen} />
    </>
  );
}

function SidebarItem({ id, children, ...props }) {
  // const onClick = () => {
  //   console.log('DEBUG: Sidebar.Item [CLICK] id=%o', id);
  //   onMenu?.(id);
  // };
  return (
    // <ListGroup.Item action onClick={onClick} {...props}>
    <ListGroup.Item key={id} action eventKey={id} {...props}>
      {children}
    </ListGroup.Item>
  );
}

Sidebar.Item = SidebarItem;

export default Sidebar;
