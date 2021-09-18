import React, { useState } from 'react';
// import { Row, Col } from 'react-bootstrap';
import Note from './Note';

// TODO: WIP, need working implementation.
const ClipEditor = (props) => {
  const [pattern, setPattern] = useState('-');
  const { clip } = props;
  const noteCount = clip.pattern?.length || 4;
  const noteComps = [];
  for (let i = 0; i < noteCount; i += 1) {
    noteComps.push(<Note key={i} pattern={pattern} setPattern={setPattern} />);
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
      <div className="menu" />
      <div className="ptn">{noteComps}</div>
      <div className="pattern-string">{clip.pattern}</div>
    </section>
  );
};

export default ClipEditor;
