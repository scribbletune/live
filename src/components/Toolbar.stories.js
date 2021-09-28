import React from 'react';
// import { Container, Row, Col, Modal } from 'react-bootstrap';
import { Container } from 'react-bootstrap';

import Toolbar from './Toolbar';
import * as SidebarStories from './Sidebar.stories';

export default {
  component: Toolbar,
  title: 'Toolbar',
  decorators: [(story) => <Container fluid>{story()}</Container>],
};

// eslint-disable-next-line react/jsx-props-no-spreading
const Template = (args) => <Toolbar {...args} />;

export const Default = Template.bind({});
Default.args = {
  enableSidebar: false,
  onSidebarMenu: () => {},
  sidebarMenu: [],
  enableMenubar: false,
  onMenubarMenu: () => {},
  showGears: false,
  setShowGears: () => {},
  logNotes: false,
  setLogNotes: () => {},
  tempoBpm: 120,
  handleBpmValueChangeEvent: () => {},
  isPlaying: false,
  startStopTrack: () => {},
  currentFileIsDirty: false,
  onFileOpenReject: () => {},
  onFileOpen: () => {},
  currentFileState: {
    name: 'File.js',
  },
  handleFileSave: () => {},

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
  sidebarMenu: SidebarStories.Active.args.sidebarMenu,
};
