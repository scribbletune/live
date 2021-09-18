import React from 'react';
import { Form } from 'react-bootstrap';

import NumberWithSpinners from './NumberWithSpinners';

export default {
  component: NumberWithSpinners,
  title: 'NumberWithSpinners',
  decorators: [(story) => <Form>{story()}</Form>],
};

// eslint-disable-next-line react/jsx-props-no-spreading
const Template = (args) => <NumberWithSpinners {...args} />;

export const Default = Template.bind({});
Default.args = {
  value: 123,
  label: 'Tempo',
  units: 'bpm',
};
