// npm install --save jzz jzz-synth-tiny
import * as JZZ from 'jzz';
import * as synth from 'jzz-synth-tiny';

let synthLoaded = false;

const PlayOnJZZ = (options) => {
  // options:
  //   channel: Midi channel number 0-15, 'all' or number[]
  //   name: MIDI instrument name (General Midi)
  //   program: MIDI program number 0-127

  let midiInitialized = false;
  let midiOutputs = [];
  // let jzzPluginInstalled = false;

  let _instrument;
  let _context;
  let _ch = 1; // MIDI channel to play on
  let _program; // Select MIDI program (instrument)

  return {
    init: async (context) => {
      _context = context;
      if (options.channel || options.channel === 0) {
        _ch = options.channel;
      }
      if (!midiInitialized) {
        //   // Inject plugins into JZZ
        if (!synthLoaded) {
          synth(JZZ); // JZZ.synth = synth;
          synthLoaded = true;
        }
        midiOutputs = [];
        JZZ()
          .or('Cannot start MIDI engine')
          // // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
          .and(function jzzRegister() {
            // Must be non-arrow anonymous funcition
            JZZ.synth.Tiny.register('Web Audio'); // Register for fallback
            // Name given here will be listed in the outputs.
            // Not sure how that works. if JZZ.synth.Tiny.register() is not called, there will be no output and no sound.
            // But sound comes from full-featured midi if JZZ.synth.Tiny.register() is called, not from this tiny synth.
            // So there's some magic that tiny synth does that connects midi proper. I wonder if there's a better way to prep midi.
            midiInitialized = true;
          });
      }
      return new Promise((resolve, reject) => {
        // eslint-disable-next-line promise/catch-or-return
        JZZ()
          .openMidiOut('Web Audio')
          .or((e) => {
            const err = new Error(`${e} Cannot open MIDI Out port`);
            reject(err);
          })
          .then((midiPort) => {
            _instrument = midiPort;
            if (options.program) {
              _program = options.program;
              _instrument?.program(_ch, _program);
            }
            resolve();
            return null;
          });
      });
    },
    stop: () => {
      if (_instrument) {
        // TODO: _instrument.noteOff(_ch, TBD);
        _instrument.close();
        _instrument = false;
      }
      if (midiInitialized) {
        // ?
      }
    },

    getMidiOutputs: async (refresh = false) => {
      // init(_context);
      if (midiOutputs?.length && !refresh) {
        return Promise.resolve(midiOutputs);
      }
      return new Promise((resolve, reject) => {
        JZZ()
          // // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
          .or(function jzzStartError() {
            reject(new Error('Cannot start MIDI engine'));
          })
          // // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
          .and(function jzzStartOk() {
            // JZZ can't use '=>' as it needs its own 'this'
            midiOutputs = this.info().outputs;
            midiOutputs.forEach((out) => {
              if (out.engine === 'crx' || out.engine === 'plugin') {
                // jzzPluginInstalled = true;
              }
            });
            resolve(midiOutputs);
          });
      });
    },
    setVolume: async (value) => {
      const gain = 10 ** (value / 20); // dB to ratio [0,1]
      console.log('PlayOnJZZ setVolume(%o) gain=%o', value, gain);
      if (!_instrument) {
        return;
      }
      try {
        _instrument.volumeF(_ch, gain);
      } catch (error) {
        console.error('Error %o in JZZ volumeF(), gain=%o', error, gain);
      }
    },
    triggerAttackRelease: async (note, duration, time, velocity) => {
      if (!_instrument) {
        return;
      }

      // Note: other output libraries may need clock translation. Use Tone.context.currentTime() to
      // const opts = {};
      //   duration: set the playing duration in ms
      //   time: If the value is a string starting with the + sign and followed by a number, the request will be delayed by the specified number (in milliseconds)
      //   rawVelocity: Boolean Controls whether the attack and release velocities are set using integers between 0 and 127 (true) or a decimal number between 0 and 1 (false, default).
      //   release: Number The velocity at which to release the note
      //   velocity: Number The velocity at which to play the note

      // const offset = WebMidi.time - _context.currentTime * 1000;
      //   opts.time = "+" + time * 1000 + offset;
      // if (duration) {
      //   opts.duration = duration * 1000 - 10;
      // }
      const delay = (time - _context.currentTime) * 1000;
      // console.log("JZZ time=%o delay=%o note=%o duration=%o", time, delay, note, duration);

      try {
        _instrument
          .ch(_ch)
          .wait(delay)
          .noteOn(note, velocity)
          .wait(duration * 1000 - 10)
          .noteOff(note);
      } catch (error) {
        console.error('Error %o in JZZ, note=%o', error, note);
      }
    },
  };
};

export default PlayOnJZZ;
