export default function getInitialState() {
  return {
    channels: [
    {
      name: 'P',
      clips: [
        { pattern: 'x', notes: 'G3' },
        { pattern: 'x' }
      ],
      samples: samplers.piano,
      volume: -24
    }
    ].map((ch, idx) => {
      ch.id = idx;
      ch.currentlyPlayingClipIdx = -1;
      return ch;
    })
  };
}
