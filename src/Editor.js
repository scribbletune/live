import React, { useState } from 'react';
// import { Row, Col } from 'react-bootstrap';
import Note from './Note';

const Editor = ({ noteCount = 4 }) => {
  const noteComps = [];
  for (let i = 0; i < noteCount; i++) {
    noteComps.push(<Note />);
  }

  return (
    <section>
      {/* <Row>
        <Col>Note length: </Col>
        <Col>
          <select>
            <option value="4">4n</option>
            <option>8n</option>
            <option>16n</option>
          </select>
        </Col>
      </Row> */}
      <div className="menu"></div>
      <div className="ptn">{noteComps}</div>
    </section>
  );
};

export default Editor;
