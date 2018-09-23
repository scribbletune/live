import { clip, scale } from 'scribbletune';

/*clip({ sample: '/sounds/hits/ch.wav', pattern: '[xxx]'.repeat(7) + '[xx[xx]]'  }).start();
clip({ sample: '/sounds/hits/fx1.wav', pattern: '----x-----------'  }).start();
clip({ sample: '/sounds/hits/fx2.wav', pattern: '------------x---'  }).start();
clip({ sample: '/sounds/hits/kick.wav', pattern: 'x'.repeat(7) + '[xx]'  }).start();

clip({ sample: '/sounds/hits/snare.wav', pattern: '-x'  }).start();
clip({ sample: '/sounds/hits/oh.wav', pattern: '-x'.repeat(7) + 'xx'  }).start();

clip({ sample: '/sounds/hits/bass.wav', pattern: '[xxx]'.repeat(15) + '-'  }).start();

clip({
  synth: 'PolySynth',
  pattern: 'x---x-',
  notes: 'Cm7 Fm7 Em7 Fm7'
}).start();
*/
var superSawNotes = '' +
          'G3 G4 '.repeat(8) + 
          'G3 A4 '.repeat(8) + 
          'F3 A#4 '.repeat(8) + 
          'F3 A4 '.repeat(8) +

          'G3 G4 '.repeat(8) + 
          'G3 A4 '.repeat(8) + 
          'F3 A#4 '.repeat(8) + 
          'C3 C5 '.repeat(7) + 'C3 C5';
clip({
  instrument: getToneMonoSynth('Synth:SuperSaw'),
  pattern: '[xxxx]',
  notes: superSawNotes,
  dur: '32n'
}).start();
Tone.Transport.bpm.value = 145;
// Tone.Transport.start();