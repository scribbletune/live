{
  const getTrack = (providers) => {
    // Libraries provided by the app:
    const {
      // scribbletune, // { arp, scale, }
      sounds, // { samplers, getToneMonoSynth, }
      // PlayOnJZZ,
      // PlayOnSoundfontPlayer,
      // PlayOnWebMidi,
    } = providers || {};

    const track = {
      leadSheet: {
        title: '<title>',
        tempoBpm: 120,
        timeSignature: '4:4',
        keySignature: 'C major',
      },
      channels: [
        {
          name: 'Kick',
          sample: '/sounds/samples/kick.wav',
          volume: -14,
          clips: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
        },
        {
          name: 'Bass',
          sample: '',
          samples: sounds.samplers['mechaBass1'],
          volume: -16,
          clips: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
        },
        {
          name: 'Ch',
          sample: '/sounds/samples/ch.wav',
          volume: -12,
          clips: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
        },
        {
          name: 'Oh',
          sample: '/sounds/samples/ch2.wav',
          volume: -14,
          clips: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
        },
        {
          name: 'Oh2',
          sample: '/sounds/samples/oh.wav',
          volume: -18,
          clips: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
        },
        {
          name: 'Clap',
          sample: '/sounds/samples/clap.wav',
          volume: -8,
          clips: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
        },
        {
          name: 'Acid',
          sample: '/sounds/samples/acid.wav',
          volume: -12,
          clips: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
        },
        {
          name: 'Fx1',
          sample: '/sounds/samples/fx1.wav',
          volume: -6,
          clips: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
        },
        {
          name: 'Fx3',
          sample: '/sounds/samples/fx3.wav',
          volume: -18,
          clips: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
        },
        {
          name: 'Impact',
          sample: '/sounds/samples/impact2.wav',
          volume: -2,
          clips: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
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
