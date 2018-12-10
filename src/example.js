// Inspiration https://codepen.io/jakealbaugh/full/qNrZyw

import { clip, arp, progression } from 'scribbletune';

// get the notes in the scale
const arpedChords = arp(progression.getChords('C4 harmonic major', 'i i ii ii III IV III V'));

clip({
  notes: arpedChords,
  pattern: 'x___'.repeat((arpedChords.length)),
  synth: 'Synth'
}).start();

document.querySelector('#start').addEventListener('click', function() {
  Tone.Transport.start();
});
