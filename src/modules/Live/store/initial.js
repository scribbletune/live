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
        { },
        { },
        { },
      ],
      samples: samplers.piano,
      volume: -72
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
        { },
        { },
        { },
      ],
      samples: samplers.piano,
      volume: -72
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
        { },
      ],
      instrument: getToneMonoSynth('FMSynth:ThinSaws'),
      dur: '16n',
      volume: 1
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
      volume: 0
    },
    {
      name: 'Ch',
      clips: [
        { },
        { },
        { pattern: 'x' },
        { },
        { },
        { },
        { },
        { },
        { },
        { },
      ],
      sample: '/sounds/hits/ch.wav',
      volume: -36
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
      ],
      sample: '/sounds/hits/oh.wav'
    },
    {
      name: 'Sn',
      clips: [
        { },
        { },
        { pattern: '------x-' },
        { },
        { },
        { },
        { },
        { },
        { },
        { },
      ],
      sample: '/sounds/hits/snare.wav'
    },
    {
      name: 'S2',
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
      ],
      instrument: getToneMonoSynth('Synth:SuperSaw'),
      dur: '32n'
    },
    {
      name: 'K2',
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
      ],
      sample: '/sounds/hits/kick.wav',
      volume: -14
    },
    {
      name: 'B2',
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
      ],
      samples: samplers.psyTranceBass,
      volume: -30,
    },
    {
      name: 'Cr',
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
