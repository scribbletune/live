import { clip, scale, chord, progression } from 'scribbletune';

const mangle = c => {
  let arr = chord(c);
  let counterpoint = arr.pop();

  return arr.reduce((a, b) => [...a, counterpoint, b], []);
};

const multiply = (arr, times) => {
  let finalArr = [];
  while (times > 0) {
    finalArr = [...finalArr, ...arr];
    times--;
  }
  return finalArr;
};

// Gm-3 BbMsus2-3 Cm AbMsus2
const rpg8chords = (chords, times) => {
  let arr = chords.split(/\s|\,/);
  return arr.reduce((a, b) => {
    return [...a, ...multiply(mangle(b), times)];
  }, []);
};


clip({
  instrument: getToneMonoSynth('Synth:SuperSaw'),
  pattern: '[xxx]',
  notes: rpg8chords('Gm-3 BbMsus2-3 Cm AbMsus2', 4),
  dur: '32n'
}).start();

Tone.Transport.bpm.value = 145;
// Tone.Transport.start();

