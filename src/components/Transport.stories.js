import React from 'react';
import { Col, Row } from 'react-bootstrap';

import Transport from './Transport';

export default {
  component: Transport,
  title: 'Transport',
  decorators: [
    (story) => (
      <Row>
        <Col />
        {story()}
        <Col />
      </Row>
    ),
  ],
};

// eslint-disable-next-line react/jsx-props-no-spreading
const Template = (args) => <Transport {...args} />;

export const Default = Template.bind({});
Default.args = {
  isPlaying: false,
};

export const Playing = Template.bind({});
Playing.args = {
  isPlaying: true,
};
