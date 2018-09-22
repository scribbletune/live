export default function getInitialState() {
  return {
    channels: [{
      name: 'Kk',
      clips: [
        { pattern: 'x' },
        { pattern: 'x' }
      ],
      sample: '/sounds/hits/kick.wav'
    },
    {
      name: 'B',
      clips: [
        { pattern: '[-x]' },
        { pattern: '[xx]' }
      ],
      sample: '/sounds/hits/bass.wav'
    },
    {
      name: 'P',
      clips: [
        { pattern: 'x', notes: 'c4' },
        { pattern: '[xx]', notes: 'd4' },
      ],
      samples: samplers.piano
    },
    {
      name: 'Hats',
      clips: [
        { pattern: '[-x]' },
        { pattern: '[xx]' }
      ],
      sample: '/sounds/hits/ch.wav'
    }].map((ch, idx) => {
      ch.id = idx;
      ch.currentlyPlayingClipIdx = -1;
      return ch;
    })
  };
}
