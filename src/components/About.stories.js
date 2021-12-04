import React from 'react';

import About from './About';

export default {
  component: About,
  title: 'About',
  decorators: [
    (story) => (
      <section>
        <div className="ptn">{story()}</div>
      </section>
    ),
  ],
};

// eslint-disable-next-line react/jsx-props-no-spreading
const Template = (args) => <About {...args} />;

export const Default = Template.bind({});
Default.args = {
  appInfo: {
    name: 'Your App',
    version: 'v1.0.1',
    copyright: '(c) 2001',
    release: 'build-2001-0101',
  },
};
