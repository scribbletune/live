import { scale } from 'scribbletune';

const getNotes = () => ('' +
  'G3 G4 '.repeat(8) + 
  'G3 A4 '.repeat(8) + 
  'F3 A#4 '.repeat(8) + 
  'F3 A4 '.repeat(8) +

  'G3 G4 '.repeat(8) + 
  'G3 A4 '.repeat(8) + 
  'F3 A#4 '.repeat(8) + 
  'C3 C5 '.repeat(7) + 'C3 C5'
);

export default function getInitialState() {
  return {
    channels: [
    {
      name: 'P1',
      clips: [
        { pattern: '[xx]', notes: 'G3' },
        { pattern: '[xx]', notes: 'G3' },
        { pattern: '[xx]', notes: 'G3' },
        { },
        { },
        { },
        { },
        { pattern: '[xx]', notes: 'G3' },
        { pattern: '[xx]', notes: 'G3' },
        { pattern: '[xx]', notes: getNotes() },
      ],
      samples: samplers.piano,
      volume: -50
    },
    {
      name: 'P2',
      clips: [
        { pattern: 'xxx[xx][-x][-x][-x]x', notes: 'c4 d#4 c4 d4 d#4 f4 c4 f4 d4' },
        { pattern: 'xxx[xx][-x][-x][-x]x', notes: 'c4 d#4 c4 d4 d#4 f4 c4 f4 d4' },
        { pattern: 'xxx[xx][-x][-x][-x]x', notes: 'c4 d#4 c4 d4 d#4 f4 c4 f4 d4' },
        { },
        { },
        { },
        { },
        { pattern: 'x[x--x][---x][-x]', notes: 'c4 c4 d#4 c4 d4' },
        { pattern: 'x[x--x][---x][-x]', notes: 'c4 c4 d#4 c4 d4' },
        { },
      ],
      samples: samplers.piano,
      volume: -24
    },
    {
      name: 'Str',
      clips: [
        { },
        { pattern: 'x', notes: [['g3', 'a#3', 'd4'], ['a#3', 'c4', 'f4'], ['c4', 'd#4', 'g4'], ['c4', 'd#4', 'g#4']] },
        { pattern: 'x', notes: [['g3', 'a#3', 'd4'], ['a#3', 'c4', 'f4'], ['c4', 'd#4', 'g4'], ['c4', 'd#4', 'g#4']] },
        { },
        { },
        { },
        { },
        { },
        { },
        { },
      ],
      samples: samplers.celestialPad,
      subdiv: '4m'
    },
    {
      name: 'S1',
      clips: [
        { },
        { },
        { pattern: '[xxx]', notes: 'd4 g3 d4 a#4 '.repeat(12) + 'f4 a#4 f4 c4 '.repeat(12) + 'g4 c4 g4 d#4 '.repeat(12) + 'g#4 c4 g#4 d#4 '.repeat(11) + 'g#4 c4 g#4 d#4' },
        { },
        { },
        { },
        { },
        { },
        { },
        { pattern: '[xxxx]', notes: getNotes() },
      ],
      instrument: getToneMonoSynth('FMSynth:ThinSaws'),
      dur: '16n',
      volume: 2
    },
    {
      name: 'K1',
      clips: [
        { },
        { },
        { pattern: 'x--[-x]x---' },
        { },
        { },
        { },
        { },
        { },
        { },
        { },
      ],
      sample: '/sounds/hits/normal-kick.wav',
      volume: 12
    },
    {
      name: 'Ch',
      clips: [
        { },
        { },
        { pattern: 'x' },
        { },
        { },
        { pattern: '[xxx][xxx][xxx][x[xx]x]' },
        { pattern: '[xxx][xxx][xxx][x[xx]x]' },
        { },
        { },
        { pattern: '[xx][xx][xx][x[xx]]' },
      ],
      sample: '/sounds/hits/ch.wav',
      volume: 2
    },
    {
      name: 'Oh',
      clips: [
        { },
        { },
        { pattern: '-[-x]-x' },
        { },
        { },
        { },
        { },
        { },
        { },
        { pattern: '[-x]' },
      ],
      sample: '/sounds/hits/oh.wav',
      volume: 2
    },
    {
      name: 'Sn',
      clips: [
        { },
        { },
        { pattern: '------x-' },
        { },
        { },
        { pattern: '-x' },
        { pattern: 'x-x-x-x-xxxxxxxx[xx][xx][xx][xx][xx][xx][xx][xx][xxxx][xxxx][xxxx][xxxx][xxxxxxxx][xxxxxxxx][xxxxxxxx][xxxxxxxx]' },
        { },
        { },
        { pattern: 'xxx[x[xx]]xxx[[xx]-]' },
      ],
      sample: '/sounds/hits/snare.wav',
      volume: 1,
      effects: ['Chorus']
    },
    {
      name: 'S2',
      clips: [
        { },
        { },
        { },
        { pattern: '[xxx]', notes: 'g4 c4 g4 d#4 '.repeat(12) + 'g#4 c4 g#4 d#4 '.repeat(11) + 'g#4 c4 g#4 d#4' },
        { pattern: '[xxx]', notes: 'g4 c4 g4 d#4 '.repeat(12) + 'g#4 c4 g#4 d#4 '.repeat(11) + 'g#4 c4 g#4 d#4' },
        { pattern: '[xxx]', notes: 'g4 c4 g4 d#4 '.repeat(12) + 'g#4 c4 g#4 d#4 '.repeat(11) + 'g#4 c4 g#4 d#4' },
        { pattern: '[xxx]', notes: 'g4 c4 g4 d#4 '.repeat(12) + 'g#4 c4 g#4 d#4 '.repeat(11) + 'g#4 c4 g#4 d#4' },
        { },
        { },
        { pattern: '[xxxx]', notes: getNotes() },
      ],
      instrument: getToneMonoSynth('Synth:SuperSaw'),
      dur: '32n',
      volume: -6
    },
    {
      name: 'K2',
      clips: [
        { },
        { },
        { },
        { pattern: 'x-------' },
        { pattern: 'x' },
        { pattern: 'x' },
        { pattern: 'x' },
        { pattern: 'x-------' },
        { pattern: 'x' },
        { pattern: 'x' },
      ],
      sample: '/sounds/hits/kick.wav',
      volume: 2
    },
    {
      name: 'B2',
      clips: [
        { },
        { },
        { },
        { },
        { pattern: '[xxx]', notes: 'g1' },
        { pattern: '[xxx]', notes: 'g1 '.repeat(5) + 'a#1 ' +  'g1 '.repeat(4) + 'a#1 d2'},
        { pattern: '[xxx]', notes: 'g1 '.repeat(5) + 'a#1 ' +  'g1 '.repeat(4) + 'a#1 d2'},
        { },
        { pattern: '[-xxx]', notes: 'g1' },
        { pattern: '[-xxx]', notes: 'g1 '.repeat(8) + 'a1 '.repeat(8) + 'a#1 '.repeat(8) + 'a1 '.repeat(7) + 'a1'},
      ],
      samples: samplers.psyTranceBass
    },
    {
      name: 'Cr',
      clips: [
        { },
        { },
        { },
        { pattern: 'x-------' },
        { },
        { },
        { },
        { pattern: 'x-------' },
        { },
        { },
      ],
      sample: '/sounds/hits/crash.wav'
    },
    ].map((ch, idx) => {
      ch.id = idx;
      ch.currentlyPlayingClipIdx = -1;
      return ch;
    })
  };
}
