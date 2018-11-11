import { progression, arp, clip, chord, midi } from 'scribbletune';

Tone.Transport.start();

let theClip;

const getTheChords = (state) => {
  const theScale = state.keys[state.selectedKeyIdx] + '3 ' + state.scales[state.selectedScaleIdx];
  const theChordProgression = state.arpClipSelectedChord.map(el => state.arpChordProgression[el]);
  return progression.getChords(
    theScale,
    theChordProgression.join(' ')
  );
};

const getClipNotes = (state) => {
  return arp({
    chords: getTheChords(state),
    count: state.arpLengthOptions[state.selectedArpLengthOptionIdx],
    order: state.arpNotesOrderOptions[state.selectedArpNotesOrderOptionsIdx]
  });
};

export const playClip = (state) => {
  theClip = clip({
    synth: 'Synth',
    pattern: state.pattern,
    notes: getClipNotes(state),
    subdiv: state.subdivs[state.selectedSubdivOption]
  });
  Tone.Transport.bpm.value = state.bpm;
  theClip.start();
}

export const stopClip = () => {
  theClip.stop();
};

export const getProgression = scale => progression.get(scale);

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