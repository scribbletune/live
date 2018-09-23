import { scale } from 'scribbletune';

const key = 'C';

const getNotes = (key, octave) => {
  let mode = 'minor';
  let theMode = scale(key + octave + ' ' + mode);
  const modeSliced = theMode.slice(0, 3);
  return [...modeSliced, ...modeSliced.reverse(), ...modeSliced, ...theMode.slice(4).reverse()];
}

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
        { pattern: '[xx]', notes: 'G3' },
        { pattern: '[xx]', notes: 'G3' },
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
        { pattern: 'x[x--x][---x][-x]', notes: 'c4 c4 d#4 c4 d4' },
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
        { },
        { },
      ],
      samples: samplers.jarblePerator,
      volume: -360,
      dur: '16n'
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
        { },
        { pattern: '[xxx][xxx][xxx][x[xx]x]' },
      ],
      sample: '/sounds/hits/ch.wav'
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
        { },
        { pattern: '[-x]' },
      ],
      sample: '/sounds/hits/oh.wav',
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
        { },
        { pattern: 'xxx[x[xx]]xxx[[xx]-]' },
      ],
      sample: '/sounds/hits/snare.wav',
      volume: 2
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
        { },
        { pattern: 'xx[-x]'.repeat(3) + 'xx[xx]', notes: getNotes(key, 3), effects: ['PingPongDelay'] },
        // { pattern: '[xxxx]', notes: 'f3 a#4 '.repeat(12) + 'f3 a4 '.repeat(11) + 'f3 a4' },
      ],
      samples: samplers.epicTranceLead,
      dur: '16n'
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
        { pattern: 'x-------' },
        { pattern: 'x' },
      ],
      sample: '/sounds/hits/kick.wav',
      volume: 6
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
        { },
        { pattern: '[-xxx]', notes: 'g1 '.repeat(4) + 'a#1 '.repeat(4) + 'g#1 '.repeat(4) + 'd2 '.repeat(2) + 'd#2 d#2'},
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
        { pattern: 'x-------' },
        { },
      ],
      sample: '/sounds/hits/crash.wav',
      volume: 12
    },
    {
      name: 'S3',
      clips: [
        { },
        { },
        { },
        { },
        { },
        { },
        { },
        { },
        { },
        { },
        { pattern: 'x[x--x][---x][-x]', notes: 'c4 c4 d#4 c4 d4' },
        // { pattern: '[xxxx]', notes: 'f3 a#4 '.repeat(12) + 'f3 a4 '.repeat(11) + 'f3 a4' },
      ],
      samples: samplers.ciriusRez
    },
    ].map((ch, idx) => {
      ch.id = idx;
      ch.currentlyPlayingClipIdx = -1;
      return ch;
    })
  };
}
