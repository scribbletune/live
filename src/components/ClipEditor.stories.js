import React from 'react';
// import { Col, Row } from 'react-bootstrap';

import ClipEditor from './ClipEditor';

export default {
  component: ClipEditor,
  title: 'ClipEditor',
  decorators: [
    (story) => (
      <section>
        <div className="ptn">{story()}</div>
      </section>
    ),
  ],
};

// eslint-disable-next-line react/jsx-props-no-spreading
const Template = (args) => <ClipEditor {...args} />;

export const Default = Template.bind({});
Default.args = {
  clip: { pattern: '' },
};

export const Pattern44 = Template.bind({});
Pattern44.args = {
  ...Default.args,
  clip: { pattern: 'xxxx' },
};

export const Pattern44subdiv3 = Template.bind({});
Pattern44subdiv3.args = {
  ...Default.args,
  clip: { pattern: 'xx[xxx]x' },
};
