import React from 'react';
import Navbar from 'react-bootstrap/Navbar';

import Sidebar from './Sidebar';

export default {
  component: Sidebar,
  title: 'Sidebar',
  decorators: [
    (story) => (
      <Navbar bg="primary" variant="dark" className="toolbar">
        {story()}
      </Navbar>
    ),
  ],
};

// eslint-disable-next-line react/jsx-props-no-spreading
const Template = (args) => <Sidebar {...args} />;

const sidebarMenu = [
  { id: 1, title: '1 Uno' },
  { id: 2, title: '2 Dos' },
  { id: 3, title: '3 Tres' },
  { id: 4, title: '4 About' },
];

const sidebarMenuRender = sidebarMenu.map((item) => (
  <Sidebar.Item key={item.id} id={item.id}>
    {item.title}
  </Sidebar.Item>
));

export const Default = Template.bind({});
Default.args = {
  appInfo: {
    name: 'Your App',
    version: 'v1.0.1',
    copyright: '(c) 2001',
    release: 'build-2001-0101',
  },
};

export const Active = Template.bind({});
Active.args = {
  ...Default.args,
  sidebarMenu, // Sidebar does not use it, here only for exporting to other stories
  children: sidebarMenuRender,
};
