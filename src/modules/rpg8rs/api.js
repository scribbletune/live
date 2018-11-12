import { progression, arp, clip, chord, midi } from 'scribbletune';

Tone.Transport.start();

let theClips = [];

export const getChordsProgressionForScale = (theScale, theChordProgressionStr) => {
  return progression.getChords(
    theScale,
    theChordProgressionStr
  );
};

export const getArpNotes = arp;

export const playClips = (state) => {
  Tone.Transport.bpm.value = state.bpm;
  state.arps.forEach((arp, idx) => {
    theClips[idx] = clip({...arp, ...{synth: 'Synth'}});
    theClips[idx].start();
  });
}

export const stopClips = () => {
  theClips.forEach((arp, idx) => {
    theClips[idx].stop();
  });
};

export const getChordDegrees = scale => progression.get(scale);

export const saveMidiFile = (state) => {
  const theNotes = getClipNotes(state);
  const c = clip({
    notes: theNotes,
    pattern: state.pattern.repeat(theNotes.length),
    subdiv: state.subdivs[state.selectedSubdivOption]
  });
  const b64 = btoa(midi(c, null)); // Encode byte string from Scribbletune as base64
  const uri = 'data:audio/midi;base64,' + b64;
  const link = document.createElement('a');
  link.href = uri;
  link.download = 'arp.mid';
  link.click();
};