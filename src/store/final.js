import { scale } from 'scribbletune';
import { rpg8Chords, rpg8Notes, multiply } from '../utils';

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
        { pattern: '[xx]', notes: rpg8Notes() },
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
        { pattern: '[x[xx][-x][-x]]', notes: 'c4 d#4 c4 d4 d#4 f4 c4 f4 d4' },
        { pattern: '[x[xx][-x][-x]]', notes: 'c4 d#4 c4 d4 d#4 f4 c4 f4 d4' },
        { },
      ],
      samples: samplers.piano,
      volume: -24
    },
    {
      name: 'Str',
      clips: [
        { },
        { pattern: 'x', notes: 'Gm-3 BbMsus2-3 Cm-3 AbM-3' },
        { pattern: 'x', notes: 'Gm-3 BbMsus2-3 Cm-3 AbM-3' },
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
        { pattern: '[xxx]', notes: rpg8Chords() },
        { },
        { },
        { },
        { },
        { },
        { },
        { pattern: '[xxxx]', notes: rpg8Notes() },
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
        { pattern: '[xxx]', notes: rpg8Chords() },
        { pattern: '[xxx]', notes: rpg8Chords() },
        { pattern: '[xxx]', notes: rpg8Chords() },
        { pattern: '[xxx]', notes: rpg8Chords() },
        { },
        { },
        { pattern: '[xxxx]', notes: rpg8Notes() },
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
        { pattern: '[-xxx]', notes: [
          ...multiply(['g1'], 24),
          ...multiply(['f2'], 24),
          ...multiply(['g1'], 24),
          ...multiply(['f2'], 12),
          ...multiply(['c2'], 12)
        ] },
      ],
      samples: samplers.psyTranceBass
    },
    {
      name: 'Fx1',
      clips: [
        { },
        { },
        { },
        { },
        { pattern: '---x------------' },
        { pattern: '---x------------' },
        { pattern: '---x------------' },
        { },
        { },
        { },
      ],
      sample: '/sounds/hits/fx1.wav',
      volume: 4,
      effects: ['Chorus', 'FeedbackDelay']
    },
    {
      name: 'Fx2',
      clips: [
        { },
        { },
        { },
        { },
        { pattern: '-----------x----' },
        { pattern: '-----------x----' },
        { pattern: '-----------x----' },
        { },
        { },
        { },
      ],
      sample: '/sounds/hits/fx2.wav',
      volume: 6
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
      sample: '/sounds/hits/crash.wav',
      volume: 12
    },
    ].map((ch, idx) => {
      ch.id = idx;
      ch.currentlyPlayingClipIdx = -1;
      return ch;
    })
  };
}
