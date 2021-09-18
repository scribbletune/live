import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';

import Channel from './Channel';
import * as ClipStories from './Clip.stories';

export default {
  component: Channel,
  title: 'Channel',
  decorators: [
    (story) => (
      <Container fluid>
        <Row>
          {story()}
          <Col />
        </Row>
      </Container>
    ),
  ],
};

// eslint-disable-next-line react/jsx-props-no-spreading
const Template = (args) => <Channel {...args} />;

export const Empty = Template.bind({});
Empty.args = {
  channel: {
    idx: 0,
    name: 'Piano',
    activeClipIdx: -1,
    clips: [],
    state: 'loaded',
    error: { message: '' },
  },
  showGears: false,
};

export const Default = Template.bind({});
Default.args = {
  ...Empty.args,
  channel: {
    ...Empty.args.channel,
    clips: [
      { ...ClipStories.Empty.args.task, idx: '1', pattern: 'x' },
      { ...ClipStories.Empty.args.task, idx: '2', pattern: 'x' },
      { ...ClipStories.Empty.args.task, idx: '3' },
      { ...ClipStories.Empty.args.task, idx: '4' },
    ],
  },
};
Default.args.channel.clips.forEach((clip) => {
  clip.channelIdx = Default.args.channel.idx;
  clip.activeClipIdx = Default.args.channel.activeClipIdx;
});

export const ActivePlaying = Template.bind({});
ActivePlaying.args = {
  ...Default.args,
  channel: {
    ...Default.args.channel,
    activeClipIdx: 1,
  },
};
ActivePlaying.args.channel.clips.forEach((clip) => {
  clip.activeClipIdx = ActivePlaying.args.channel.activeClipIdx;
});

export const Loading = Template.bind({});
Loading.args = {
  ...Default.args,
  channel: {
    ...Default.args.channel,
    state: 'loading',
  },
};

export const Error = Template.bind({});
Error.args = {
  ...Default.args,
  channel: {
    ...Default.args.channel,
    state: 'error',
    error: { message: 'Failed something internal to this computer.' },
  },
};

export const ShowGearsEmpty = Template.bind({});
ShowGearsEmpty.args = {
  ...Empty.args,
  showGears: true,
};

export const ShowGearsDefault = Template.bind({});
ShowGearsDefault.args = {
  ...Default.args,
  showGears: true,
};

export const ShowGearsActivePlaying = Template.bind({});
ShowGearsActivePlaying.args = {
  ...ActivePlaying.args,
  showGears: true,
};

export const ShowGearsLoading = Template.bind({});
ShowGearsLoading.args = {
  ...Loading.args,
  showGears: true,
};

export const ShowGearsError = Template.bind({});
ShowGearsError.args = {
  ...Error.args,
  showGears: true,
};
