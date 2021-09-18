import React from 'react';
// import { Col, Row } from 'react-bootstrap';

import Note from './Note';

export default {
  component: Note,
  title: 'Note',
  decorators: [
    (story) => (
      <section>
        <div className="ptn">{story()}</div>
      </section>
    ),
  ],
};

// eslint-disable-next-line react/jsx-props-no-spreading
const Template = (args) => <Note {...args} />;

export const Default = Template.bind({});
Default.args = {
  pattern: '-',
};

export const NoteOn = Template.bind({});
NoteOn.args = {
  pattern: 'x',
};

export const NoteR = Template.bind({});
NoteR.args = {
  pattern: 'R',
};

export const NoteContinue = Template.bind({});
NoteContinue.args = {
  pattern: '_',
};
