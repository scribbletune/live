import { scale } from 'scribbletune';

export default {
  channels: [
    {
      name: 'Kick',
      volume: 0.8,
      clips: [
        {
          pattern: 'x--',
          notes: 'c4',
          randomNotes: '',
          subdiv: '16n',
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
          pattern: 'xx',
          notes: ['c4', 'd4'],
          randomNotes: '',
          subdiv: '4n',
          dur: '4n',
        },
      ].map(c => ({ ...c, __typename: 'Clip' })),
    },
    {
      name: 'Ch',
      volume: 0.8,
      clips: [
        {
          pattern: '',
          notes: '',
          randomNotes: '',
          subdiv: '4n',
          dur: '4n',
        },
        {
          pattern: 'x-xR',
          notes: scale('c4 major').slice(0, 4),
          randomNotes: 'e4',
          subdiv: '4n',
          dur: '4n',
        },
        {
          pattern: 'xx',
          notes: ['c4', 'd4'],
          randomNotes: '',
          subdiv: '4n',
          dur: '4n',
        },
      ].map(c => ({ ...c, __typename: 'Clip' })),
    },
    {
      name: 'Oh',
      volume: 0.8,
      clips: [
        {
          pattern: '',
          notes: '',
          randomNotes: '',
          subdiv: '4n',
          dur: '4n',
        },
        {
          pattern: 'x-xR',
          notes: scale('c4 major').slice(0, 4),
          randomNotes: 'e4',
          subdiv: '4n',
          dur: '4n',
        },
        {
          pattern: 'xx',
          notes: ['c4', 'd4'],
          randomNotes: '',
          subdiv: '4n',
          dur: '4n',
        },
      ].map(c => ({ ...c, __typename: 'Clip' })),
    },
    {
      name: 'Snare',
      volume: 0.8,
      clips: [
        {
          pattern: '',
          notes: '',
          randomNotes: '',
          subdiv: '4n',
          dur: '4n',
        },
        {
          pattern: 'x-xR',
          notes: scale('c4 major').slice(0, 4),
          randomNotes: 'e4',
          subdiv: '4n',
          dur: '4n',
        },
        {
          pattern: 'xx',
          notes: ['c4', 'd4'],
          randomNotes: '',
          subdiv: '4n',
          dur: '4n',
        },
      ].map(c => ({ ...c, __typename: 'Clip' })),
    },
    {
      name: 'Bass',
      volume: 0.8,
      clips: [
        {
          pattern: '',
          notes: '',
          randomNotes: '',
          subdiv: '4n',
          dur: '4n',
        },
        {
          pattern: 'x-xR',
          notes: scale('c4 major').slice(0, 4),
          randomNotes: 'e4',
          subdiv: '4n',
          dur: '4n',
        },
        {
          pattern: 'xx',
          notes: ['c4', 'd4'],
          randomNotes: '',
          subdiv: '4n',
          dur: '4n',
        },
      ].map(c => ({ ...c, __typename: 'Clip' })),
    },
    {
      name: 'Piano',
      volume: 0.8,
      clips: [
        {
          pattern: '',
          notes: '',
          randomNotes: '',
          subdiv: '4n',
          dur: '4n',
        },
        {
          pattern: 'x-xR',
          notes: scale('c4 major').slice(0, 4),
          randomNotes: 'e4',
          subdiv: '4n',
          dur: '4n',
        },
        {
          pattern: 'xx',
          notes: ['c4', 'd4'],
          randomNotes: '',
          subdiv: '4n',
          dur: '4n',
        },
      ].map(c => ({ ...c, __typename: 'Clip' })),
    },
    {
      name: 'Synth',
      volume: 0.8,
      clips: [
        {
          pattern: '',
          notes: '',
          randomNotes: '',
          subdiv: '4n',
          dur: '4n',
        },
        {
          pattern: 'x-xR',
          notes: scale('c4 major').slice(0, 4),
          randomNotes: 'e4',
          subdiv: '4n',
          dur: '4n',
        },
        {
          pattern: 'xx',
          notes: ['c4', 'd4'],
          randomNotes: '',
          subdiv: '4n',
          dur: '4n',
        },
      ].map(c => ({ ...c, __typename: 'Clip' })),
    },
    {
      name: 'Pad',
      volume: 0.8,
      clips: [
        {
          pattern: '',
          notes: '',
          randomNotes: '',
          subdiv: '4n',
          dur: '4n',
        },
        {
          pattern: 'x-xR',
          notes: scale('c4 major').slice(0, 4),
          randomNotes: 'e4',
          subdiv: '4n',
          dur: '4n',
        },
        {
          pattern: 'xx',
          notes: ['c4', 'd4'],
          randomNotes: '',
          subdiv: '4n',
          dur: '4n',
        },
      ].map(c => ({ ...c, __typename: 'Clip' })),
    },
  ].map((ch, idx) => ({
    ...ch,
    __typename: 'Channel',
    activeClipIdx: 1,
    idx,
  })),
};
