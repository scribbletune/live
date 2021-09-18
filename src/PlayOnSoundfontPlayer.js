// npm install --save soundfont-player
// https://github.com/danigb/soundfont-player
import Soundfont from 'soundfont-player';

const PlayOnSoundfontPlayer = (options) => {
  let instrument;
  let vca;

  return {
    init: async (context) => {
      const AudioContext =
        // eslint-disable-next-line compat/compat
        window.AudioContext || // Default
        window.webkitAudioContext || // Safari and old versions of Chrome
        false;
      if (!context && !AudioContext) throw new Error('Audio is not supported on this browser');
      const ac = context || new AudioContext();
      vca = ac.createGain();
      vca.gain.value = 1;
      vca.connect(ac.destination);

      const opts = {
        destination: vca,
      };
      if (options.soundfont) {
        opts.soundfont = options.soundfont;
      }
      return Soundfont.instrument(ac, options.name, opts).then(function sfInstrumentOk(result) {
        instrument = result;
        return null;
      });
    },
    setVolume: async (value) => {
      if (vca) {
        vca.gain.value = 10 ** (value / 20); // dB to ratio [0,1]
        console.log('PlayOnSoundfontPlayer setVolume(%o) gain=%o', value, vca.gain.value);
      }
    },
    triggerAttackRelease: async (note, duration, time, velocity) => {
      if (!instrument) {
        return;
      }
      const when = time;
      // Note: other output libraries may need clock translation. Use Tone.context.currentTime() to
      const opts = {};
      //   gain: float between 0 to 1
      //   attack: the attack time of the amplitude envelope
      //   decay: the decay time of the amplitude envelope
      //   sustain: the sustain gain value of the amplitude envelope
      //   release: the release time of the amplitude envelope
      //   adsr: an array of [attack, decay, sustain, release]. Overrides other parameters.
      //   duration: set the playing duration in seconds of the buffer(s)
      //   loop: set to true to loop the audio buffer
      if (duration) {
        opts.duration = duration;
      }
      if (velocity) {
        opts.gain = velocity;
      }
      // console.log("SoundfontPlayer time=%o delay=%o note=%o duration=%o", time, when, note, duration);
      instrument.play(note, when, opts);
    },
  };
};

export default PlayOnSoundfontPlayer;
