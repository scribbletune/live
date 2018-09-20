export const initialState = {
  channels: [{
    id: 0,
    name: 'Kk',
    clips: [
      { },
      { pattern: 'x' }
    ],
    sample: '/sounds/kick.wav',
    currentlyPlayingClipIdx: -1
  },
  {
    id: 1,
    name: 'B',
    clips: [
      { pattern: '[-x]' },
      { pattern: '[-x]' }
    ],
    sample: '/sounds/Bass.wav',
    currentlyPlayingClipIdx: -1
  },
  {
    id: 2,
    name: 'PSyn',
    clips: [
      { pattern: '[-x]', notes: 'c4' },
      { pattern: '[xx]', notes: 'd4' },
    ],
    synth: 'PolySynth',
    currentlyPlayingClipIdx: -1
  },
  {
    id: 3,
    name: 'Hats',
    clips: [
      { pattern: '[-x]' },
      { pattern: '[xx]' }
    ],
    sample: '/sounds/OH.wav',
    currentlyPlayingClipIdx: -1
  }]
}