import { scale, arp } from 'scribbletune';
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
        { pattern: 'xxxxxx[xR]xxxxxx[x--R]' },
        { pattern: 'xxxxxx[xR]xxxxxx[x--R]' },
        { pattern: 'xxxxxx[xR]xxxxxx[x--R]' },
        { pattern: 'xxxxxx[xR]xxxxxx[x--R]' },
        { pattern: 'xxxxxx[xR]xxxxxx[x--R]' },
        { pattern: 'xxxxxx[xR]xxxxxx[x--R]' },
        { pattern: 'xxxxxx[xR]xxxxxx[x--R]' },
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
          pattern: '[-xxx][-xRR]', //good riff
          notes: 'D2',
          randomNotes: scale('D2 minor').slice(1),
          dur: '32n',
        },
        {
          pattern: '[-xxx][-xRR]', //good riff
          notes: 'E2',
          randomNotes: scale('D2 minor').slice(1),
          dur: '32n',
        },
        {
          pattern: '[-x][-R]', //good riff
          notes: 'D2',
          randomNotes: scale('D2 minor').slice(1),
        },
        {
          pattern: '[-xxx][-xRR]', //good riff
          notes: 'D2',
          randomNotes: scale('D2 minor').slice(1),
          dur: '32n',
        },
        {
          pattern: '[-xxx][-xRR]', //good riff
          notes: 'D2',
          randomNotes: scale('D2 minor').slice(1),
          dur: '32n',
        },
        {
          pattern: '[-xxx][-xRR]', //good riff
          notes: 'D2',
          randomNotes: scale('D2 minor').slice(1),
          dur: '32n',
        },
        {
          pattern: '[-xxx][-xRR]', //good riff
          notes: 'D2',
          randomNotes: scale('D2 minor').slice(1),
          dur: '32n',
        },
      ],
    },
    {
      name: 'Ch',
      sample: '/sounds/samples/ch.wav',
      volume: -12,
      clips: [
        {},
        { pattern: '[xx][xx][xx][x[xR]]' },
        { pattern: '[xx][xx][xx][x[xR]]' },
        { pattern: '[xx][xx][xx][x[xR]]' },
        { pattern: '[xx][xx][xx][x[xR]]' },
        { pattern: '[xx][xx][xx][x[xR]]' },
        {},
        { pattern: '[xx][xx][xx][x[xR]]' },
        { pattern: '[xx][xx][xx][x[xR]]' },
        { pattern: '[xx][xx][xx][x[xR]]' },
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
        {
          pattern: '[-x][-[xR]]',
          dur: '32n',
        },
        {
          pattern: '[-x][-[xR]]',
          dur: '32n',
        },
        {
          pattern: '[-x][-[xR]]',
          dur: '32n',
        },
        {},
        {},
        {
          pattern: '[-x][-[xR]]',
          dur: '32n',
        },
        {
          pattern: '[-x][-[xR]]',
          dur: '32n',
        },
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
          pattern: '[-x][-R][xR][-R]',
          dur: '8n',
        },
        {
          pattern: '[-x][-R][xR][-R]',
          dur: '8n',
        },
        {},
        {},
        {
          pattern: '[-x][-R][xR][-R]',
          dur: '8n',
        },
        {
          pattern: '[-x][-R][xR][-R]',
          dur: '8n',
        },
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
          pattern: '-x-x-x-[xR]'.repeat(3) + '-x-xxx[xx][xxxx]',
          dur: '8n',
        },
        {
          pattern: '-x-x-x-[xR]',
          dur: '8n',
        },
        {
          pattern: '-x-x-x-[xR]',
          dur: '8n',
        },
        {
          pattern: '-x-x-x-[xR]',
          dur: '8n',
        },
        {
          pattern: '-x-x-x-[xR]',
          dur: '8n',
        },
        {
          pattern: '-x-x-x-[xR]'.repeat(7) + '-x-xxx[xx][xxxx]',
          dur: '8n',
        },
        {
          pattern: '-x-x-x-[xR]'.repeat(7) + '-x-xxx[xx][xxxx]',
          dur: '8n',
        },
        {
          pattern: '-x-x-x-[xR]',
          dur: '8n',
        },
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
          pattern: '-x-x-x-x-x-x-x-[xx]',
          dur: '8n',
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
          pattern: '----[-x]---',
          subdiv: '1m ',
          dur: '1m',
        },
        {
          pattern: '----[-x]---',
          subdiv: '1m ',
          dur: '1m',
        },
        {
          pattern: '----[-x]---',
          subdiv: '1m ',
          dur: '1m',
        },
        {
          pattern: '----[-x]---',
          subdiv: '1m ',
          dur: '1m',
        },
        {
          pattern: '----[-x]---',
          subdiv: '1m ',
          dur: '1m',
        },
        {
          pattern: '----[-x]---',
          subdiv: '1m ',
          dur: '1m',
        },
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
          pattern: '---x',
          subdiv: '1m',
          dur: '1m',
        },
        {
          pattern: '---x',
          subdiv: '1m',
          dur: '1m',
        },
        {
          pattern: '---x',
          subdiv: '1m',
          dur: '1m',
        },
        {
          pattern: '---x',
          subdiv: '1m',
          dur: '1m',
        },
        {
          pattern: '---x',
          subdiv: '1m',
          dur: '1m',
        },
        {
          pattern: '---x',
          subdiv: '1m',
          dur: '1m',
        },
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
          pattern: 'x-------',
          subdiv: '1m',
          dur: '1m',
        },
        {},
        {},
        {
          pattern: 'x-------',
          subdiv: '1m',
          dur: '1m',
        },
        {
          pattern: 'x-------',
          subdiv: '1m',
          dur: '1m',
        },
        {},
        {},
        {},
        {
          pattern: 'x-------',
          subdiv: '1m',
          dur: '1m',
        },
        {},
      ],
    },
    {
      name: 'Piano',
      sample: '',
      samples: samplers['piano'],
      volume: -18,
      clips: [
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {
          pattern: 'x',
          notes: arp({
            chords: 'Dm Dm Dm BbM Am Am FM CM Dm Dm Dm BbM Gm Gm BbM CM',
            count: 8,
            order: '0245',
          }),
          subdiv: '16n',
          dur: '16n',
        },
        {},
        {
          pattern: 'x',
          notes: arp({
            chords: 'Dm Dm Dm BbM Am Am FM CM Dm Dm Dm BbM Gm Gm BbM CM',
            count: 8,
            order: '0245',
          }),
          subdiv: '16n',
          dur: '16n',
        },
      ],
    },
    {
      name: 'Saw',
      sample: '',
      samples: samplers['superSaw'],
      volume: -12,
      clips: [
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {
          pattern: 'x[xx][-x-x][--xx]',
          notes: arp({
            chords: 'Dm BbM Am FM',
            count: 8,
            order: '0132',
          }),
          dur: '16n',
        },
        {
          pattern: '[xx][xx][xx][x[xx]]',
          notes: arp({
            chords: 'Dm BbM Am FM',
            count: 8,
            order: '2143',
          }),
          dur: '16n',
        },
      ],
    },
    {
      name: 'Pad',
      sample: '',
      samples: samplers['celestialPad'],
      volume: -20,
      clips: [
        {},
        {},
        {},
        {},
        {},
        {},
        {
          pattern: 'x',
          notes: 'Dm BbM Dm FM',
          subdiv: '2m',
          dur: '2m',
        },
        {
          pattern: 'x',
          notes: 'Dm BbM Dm FM',
          subdiv: '2m',
          dur: '2m',
        },
        {},
        {
          pattern: 'x',
          notes: 'Dm BbM Dm FM',
          subdiv: '2m',
          dur: '2m',
        },
      ],
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
