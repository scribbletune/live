import React from 'react';

import Clip from './Clip';

export default {
  component: Clip,
  title: 'Clip',
};

// eslint-disable-next-line react/jsx-props-no-spreading
const Template = (args) => <Clip {...args} />;

export const Empty = Template.bind({});
Empty.args = {
  clip: {
    idx: 0,
  },
  showGears: false,
};

export const Active = Template.bind({});
Active.args = {
  ...Empty.args,
  clip: {
    ...Empty.args.clip,
    pattern: 'xxxx',
  },
};

export const ActivePlaying = Template.bind({});
ActivePlaying.args = {
  ...Active.args,
  clip: {
    ...Active.args.clip,
    activeClipIdx: Active.args.clip.idx,
  },
};

export const ShowGearsEmpty = Template.bind({});
ShowGearsEmpty.args = {
  ...Empty.args,
  clip: {
    ...Empty.args.clip,
  },
  showGears: true,
};

export const ShowGearsActive = Template.bind({});
ShowGearsActive.args = {
  ...Active.args,
  clip: {
    ...Active.args.clip,
  },
  showGears: true,
};

export const ShowGearsActivePlaying = Template.bind({});
ShowGearsActivePlaying.args = {
  ...Active.args,
  clip: {
    ...Active.args.clip,
    activeClipIdx: Active.args.clip.idx,
  },
  showGears: true,
};
