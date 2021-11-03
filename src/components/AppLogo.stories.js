import React from 'react';
import Navbar from 'react-bootstrap/Navbar';

import AppLogo from './AppLogo';

export default {
  component: AppLogo,
  title: 'AppLogo',
  decorators: [
    (story) => (
      <Navbar bg="primary" variant="dark" className="toolbar">
        {story()}
      </Navbar>
    ),
  ],
};

// eslint-disable-next-line react/jsx-props-no-spreading
const Template = (args) => <AppLogo {...args} />;

export const Default = Template.bind({});
Default.args = {
  appInfo: {
    name: 'Your App',
    version: 'v1.0.1',
    copyright: '(c) 2001',
    release: 'build-2001-0101',
  },
};

// export const Active = Template.bind({});
// Active.args = {
//   ...Default.args,
//   sidebarMenu, // AppLogo does not use it, here only for exporting to other stories
//   children: sidebarMenuRender,
// };
