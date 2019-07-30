import { scale, arp } from 'scribbletune';
import { samplers, getToneMonoSynth } from './sounds';

export default {
  channels: [
    {
      name: 'Kick',
      sample: '/sounds/samples/kick.wav',
      volume: -10,
      clips: [
        {
          pattern: 'xxxxxx[xR]xxxxxx[x--R]',
          notes: 'c4',
          randomNotes: '',
          subdiv: '4n',
          dur: '32n',
        },
      ].map(c => ({ ...c, __typename: 'Clip' })),
    },
    {
      name: 'Bass',
      sample: '',
      samples: samplers['mechaBass1'],
      volume: -14,
      clips: [
        {
          pattern: '[-xxx][-xRR]', //good riff
          notes: 'D2',
          randomNotes: scale('D2 minor').slice(1),
          subdiv: '4n',
          dur: '32n',
        },
        {
          pattern: '[-xxx][-xRR]', //good riff
          notes: 'E2',
          randomNotes: scale('D2 minor').slice(1),
          subdiv: '4n',
          dur: '32n',
        },
        {
          pattern: '[-x][-R]', //good riff
          notes: 'D2',
          randomNotes: scale('D2 minor').slice(1),
          subdiv: '4n',
          dur: '16n',
        },
      ].map(c => ({ ...c, __typename: 'Clip' })),
    },
    {
      name: 'Ch',
      sample: '/sounds/samples/ch.wav',
      volume: -12,
      clips: [
        {
          pattern: 'x-x-x-x[xR]x---x-[xR]R',
          notes: 'c4',
          randomNotes: '',
          subdiv: '16n',
          dur: '32n',
        },
      ].map(c => ({ ...c, __typename: 'Clip' })),
    },
    {
      name: 'Oh',
      sample: '/sounds/samples/ch2.wav',
      volume: -12,
      clips: [
        {
          pattern: '[-x][-[xR]]',
          notes: 'c4',
          randomNotes: '',
          subdiv: '4n',
          dur: '32n',
        },
      ].map(c => ({ ...c, __typename: 'Clip' })),
    },
    {
      name: 'Oh2',
      sample: '/sounds/samples/oh.wav',
      volume: -18,
      clips: [
        {
          pattern: '[-x][-R][xR][-R]',
          notes: 'c4',
          randomNotes: '',
          subdiv: '4n',
          dur: '8n',
        },
      ].map(c => ({ ...c, __typename: 'Clip' })),
    },
    {
      name: 'Clap',
      sample: '/sounds/samples/clap.wav',
      volume: -12,
      clips: [
        {
          pattern: '-x-R-x-[xR]-x-R-x-[RR]',
          notes: 'c4',
          randomNotes: '',
          subdiv: '4n',
          dur: '8n',
        },
      ].map(c => ({ ...c, __typename: 'Clip' })),
    },
    {
      name: 'Snare',
      sample: '/sounds/samples/snare.wav',
      volume: -12,
      clips: [
        {
          pattern: '-R-[RR]',
          notes: 'c4',
          randomNotes: '',
          subdiv: '4n',
          dur: '8n',
        },
      ].map(c => ({ ...c, __typename: 'Clip' })),
    },
    {
      name: 'Acid',
      sample: '/sounds/samples/acid.wav',
      volume: -12,
      clips: [
        {
          pattern: '-x-x-x-x-x-x-x-[xR]',
          notes: 'c4',
          randomNotes: '',
          subdiv: '4n',
          dur: '8n',
        },
      ].map(c => ({ ...c, __typename: 'Clip' })),
    },
    {
      name: 'Fx1',
      sample: '/sounds/samples/fx1.wav',
      volume: -6,
      clips: [
        {
          // pattern: '[xR][x[RR]]', //good riff
          pattern: '[-x]-------',
          notes: 'C4',
          randomNotes: '',
          subdiv: '1m ',
          dur: '1m',
        },
      ].map(c => ({ ...c, __typename: 'Clip' })),
    },
    {
      name: 'Fx3',
      sample: '/sounds/samples/fx3.wav',
      volume: -18,
      clips: [
        {
          pattern: '---x',
          notes: 'C4',
          randomNotes: '',
          subdiv: '1m',
          dur: '1m',
        },
      ].map(c => ({ ...c, __typename: 'Clip' })),
    },
    {
      name: 'Impact',
      sample: '/sounds/samples/impact2.wav',
      volume: -2,
      clips: [
        {
          pattern: '----x---',
          notes: 'C4',
          randomNotes: '',
          subdiv: '1m',
          dur: '1m',
        },
      ].map(c => ({ ...c, __typename: 'Clip' })),
    },
    {
      name: 'Synth',
      sample: '',
      synth: getToneMonoSynth('Synth:SuperSaw'),
      effects: ['PingPongDelay'],
      volume: -20,
      clips: [
        {
          pattern: '[xx][xx][xx][xx]'.repeat(8),
          notes: arp({
            chords: 'Dm BbM Am FM BbM FM CM Gm',
            count: 8,
            order: '2035',
          }),
          randomNotes: scale('D4 minor').slice(1),
          subdiv: '4n',
          dur: '16n',
        },
      ].map(c => ({ ...c, __typename: 'Clip' })),
    },
    {
      name: 'Piano',
      sample: '',
      samples: samplers['piano'],
      volume: -20,
      clips: [
        {
          pattern: 'xxxR'.repeat(8),
          notes: arp({
            chords: 'Dm Dm Dm BbM Am Am FM CM Dm Dm Dm BbM Gm Gm BbM CM',
            count: 8,
            order: '1034',
          }),
          randomNotes: scale('D4 minor').slice(1),
          subdiv: '16n',
          dur: '16n',
        },
      ].map(c => ({ ...c, __typename: 'Clip' })),
    },
    {
      name: 'Saw',
      sample: '',
      samples: samplers['superSaw'],
      volume: -12,
      clips: [
        {
          pattern: '[xx][xx][xx][xR][xx][xx][xx][x[xR]]'.repeat(4),
          notes: arp({
            chords: 'Dm BbM Am FM BbM FM CM Gm',
            count: 8,
            order: '20352036',
          }),
          randomNotes: scale('D4 minor').slice(1),
          subdiv: '4n',
          dur: '16n',
        },
      ].map(c => ({ ...c, __typename: 'Clip' })),
    },
    {
      name: 'Pad',
      sample: '',
      samples: samplers['celestialPad'],
      volume: -12,
      clips: [
        {
          pattern: 'x[xx]',
          notes: arp({
            chords: 'Dm-2 BbM-1 Am-2 FM-1',
            count: 8,
            order: '4013',
          }),
          randomNotes: '',
          subdiv: '2m',
          dur: '2m',
        },
      ].map(c => ({ ...c, __typename: 'Clip' })),
    },
  ].map((ch, idx) => ({
    ...ch,
    __typename: 'Channel',
    activeClipIdx: -1,
    idx,
  })),
};
