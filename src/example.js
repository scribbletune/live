import { clip, scale, chord, progression } from 'scribbletune';

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
/*var superSawNotes = '' +
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
}).start();*/



// Tone.Transport.bpm.value = 145;
// Tone.Transport.start();

const cMinorScale = scale('C4 minor');
console.log(cMinorScale);
/*
D4 G3 D4 Bb4
F4 Bb4 F4 C4
G4 C4 G4 Eb4
G#4 C4 Ab4 Eb4
*/
/*console.log(chord('Gm'));
console.log(chord('BbMsus2'));
console.log(chord('Cm'));
console.log(chord('AbM'));*/

const mangle = c => {
  let arr = chord(c);
  let counterpoint = arr.pop();
  return arr.reduce((a, b) => [...a, counterpoint, b], []);
};

const multiply = (arr, count) => {
  let finalArr = [];
  while (count > 0) {
    finalArr = [...finalArr, ...arr];
    count--;
  }
  return finalArr;
};

const rpg8Chords = (chords = 'Gm-3 BbMsus2-3 Cm-3 AbM-3', times) => {
  const arr = chords.split(/\s|\,/);
  let finalArr = [];
  arr.forEach(el => {
    finalArr.push(...multiply(mangle(el), times || 12))
  });
  return finalArr;
};

const rpg8Notes = () => {
  return [
    ...multiply(['g3', 'g4'], 8),
    ...multiply(['g3', 'a4'], 8),
    ...multiply(['f3', 'a#4'], 8),
    ...multiply(['f3', 'a4'], 8),
    ...multiply(['g3', 'g4'], 8),
    ...multiply(['g3', 'a4'], 8),
    ...multiply(['f3', 'a#4'], 8),
    ...multiply(['c3', 'c5'], 8)
  ];
};

console.log(rpg8Chords('Gm BbMsus2 Cm AbM'));








