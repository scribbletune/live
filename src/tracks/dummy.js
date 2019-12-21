import { samplers } from '../sounds';

export default {
  channels: [
    {
      name: 'Kick',
      sample: '/sounds/samples/kick.wav',
      volume: -14,
      clips: [
        {},
        {},
        {},
        {
          clipStr: `{"pattern": "xxxxxxx[xR]xxxxxxx[x--R]"}`,
        },
        {
          clipStr: `{"pattern": "xxxxxxx[xR]xxxxxxx[x--R]"}`,
        },
        {},
        {},
        {},
        {},
        {},
      ],
    },
    {
      name: 'Bass',
      sample: '',
      samples: samplers['mechaBass1'],
      volume: -16,
      clips: [
        {},
        {},
        {},
        {
          clipStr: `{
            "notes": "D2",
            "pattern": "[-xxx][-xRR]",
            "randomNotes": "D2 E2"
          }`,
        },
        {
          clipStr: `{
            "notes": "E2",
            "pattern": "[-xxx][-xRR]",
            "randomNotes": "D2 E2"
          }`,
        },
        {},
        {},
        {},
        {},
        {},
      ],
    },
    {
      name: 'Ch',
      sample: '/sounds/samples/ch.wav',
      volume: -12,
      clips: [
        {},
        {
          clipStr: `{"pattern": "[xx][xx][xx][x[xR]]"}`,
        },
        {
          clipStr: `{"pattern": "[xx][xx][xx][x[xR]]"}`,
        },
        {
          clipStr: `{"pattern": "[xx][xx][xx][x[xR]]"}`,
        },
        {
          clipStr: `{"pattern": "[xx][xx][xx][x[xR]]"}`,
        },
        {},
        {},
        {},
        {},
        {},
      ],
    },
    {
      name: 'Oh',
      sample: '/sounds/samples/ch2.wav',
      volume: -14,
      clips: [
        {},
        {},
        {},
        { clipStr: `{"pattern": "[-x][-[xR]]"}` },
        { clipStr: `{"pattern": "[-x][-[xR]]"}` },
        {},
        {},
        {},
        {},
        {},
      ],
    },
    {
      name: 'Oh2',
      sample: '/sounds/samples/oh.wav',
      volume: -18,
      clips: [
        {},
        {},
        {},
        {},
        {
          clipStr: `{"pattern": "[-x][-R][-x][xR]"}`,
        },
        {},
        {},
        {},
        {},
        {},
      ],
    },
    {
      name: 'Clap',
      sample: '/sounds/samples/clap.wav',
      volume: -8,
      clips: [
        {},
        {},
        {
          clipStr: `{"pattern": "-x-x-x-[xR]"}`,
        },
        { clipStr: `{"pattern": "-x-x-x-[xR]"}` },
        { clipStr: `{"pattern": "-x-x-x-[xR]"}` },
        {},
        {},
        {},
        {},
        {},
      ],
    },
    {
      name: 'Acid',
      sample: '/sounds/samples/acid.wav',
      volume: -12,
      clips: [
        {},
        {},
        {},
        {},
        {
          clipStr: `{"pattern": "-x-x-x-x-x-x-x-[xx]"}`,
        },
        {},
        {},
        {},
        {},
        {},
      ],
    },
    {
      name: 'Fx1',
      sample: '/sounds/samples/fx1.wav',
      volume: -6,
      clips: [
        {
          clipStr: `{"pattern": "----x---", "subdiv": "1m"}`,
        },
        {
          clipStr: `{"pattern": "----x---", "subdiv": "1m"}`,
        },
        {
          clipStr: `{"pattern": "----x---", "subdiv": "1m"}`,
        },
        {
          clipStr: `{"pattern": "----x---", "subdiv": "1m"}`,
        },
        {
          clipStr: `{"pattern": "----x---", "subdiv": "1m"}`,
        },
        {},
        {},
        {},
        {},
        {},
      ],
    },
    {
      name: 'Fx3',
      sample: '/sounds/samples/fx3.wav',
      volume: -18,
      clips: [
        {
          clipStr: `{"pattern": "---x", "subdiv": "1m"}`,
        },
        {
          clipStr: `{"pattern": "---x", "subdiv": "1m"}`,
        },
        {
          clipStr: `{"pattern": "---x", "subdiv": "1m"}`,
        },
        {
          clipStr: `{"pattern": "---x", "subdiv": "1m"}`,
        },
        {
          clipStr: `{"pattern": "---x", "subdiv": "1m"}`,
        },
        {},
        {},
        {},
        {},
        {},
      ],
    },
    {
      name: 'Impact',
      sample: '/sounds/samples/impact2.wav',
      volume: -2,
      clips: [
        {
          clipStr: `{"pattern": "x-------", "subdiv": "1m"}`,
        },
        {},
        {},
        {
          clipStr: `{"pattern": "x-------", "subdiv": "1m"}`,
        },
        {
          clipStr: `{"pattern": "x-------", "subdiv": "1m"}`,
        },
        {},
        {},
        {},
        {},
        {},
      ],
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
      ...{ clipStr: "''" },
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
