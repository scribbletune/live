{
  const getTrack = (providers) => {
    // Libraries provided by the app:
    const {
      scribbletune, // { arp, scale, }
      sounds, // { samplers, getToneMonoSynth, }
      PlayOnJZZ,
      PlayOnSoundfontPlayer,
      PlayOnWebMidi,
    } = providers || {};

    const track = {
      leadSheet: {
        title: 'Half',
        tempoBpm: 138,
        timeSignature: '4:4',
        keySignature: 'D minor',
      },
      channels: [
        {
          name: 'Kick',
          sample: '/sounds/samples/kick.wav',
          volume: -14,
          clips: [
            {},
            {},
            {},
            { pattern: 'xxxxxxx[xR]xxxxxxx[x--R]' },
            { pattern: 'xxxxxxx[xR]xxxxxxx[x--R]' },
            {},
            {},
            {},
            {},
            {},
          ],
        },
        {
          name: 'Bass',
          sample: '',
          samples: sounds.samplers['mechaBass1'],
          volume: -16,
          clips: [
            {},
            {},
            {},
            {
              pattern: '[-xxx][-xRR]',
              notes: 'D2',
              randomNotes: scribbletune.scale('D2 minor'),
            },
            {
              pattern: '[-xxx][-xRR]',
              notes: 'E2',
              randomNotes: scribbletune.scale('D2 minor'),
            },
            {},
            {},
            {},
            {},
            {},
          ],
        },
        {
          name: 'Ch',
          sample: '/sounds/samples/ch.wav',
          volume: -12,
          clips: [
            {},
            { pattern: '[xx][xx][xx][x[xR]]' },
            { pattern: '[xx][xx][xx][x[xR]]' },
            { pattern: '[xx][xx][xx][x[xR]]' },
            { pattern: '[xx][xx][xx][x[xR]]' },
            {},
            {},
            {},
            {},
            {},
          ],
        },
        {
          name: 'Oh',
          sample: '/sounds/samples/ch2.wav',
          volume: -14,
          clips: [{}, {}, {}, { pattern: '[-x][-[xR]]' }, { pattern: '[-x][-[xR]]' }, {}, {}, {}, {}, {}],
        },
        {
          name: 'Oh2',
          sample: '/sounds/samples/oh.wav',
          volume: -18,
          clips: [{}, {}, {}, {}, { pattern: '[-x][-R][-x][xR]' }, {}, {}, {}, {}, {}],
        },
        {
          name: 'Clap',
          sample: '/sounds/samples/clap.wav',
          volume: -8,
          clips: [
            {},
            {},
            { pattern: `${'-x-x-x-[xR]'.repeat(3)}-x-xxx[xx][xxxx]` },
            { pattern: '-x-x-x-[xR]' },
            { pattern: '-x-x-x-[xR]' },
            {},
            {},
            {},
            {},
            {},
          ],
        },
        {
          name: 'Acid',
          sample: '/sounds/samples/acid.wav',
          volume: -12,
          clips: [{}, {}, {}, {}, { pattern: '-x-x-x-x-x-x-x-[xx]' }, {}, {}, {}, {}, {}],
        },
        {
          name: 'Fx1',
          sample: '/sounds/samples/fx1.wav',
          volume: -6,
          clips: [
            { pattern: '----x---', subdiv: '1m' },
            { pattern: '----x---', subdiv: '1m' },
            { pattern: '----x---', subdiv: '1m' },
            { pattern: '----x---', subdiv: '1m' },
            { pattern: '----x---', subdiv: '1m' },
            {},
            {},
            {},
            {},
            {},
          ],
        },
        {
          name: 'Fx3',
          sample: '/sounds/samples/fx3.wav',
          volume: -18,
          clips: [
            { pattern: '---x', subdiv: '1m' },
            { pattern: '---x', subdiv: '1m' },
            { pattern: '---x', subdiv: '1m' },
            { pattern: '---x', subdiv: '1m' },
            { pattern: '---x', subdiv: '1m' },
            {},
            {},
            {},
            {},
            {},
          ],
        },
        {
          name: 'Impact',
          sample: '/sounds/samples/impact2.wav',
          volume: -2,
          clips: [
            { pattern: 'x-------', subdiv: '1m' },
            {},
            {},
            { pattern: 'x-------', subdiv: '1m' },
            { pattern: 'x-------', subdiv: '1m' },
            {},
            {},
            {},
            {},
            {},
          ],
        },
        {
          name: 'Piano',
          sample: '',
          samples: sounds.samplers['piano'],
          volume: -22,
          clips: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
        },
        {
          name: 'Saw',
          sample: '',
          samples: sounds.samplers['superSaw'],
          volume: -12,
          clips: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
        },
        {
          name: 'Pad',
          sample: '',
          samples: sounds.samplers['celestialPad'],
          volume: -20,
          clips: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
        },
      ],
    };
    return track;
  };

  // Return function (data getter) to the app:
  if (window.TrackLoadMethods) {
    const sectionName = window.TrackLoadMethods['sectionName'] || 'track';
    window.TrackLoadMethods[sectionName] = { getTrack };
  }
}
