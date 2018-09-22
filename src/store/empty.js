export const initialState = {
  channels: [{
    name: 'Kk',
    clips: [
      { pattern: 'x' },
      { pattern: 'x' }
    ],
    sample: '/sounds/kick.wav'
  },
  {
    name: 'B',
    clips: [
      { pattern: '[-x]' },
      { pattern: '[xx]' }
    ],
    sample: '/sounds/Bass.wav'
  },
  {
    name: 'PSyn',
    clips: [
      { pattern: 'x', notes: 'c4' },
      { pattern: '[xx]', notes: 'd4' },
    ],
    synth: 'PolySynth'
  },
  {
    name: 'Hats',
    clips: [
      { pattern: '[-x]' },
      { pattern: '[xx]' }
    ],
    sample: '/sounds/OH.wav'
  }].map((ch, idx) => {
    ch.id = idx;
    ch.currentlyPlayingClipIdx = -1;
    return ch;
  })
};
