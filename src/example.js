// Inspiration https://codepen.io/jakealbaugh/full/qNrZyw

import { clip, scale, chord } from 'scribbletune';

const key = 'g';
const octave = 3;
const mode = 'ionian';
const notesInArp = 8;

const theRomans = {
  ionian: ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°'],
  dorian: ['i', 'ii', 'III', 'IV', 'v', 'vi°', 'VII'],
  phrygian: ['i', 'II', 'III', 'iv', 'v°', 'VI', 'vii'],
  lydian: ['I', 'II', 'iii', 'iv°', 'V', 'vi', 'vii'],
  mixolydian: ['I', 'ii', 'iii°', 'IV', 'v', 'vi', 'VII'],
  aeolian: ['I', 'ii°', 'III', 'iv', 'v', 'VI', 'VII'],
  locrian: ['i°', 'II', 'iii', 'iv', 'V', 'VI', 'vii'],
  melodic: ['i', 'ii', 'III+', 'IV', 'V', 'vi°', 'vii°'],
  harmonic: ['i', 'ii°', 'III+', 'iv', 'V', 'VI', 'vii°']
};

const order = '12132224'.split('');

const getChordFamily = roman => {
  // remove any non character
  const str = roman.replace(/\W/g, '');
  let prefix = 'M';
  // check if it s lowercase
  if (str.toLowerCase() === str) {
    prefix = 'm';
  }
  if (roman.includes('°')) {
    return prefix + '7b5';
  }
  if (roman.includes('+')) {
    return prefix + '#5';
  }

  if (roman.includes('7')) {
    return prefix === 'M' ? 'Maj7' : 'm7';
  }

  return prefix;
};

/**
 * Take an array and fill it with it s own elements in the next octave till it s of the specified `len`
 * @param  {Array} arr e.g. ['a4', 'b4']
 * @param  {Number} e.g. len 4
 * @return {Array} e.g. ['a4', 'b4', 'a5', 'b5']
 */
const fillArr = (arr, len) => {
  let finalArr =  [...arr, ...arr.map(el => {
    let note = el.replace(/\d/, '');
    let oct = el.replace(/\D/g, '');
    return note + (+oct + 1);
  })];

  return finalArr.slice(0, len);
};


// get the notes in the scale
const s = scale(key + ' ' + mode);
// take each note and get the notes for the chord for that note based on it's roman interval
// and build a notes array
let notesArr = [];
order.forEach(idx => {
  let chordArr = chord(s[idx] + getChordFamily(theRomans[mode][idx]) + ('-' + octave));
  notesArr = [...notesArr, ...fillArr(chordArr, notesInArp)];
});

clip({
  notes: notesArr,
  subdiv: '16n',
  pattern: 'x',
  synth: 'Synth'
}).start();

document.querySelector('#start').addEventListener('click', function() {
  Tone.Transport.start();
});

