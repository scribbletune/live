import { scale } from 'scribbletune';

export default {
  channels: [
    {
      name: 'Kick',
      volume: 0.8,
      clips: [
        { pattern: 'x--', notes: 'c4', subdiv: '16n' },
        {},
        { pattern: 'xx', notes: ['c4', 'd4'] },
      ],
    },
    {
      name: 'Ch',
      volume: 0.8,
      clips: [
        {},
        {
          pattern: 'x-xR',
          notes: scale('c4 major').slice(0, 4),
          randomNotes: 'e4',
        },
        { pattern: 'xx', notes: ['c4', 'd4'] },
      ],
    },
    {
      name: 'Oh',
      volume: 0.8,
      clips: [
        {},
        {
          pattern: 'x-xR',
          notes: scale('c4 major').slice(0, 4),
          randomNotes: 'e4',
        },
        { pattern: 'xx', notes: ['c4', 'd4'] },
      ],
    },
    {
      name: 'Snare',
      volume: 0.8,
      clips: [
        {},
        {
          pattern: 'x-xR',
          notes: scale('c4 major').slice(0, 4),
          randomNotes: 'e4',
        },
        { pattern: 'xx', notes: ['c4', 'd4'] },
      ],
    },
    {
      name: 'Bass',
      volume: 0.8,
      clips: [
        {},
        {
          pattern: 'x-xR',
          notes: scale('c4 major').slice(0, 4),
          randomNotes: 'e4',
        },
        { pattern: 'xx', notes: ['c4', 'd4'] },
      ],
    },
    {
      name: 'Piano',
      volume: 0.8,
      clips: [
        {},
        {
          pattern: 'x-xR',
          notes: scale('c4 major').slice(0, 4),
          randomNotes: 'e4',
        },
        { pattern: 'xx', notes: ['c4', 'd4'] },
      ],
    },
    {
      name: 'Synth',
      volume: 0.8,
      clips: [
        {},
        {
          pattern: 'x-xR',
          notes: scale('c4 major').slice(0, 4),
          randomNotes: 'e4',
        },
        { pattern: 'xx', notes: ['c4', 'd4'] },
      ],
    },
    {
      name: 'Pad',
      volume: 0.8,
      clips: [
        {},
        {
          pattern: 'x-xR',
          notes: scale('c4 major').slice(0, 4),
          randomNotes: 'e4',
        },
        { pattern: 'xx', notes: ['c4', 'd4'] },
      ],
    },
  ],
};
