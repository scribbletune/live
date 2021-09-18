import React from 'react';

import Master from './Master';

export default {
  component: Master,
  title: 'Master',
};

// eslint-disable-next-line react/jsx-props-no-spreading
const Template = (args) => <Master {...args} />;

export const Empty = Template.bind({});
Empty.args = {
  count: 0,
};

export const Default = Template.bind({});
Default.args = {
  ...Empty.args,
  count: 4,
};
