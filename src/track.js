import { scale, arp } from 'scribbletune';
import { samplers } from './sounds';

export default {
  channels: [
    {
      name: 'Kick',
      sample: '/sounds/samples/kick.wav',
      volume: 0.3,
      clips: [
        {
          pattern: 'x',
          notes: 'c4',
          randomNotes: '',
          subdiv: '4n',
          dur: '16n',
        },
        {
          pattern: 'x',
          notes: 'c4',
          randomNotes: '',
          subdiv: '4n',
          dur: '16n',
        },
        {
          pattern: 'xxxxxxx[xR]xxxxxxx[x--R]',
          notes: 'c4',
          randomNotes: '',
          subdiv: '4n',
          dur: '16n',
        },
      ].map(c => ({ ...c, __typename: 'Clip' })),
    },
    {
      name: 'Ch',
      sample: '/sounds/samples/ch.wav',
      volume: 0.7,
      clips: [
        {
          pattern: '',
          notes: '',
          randomNotes: '',
          subdiv: '4n',
          dur: '4n',
        },
        {
          pattern: '[xx][x[xR]][xx][x[RR]]',
          notes: 'c4',
          randomNotes: '',
          subdiv: '4n',
          dur: '4n',
        },
        {
          pattern: 'x[xx]x[xR]',
          notes: ['c4', 'd4'],
          randomNotes: '',
          subdiv: '4n',
          dur: '4n',
        },
      ].map(c => ({ ...c, __typename: 'Clip' })),
    },
    {
      name: 'Oh',
      sample: '/sounds/samples/oh.wav',
      volume: 0.6,
      clips: [
        {
          pattern: '',
          notes: '',
          randomNotes: '',
          subdiv: '4n',
          dur: '4n',
        },
        {
          pattern: '[-x][-R][-x][-[xR]]',
          notes: 'c4',
          randomNotes: '',
          subdiv: '4n',
          dur: '16n',
        },
        {
          pattern: '[xx][xR][xx][x[xR]]',
          notes: 'c4',
          randomNotes: '',
          subdiv: '4n',
          dur: '16n',
        },
      ].map(c => ({ ...c, __typename: 'Clip' })),
    },
    {
      name: 'Snare',
      sample: '/sounds/samples/snare.wav',
      volume: 0.7,
      clips: [
        {
          pattern: '',
          notes: '',
          randomNotes: '',
          subdiv: '4n',
          dur: '4n',
        },
        {
          pattern: '-x-[xR]-[x--R]-[x[RR]]',
          notes: 'c4',
          randomNotes: '',
          subdiv: '4n',
          dur: '4n',
        },
        {
          pattern: '-[xR]-x-[xR]-R',
          notes: 'c4',
          randomNotes: '',
          subdiv: '4n',
          dur: '4n',
        },
      ].map(c => ({ ...c, __typename: 'Clip' })),
    },
    {
      name: 'Bass',
      sample: '',
      samples: samplers['mechaBass1'],
      volume: 0.7,
      clips: [
        {
          pattern: '[-xxx][-xxR]',
          notes: 'C2',
          randomNotes: scale('C2 phrygian').slice(1),
          subdiv: '4n',
          dur: '4n',
        },
        {
          pattern: '[-xxx][-xxR]',
          notes: 'C2',
          randomNotes: scale('C2 phrygian').slice(1),
          subdiv: '4n',
          dur: '4n',
        },
        {
          pattern: '[-xxx][-xxR][-xRx][-xRR]'.repeat(8),
          notes: 'C1 '.repeat(32) + 'C#1 '.repeat(31) + 'C#2',
          randomNotes: scale('c1 phrygian').slice(1),
          subdiv: '4n',
          dur: '16n',
        },
      ].map(c => ({ ...c, __typename: 'Clip' })),
    },
    {
      name: 'Synth',
      sample: '',
      samples: samplers['epicTranceLead'],
      volume: 0.5,
      effects: ['Distortion'],
      clips: [
        {
          pattern: '',
          notes: '',
          randomNotes: '',
          subdiv: '4n',
          dur: '4n',
        },
        {
          pattern: '',
          notes: '',
          randomNotes: '',
          subdiv: '4n',
          dur: '4n',
        },
        {
          pattern: '[-[xR]][-[RR]]',
          notes: 'c4',
          randomNotes: scale('c4 phrygian').slice(1),
          subdiv: '4n',
          dur: '16n',
        },
      ].map(c => ({ ...c, __typename: 'Clip' })),
    },
    {
      name: 'Piano',
      sample: '',
      samples: samplers['piano'],
      effects: ['Distortion'],
      volume: 0.5,
      clips: [
        {
          pattern: '',
          notes: '',
          randomNotes: '',
          subdiv: '4n',
          dur: '4n',
        },
        {
          pattern: '',
          notes: '',
          randomNotes: '',
          subdiv: '4n',
          dur: '4n',
        },
        {
          pattern: 'xxx[xR]xxx[xR]xxx[xR]xxx_',
          notes: arp({
            chords: 'C#M7 C#M7 Fm7 Cm7 C#M7 C#M7 G#M7-3 Cm7',
            count: 4,
            order: '1023',
          }),
          randomNotes: '',
          subdiv: '8n',
          dur: '16n',
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
