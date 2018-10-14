// Inspiration https://codepen.io/jakealbaugh/full/qNrZyw

import { clip, scale, chord, progression } from 'scribbletune';

// get the notes in the scale
const theChords = progression.getChords('C4 major', 'I I ii ii III IV III V');

clip({
  notes: progression.arpegiate(theChords),
  subdiv: '16n',
  pattern: 'x-xx',
  synth: 'Synth'
}).start();

document.querySelector('#start').addEventListener('click', function() {
  Tone.Transport.start();
});
