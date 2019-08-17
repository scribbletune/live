// import { scale, arp } from 'scribbletune';
import { samplers } from '../sounds';

export default {
  channels: [
    {
      name: 'Kick',
      sample: '/sounds/samples/kick.wav',
      volume: -14,
      clips: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    },
    {
      name: 'Bass',
      sample: '',
      samples: samplers['mechaBass1'],
      volume: -18,
      clips: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    },
    {
      name: 'Ch',
      sample: '/sounds/samples/ch.wav',
      volume: -12,
      clips: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    },
    {
      name: 'Oh',
      sample: '/sounds/samples/ch2.wav',
      volume: -14,
      clips: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    },
    {
      name: 'Oh2',
      sample: '/sounds/samples/oh.wav',
      volume: -18,
      clips: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    },
    {
      name: 'Clap',
      sample: '/sounds/samples/clap.wav',
      volume: -8,
      clips: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    },
    {
      name: 'Acid',
      sample: '/sounds/samples/acid.wav',
      volume: -12,
      clips: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    },
    {
      name: 'Fx1',
      sample: '/sounds/samples/fx1.wav',
      volume: -6,
      clips: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    },
    {
      name: 'Fx3',
      sample: '/sounds/samples/fx3.wav',
      volume: -18,
      clips: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    },
    {
      name: 'Impact',
      sample: '/sounds/samples/impact2.wav',
      volume: -2,
      clips: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    },
    {
      name: 'Piano',
      sample: '',
      samples: samplers['piano'],
      volume: -22,
      clips: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    },
    {
      name: 'Saw',
      sample: '',
      samples: samplers['superSaw'],
      volume: -12,
      clips: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    },
    {
      name: 'Pad',
      sample: '',
      samples: samplers['celestialPad'],
      volume: -20,
      clips: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    },
  ].map((ch, idx) => {
    ch.clips = ch.clips.map(c => ({
      ...{ pattern: '' },
      ...c,
      __typename: 'Clip',
    }));
    return {
      ...ch,
      __typename: 'Channel',
      activeClipIdx: -1,
      idx,
    };
  }),
};
